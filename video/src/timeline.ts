import { SCRIPT, SceneId } from "./script";
import { VIDEO } from "./brand";

export interface AlignedWord {
  word: string;
  start: number; // seconds
  end: number;
}

export interface TimedWord {
  text: string; // as displayed (punctuation kept)
  key: string; // normalised for matching
  emphasis: boolean;
  start: number;
  end: number;
  scene: SceneId;
}

export interface TimedScene {
  id: SceneId;
  start: number;
  end: number;
}

export interface Timeline {
  source: "estimate" | "alignment";
  scenes: TimedScene[];
  words: TimedWord[];
  narrationEnd: number;
  warnings: string[];
}

const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, "");

const tokenize = (text: string) =>
  text
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => {
      const emphasis = raw.includes("*");
      const text = raw.replace(/\*/g, "");
      return { text, key: norm(text), emphasis };
    });

// Word-level emphasis spans like "*two thousand two hundred*" mark every word inside.
const tokenizeWithSpans = (text: string) => {
  const out: { text: string; key: string; emphasis: boolean }[] = [];
  let inSpan = false;
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    const opens = raw.startsWith("*");
    const closes = raw.replace(/[^*a-zA-Z0-9]+$/, "").endsWith("*");
    if (opens) inSpan = true;
    const t = tokenize(raw)[0];
    out.push({ ...t, emphasis: inSpan || t.emphasis });
    if (closes) inSpan = false;
  }
  return out;
};

const pauseAfter = (w: string): number => (/[.!?]$/.test(w) ? 3.2 : /[,:;]$/.test(w) ? 1.8 : 0);

function estimate(): Timeline {
  const words: TimedWord[] = [];
  for (const s of SCRIPT) {
    const toks = tokenizeWithSpans(s.text);
    const lead = 0.3;
    const tail = s.id === "cta" ? 2.6 : 0.55; // CTA leaves room for the end card
    const span = s.end - s.start - lead - tail;
    const weights = toks.map((t) => t.key.length + 2.4);
    const pauses = toks.map((t) => pauseAfter(t.text));
    const total = weights.reduce((a, b) => a + b, 0) + pauses.slice(0, -1).reduce((a, b) => a + b, 0);
    let t = s.start + lead;
    toks.forEach((tok, i) => {
      const d = (weights[i] / total) * span;
      words.push({ ...tok, start: t, end: t + d * 0.92, scene: s.id });
      t += d + (i < toks.length - 1 ? (pauses[i] / total) * span : 0);
    });
  }
  return {
    source: "estimate",
    scenes: SCRIPT.map((s) => ({ id: s.id, start: s.start, end: s.end })),
    words,
    narrationEnd: words[words.length - 1].end,
    warnings: [],
  };
}

function fromAlignment(aligned: AlignedWord[]): Timeline {
  const est = estimate();
  const warnings: string[] = [];
  const script = SCRIPT.flatMap((s) => tokenizeWithSpans(s.text).map((t) => ({ ...t, scene: s.id })));
  const heard = aligned.filter((a) => norm(a.word));

  // Walk both sequences; tolerate small ad-libs by skipping unmatched recorded words.
  const words: TimedWord[] = [];
  let j = 0;
  for (const w of script) {
    let k = j;
    while (k < heard.length && norm(heard[k].word) !== w.key && k - j < 4) k++;
    if (k < heard.length && norm(heard[k].word) === w.key) {
      words.push({ ...w, start: heard[k].start, end: heard[k].end });
      j = k + 1;
    } else {
      const prev = words[words.length - 1];
      const t = prev ? prev.end + 0.05 : 0.3;
      words.push({ ...w, start: t, end: t + 0.25 });
      warnings.push(`Script word "${w.text}" not found in recording; interpolated.`);
    }
  }
  if (warnings.length > script.length * 0.2) {
    return { ...est, warnings: ["Alignment does not match the script; using estimated timings.", ...warnings] };
  }

  const firstOf = (id: SceneId) => words.find((w) => w.scene === id)!;
  const scenes: TimedScene[] = SCRIPT.map((s, i) => {
    const start = i === 0 ? 0 : Math.max(0, firstOf(s.id).start - 0.35);
    return { id: s.id, start, end: 0 };
  });
  scenes.forEach((s, i) => (s.end = i < scenes.length - 1 ? scenes[i + 1].start : VIDEO.seconds));

  const narrationEnd = words[words.length - 1].end;
  if (narrationEnd > VIDEO.seconds - 0.5) {
    warnings.push(
      `Narration ends at ${narrationEnd.toFixed(2)}s, past the 60s runtime. Tighten the read or the script; the voice is never time-stretched.`,
    );
  }
  return { source: "alignment", scenes, words, narrationEnd, warnings };
}

export function buildTimeline(aligned?: AlignedWord[] | null): Timeline {
  return aligned && aligned.length ? fromAlignment(aligned) : estimate();
}

export function cueTime(tl: Timeline, scene: SceneId, key: string): number {
  const s = SCRIPT.find((x) => x.id === scene)!;
  // "word#2" = second occurrence of the word inside the scene.
  const [raw, nth] = (s.cues[key] ?? key).split("#");
  const target = norm(raw);
  const w = tl.words.filter((x) => x.scene === scene && x.key === target)[(Number(nth) || 1) - 1];
  return w ? w.start : tl.scenes.find((x) => x.id === scene)!.start;
}

export const sec = (s: number) => Math.round(s * VIDEO.fps);

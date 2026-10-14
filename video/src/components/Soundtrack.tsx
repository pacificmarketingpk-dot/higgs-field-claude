import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { TOTAL_FRAMES, VIDEO } from "../brand";
import { useFilm } from "../context";
import { cueTime, sec, Timeline } from "../timeline";

export const NARRATION_FILE = "audio/narration.wav";
export const MUSIC_FILE = "audio/music/bed.wav";

type Sfx = "whoosh" | "impact" | "tick" | "glitch" | "count" | "riser" | "shimmer";
interface Hit {
  at: number; // film seconds
  sfx: Sfx;
  gain: number;
}

// Every sound effect is tied to a narration cue, so it moves with the voice.
export function sfxHits(tl: Timeline): Hit[] {
  const hits: Hit[] = [];
  tl.scenes.slice(1).forEach((s) => {
    if (s.id === "cta") hits.push({ at: s.start - 1.9, sfx: "riser", gain: 0.32 });
    else hits.push({ at: s.start - 0.22, sfx: "whoosh", gain: 0.34 });
  });
  hits.push({ at: cueTime(tl, "hook", "systems"), sfx: "impact", gain: 0.42 });
  hits.push({ at: cueTime(tl, "intro", "years"), sfx: "tick", gain: 0.3 });
  hits.push({ at: cueTime(tl, "problem", "leak"), sfx: "glitch", gain: 0.3 });
  (["slow", "scattered", "pipeline"] as const).forEach((k) => hits.push({ at: cueTime(tl, "problem", k), sfx: "tick", gain: 0.22 }));
  (["marketing", "ai", "growth"] as const).forEach((k) => hits.push({ at: cueTime(tl, "system", k), sfx: "tick", gain: 0.28 }));
  hits.push({ at: cueTime(tl, "system", "revenue"), sfx: "shimmer", gain: 0.26 });
  hits.push({ at: cueTime(tl, "proof", "spend"), sfx: "count", gain: 0.24 });
  hits.push({ at: cueTime(tl, "proof", "sales"), sfx: "count", gain: 0.24 });
  hits.push({ at: cueTime(tl, "proof", "confirmed"), sfx: "impact", gain: 0.3 });
  hits.push({ at: cueTime(tl, "cta", "build"), sfx: "shimmer", gain: 0.24 });
  (["m", "a", "g"] as const).forEach((k) => hits.push({ at: cueTime(tl, "cta", k), sfx: "tick", gain: 0.26 }));
  return hits.filter((h) => h.at >= 0 && h.at < VIDEO.seconds - 0.2);
}

export const Soundtrack: React.FC = () => {
  const { tl, flags } = useFilm();
  const speech = tl.words.map((w) => [sec(w.start), sec(w.end)] as const);
  // Music ducks under the voice (only when a real narration exists).
  const musicVolume = (f: number) => {
    const fade = interpolate(f, [0, 30, TOTAL_FRAMES - 75, TOTAL_FRAMES - 1], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const near = flags.hasNarration && speech.some(([a, b]) => f >= a - 6 && f <= b + 9);
    return fade * (near ? 0.13 : 0.24);
  };
  return (
    <>
      {flags.hasNarration && <Audio src={staticFile(NARRATION_FILE)} volume={1} />}
      {flags.hasMusic && <Audio src={staticFile(MUSIC_FILE)} volume={musicVolume} />}
      {sfxHits(tl).map((h, i) => (
        <Sequence key={i} from={sec(h.at)} layout="none">
          <Audio src={staticFile(`audio/sfx/${h.sfx}.wav`)} volume={h.gain} />
        </Sequence>
      ))}
    </>
  );
};

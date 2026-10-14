import React, { useMemo } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";
import { useFilm } from "../context";
import { TimedWord } from "../timeline";

const c = brand.colors;
const MAX_WORDS = 4;

interface Phrase {
  words: TimedWord[];
  start: number;
  end: number;
}

function toPhrases(words: TimedWord[]): Phrase[] {
  const out: Phrase[] = [];
  let cur: TimedWord[] = [];
  const flush = () => {
    if (cur.length) out.push({ words: cur, start: cur[0].start - 0.12, end: cur[cur.length - 1].end + 0.45 });
    cur = [];
  };
  words.forEach((w, i) => {
    const next = words[i + 1];
    cur.push(w);
    const sentenceEnd = /[.!?:,]$/.test(w.text);
    if (sentenceEnd || cur.length >= MAX_WORDS || !next || next.scene !== w.scene) flush();
  });
  // A phrase stays until the next one appears (no flicker in short gaps).
  out.forEach((p, i) => {
    const n = out[i + 1];
    if (n && n.start - p.end < 0.5) p.end = n.start;
  });
  return out;
}

// Kinetic captions, driven entirely by narration word timings.
export const Captions: React.FC<{ y?: number }> = ({ y = 1330 }) => {
  const { tl } = useFilm();
  const { fps } = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const phrases = useMemo(() => toPhrases(tl.words), [tl]);
  const p = phrases.find((ph) => t >= ph.start && t < ph.end);
  if (!p) return null;
  const out = interpolate(t, [p.end - 0.12, p.end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: y,
          left: 70,
          right: 70,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 22,
          rowGap: 6,
          fontFamily: brand.font.display,
          fontWeight: 800,
          fontSize: 76,
          lineHeight: 1.08,
          letterSpacing: -1.5,
          opacity: 1 - out,
        }}
      >
        {p.words.map((w, i) => {
          const local = (t - w.start) * fps;
          const appear = interpolate(local, [-3, 5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const active = t >= w.start && t < w.end + 0.08;
          const pop = w.emphasis
            ? interpolate(local, [0, 4, 10], [0.9, 1.08, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
            : 1;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: 0.25 + 0.75 * appear,
                transform: `translateY(${(1 - appear) * 22}px) scale(${pop})`,
                color: w.emphasis ? c.accent : c.white,
                textShadow: w.emphasis && active ? `0 0 30px ${c.accentGlow}` : "0 4px 24px rgba(0,0,0,0.55)",
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

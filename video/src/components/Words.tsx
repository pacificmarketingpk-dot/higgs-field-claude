import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TimedWord } from "../timeline";

// Renders words that appear exactly when they are spoken.
// `base` is the film second at which the enclosing Sequence starts.
export const Words: React.FC<{
  words: TimedWord[];
  base: number;
  style?: React.CSSProperties;
  wordStyle?: (w: TimedWord, i: number) => React.CSSProperties;
  dimBefore?: boolean;
}> = ({ words, base, style, wordStyle, dimBefore }) => {
  const { fps } = useVideoConfig();
  const t = useCurrentFrame() / fps + base;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: "0.28em", ...style }}>
      {words.map((w, i) => {
        const p = interpolate((t - w.start) * fps, [-2, 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: dimBefore ? 0.18 + 0.82 * p : p,
              transform: `translateY(${(1 - p) * 0.35}em)`,
              ...wordStyle?.(w, i),
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

export const useFilmTime = (base: number) => {
  const { fps } = useVideoConfig();
  return useCurrentFrame() / fps + base;
};

export const ramp = (t: number, from: number, dur: number, ease = Easing.bezier(0.22, 1, 0.36, 1)) =>
  interpolate(t, [from, from + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

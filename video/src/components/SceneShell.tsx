import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// Every scene enters and exits with the same motion: a short rise + de-blur in,
// a lift + blur out. Durations are in frames; scenes overlap by OVERLAP frames.
export const OVERLAP = 10;

export const SceneShell: React.FC<{ children: React.ReactNode; first?: boolean; last?: boolean }> = ({
  children,
  first,
  last,
}) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const ease = Easing.bezier(0.22, 1, 0.36, 1);
  const inP = first ? 1 : interpolate(f, [0, OVERLAP + 4], [0, 1], { extrapolateRight: "clamp", easing: ease });
  const outP = last
    ? 0
    : interpolate(f, [durationInFrames - OVERLAP, durationInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.cubic),
      });
  return (
    <AbsoluteFill
      style={{
        opacity: inP * (1 - outP),
        transform: `translateY(${(1 - inP) * 60 - outP * 80}px) scale(${1 + (1 - inP) * 0.04 - outP * 0.03})`,
        filter: `blur(${(1 - inP) * 14 + outP * 16}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

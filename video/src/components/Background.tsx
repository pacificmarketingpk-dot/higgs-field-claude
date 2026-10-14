import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { brand } from "../brand";

const c = brand.colors;

export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 140) * 120;
  const drift2 = Math.cos(f / 190) * 90;
  const gridShift = (f * 0.35) % 90;
  return (
    <AbsoluteFill style={{ background: c.navyDeep }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 1100px at 50% 18%, ${c.navy} 0%, ${c.navyDeep} 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${c.line} 1px, transparent 1px), linear-gradient(90deg, ${c.line} 1px, transparent 1px)`,
          backgroundSize: "90px 90px",
          backgroundPosition: `0 ${gridShift}px`,
          opacity: 0.35,
          maskImage: "radial-gradient(900px 1300px at 50% 45%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(900px 1300px at 50% 45%, black 0%, transparent 75%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: 90 + drift,
          top: 420 + drift2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c.accentGlow} 0%, transparent 65%)`,
          opacity: interpolate(Math.sin(f / 80), [-1, 1], [0.22, 0.38]),
          filter: "blur(40px)",
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(1400px 1800px at 50% 50%, transparent 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

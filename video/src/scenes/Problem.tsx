import React from "react";
import { AbsoluteFill, random } from "remotion";
import { brand } from "../brand";
import { useFilm } from "../context";
import { cueTime, TimedScene } from "../timeline";
import { ramp, useFilmTime } from "../components/Words";

const c = brand.colors;
const TUBE = { x: 300, top: 250, bottom: 1170, w: 240 };
const CRACK_Y = [560, 760, 960];

const Stage: React.FC<{ y: number; label: string; p: number }> = ({ y, label, p }) => (
  <div
    style={{
      position: "absolute",
      left: 60,
      top: y - 26,
      width: 220,
      textAlign: "right",
      fontFamily: brand.font.family,
      fontWeight: 800,
      fontSize: 34,
      letterSpacing: 5,
      color: c.white,
      opacity: p,
    }}
  >
    {label}
  </div>
);

const Tag: React.FC<{ y: number; label: string; p: number }> = ({ y, label, p }) => (
  <div
    style={{
      position: "absolute",
      left: TUBE.x + TUBE.w + 110,
      top: y - 38,
      opacity: p,
      transform: `translateX(${(1 - p) * 40}px)`,
      padding: "14px 24px",
      borderRadius: 18,
      background: "rgba(255,107,107,0.12)",
      border: `2px solid ${c.warn}`,
      color: c.white,
      fontFamily: brand.font.family,
      fontWeight: 700,
      fontSize: 34,
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </div>
);

export const Problem: React.FC<{ scene: TimedScene }> = ({ scene }) => {
  const { tl } = useFilm();
  const t = useFilmTime(scene.start);
  const local = t - scene.start;
  const leakAt = cueTime(tl, "problem", "leak");
  const leak = ramp(t, leakAt - 0.05, 0.4);
  const tagAt = [cueTime(tl, "problem", "slow"), cueTime(tl, "problem", "scattered"), cueTime(tl, "problem", "pipeline")];
  const crackP = tagAt.map((a, i) => (i === 0 ? Math.max(leak, 0) : ramp(t, a - 0.1, 0.3)));

  // Particles = leads. They fall down the pipeline; once it leaks, most exit through the cracks.
  const N = 46;
  const particles = Array.from({ length: N }, (_, i) => {
    const period = 2.4;
    const phase = (local + (i / N) * period * 3) % (period * 3);
    const spawned = local > (i / N) * 1.6;
    const fall = phase / (period * 3);
    let y = TUBE.top + 40 + fall * (TUBE.bottom - TUBE.top - 80);
    let x = TUBE.x + TUBE.w / 2 + (random(`x${i}`) - 0.5) * (TUBE.w - 70);
    const keeps = random(`k${i}`) < 0.22;
    const crack = Math.floor(random(`c${i}`) * 3);
    const cy = CRACK_Y[crack];
    let color: string = c.accent;
    let alpha = 1;
    if (!keeps && crackP[crack] > 0.5 && y > cy) {
      const out = (y - cy) / 260;
      x = TUBE.x + TUBE.w - 10 + out * 220;
      y = cy + out * 120;
      color = c.warn;
      alpha = Math.max(0, 1 - out);
    }
    return { x, y, color, alpha: spawned ? alpha : 0 };
  });
  const sales = ramp(t, scene.start + 0.6, 0.6);

  return (
    <AbsoluteFill>
      <Stage y={TUBE.top + 50} label="ADS" p={ramp(t, cueTime(tl, "problem", "ads"), 0.4)} />
      <Stage y={(TUBE.top + TUBE.bottom) / 2} label="LEADS" p={ramp(t, cueTime(tl, "problem", "leads"), 0.4)} />
      <Stage y={TUBE.bottom - 50} label="SALES" p={sales} />
      {/* Pipeline */}
      <div
        style={{
          position: "absolute",
          left: TUBE.x,
          top: TUBE.top,
          width: TUBE.w,
          height: TUBE.bottom - TUBE.top,
          borderRadius: 60,
          border: `4px solid ${c.accent}`,
          background: c.accentSoft,
          boxShadow: `0 0 50px ${c.accentSoft}`,
        }}
      />
      {CRACK_Y.map((y, i) => (
        <svg
          key={y}
          style={{ position: "absolute", left: TUBE.x + TUBE.w - 30, top: y - 40, opacity: crackP[i] }}
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <path d="M20 4 L44 28 L30 40 L58 62 L46 76" stroke={c.warn} strokeWidth="6" fill="none" strokeLinejoin="round" />
        </svg>
      ))}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x - 11,
            top: p.y - 11,
            width: 22,
            height: 22,
            borderRadius: 11,
            background: p.color,
            opacity: p.alpha,
            boxShadow: `0 0 16px ${p.color}`,
          }}
        />
      ))}
      <Tag y={CRACK_Y[0]} label="Slow follow-ups" p={ramp(t, tagAt[0], 0.4)} />
      <Tag y={CRACK_Y[1]} label="Scattered tools" p={ramp(t, tagAt[1], 0.4)} />
      <Tag y={CRACK_Y[2]} label="No clear pipeline" p={ramp(t, tagAt[2], 0.4)} />
    </AbsoluteFill>
  );
};

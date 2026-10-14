import React from "react";
import { AbsoluteFill } from "remotion";
import { brand } from "../brand";
import { useFilm } from "../context";
import { cueTime, TimedScene } from "../timeline";
import { ramp, useFilmTime } from "../components/Words";

const c = brand.colors;
const NODE_Y = [360, 650, 940];
const NODES = [
  { key: "marketing", title: "Marketing", sub: "Earns attention", glyph: "M" },
  { key: "ai", title: "AI", sub: "Qualifies & follows up in seconds", glyph: "AI" },
  { key: "growth", title: "Growth systems", sub: "Turn it into revenue", glyph: "G" },
] as const;

export const System: React.FC<{ scene: TimedScene }> = ({ scene }) => {
  const { tl } = useFilm();
  const t = useFilmTime(scene.start);
  const head = ramp(t, cueTime(tl, "system", "three") - 0.2, 0.5);
  const on = NODES.map((n) => ramp(t, cueTime(tl, "system", n.key) - 0.05, 0.45));
  const rev = ramp(t, cueTime(tl, "system", "revenue") - 0.05, 0.5);
  const flow = (t * 1.6) % 1;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 150,
          width: "100%",
          textAlign: "center",
          fontFamily: brand.font.family,
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: 10,
          color: c.white,
          opacity: head,
        }}
      >
        MARKETING <span style={{ color: c.accent }}>×</span> AI <span style={{ color: c.accent }}>×</span> GROWTH
      </div>
      {/* connectors */}
      {[0, 1, 2].map((i) => {
        const y1 = NODE_Y[i] + 70;
        const y2 = i < 2 ? NODE_Y[i + 1] - 70 : 1120;
        const p = i < 2 ? on[i + 1] : rev;
        return (
          <div key={i} style={{ position: "absolute", left: 230 - 3, top: y1, width: 6, height: (y2 - y1) * p, background: c.accent, borderRadius: 3 }}>
            {p > 0.99 && (
              <div
                style={{
                  position: "absolute",
                  left: -7,
                  top: flow * (y2 - y1) - 10,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  background: c.white,
                  boxShadow: `0 0 20px ${c.accent}`,
                }}
              />
            )}
          </div>
        );
      })}
      {NODES.map((n, i) => (
        <div
          key={n.key}
          style={{
            position: "absolute",
            left: 160,
            top: NODE_Y[i] - 70,
            display: "flex",
            alignItems: "center",
            gap: 40,
            opacity: 0.25 + 0.75 * on[i],
            transform: `translateX(${(1 - on[i]) * -30}px)`,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              background: on[i] > 0.5 ? c.accent : c.charcoal,
              border: `4px solid ${c.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: c.white,
              fontFamily: brand.font.display,
              fontWeight: 900,
              fontSize: 54,
              boxShadow: `0 0 ${60 * on[i]}px ${c.accentGlow}`,
            }}
          >
            {n.glyph}
          </div>
          <div style={{ fontFamily: brand.font.family, color: c.white }}>
            <div style={{ fontSize: 62, fontWeight: 850, letterSpacing: -1 }}>{n.title}</div>
            <div style={{ fontSize: 32, color: c.muted, fontWeight: 500, marginTop: 4, maxWidth: 640 }}>{n.sub}</div>
          </div>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 100,
          top: 1120,
          height: 110,
          borderRadius: 30,
          background: `linear-gradient(90deg, ${c.accent}, #7B93FF)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          color: c.white,
          fontFamily: brand.font.display,
          fontWeight: 900,
          fontSize: 50,
          letterSpacing: 6,
          opacity: rev,
          transform: `scale(${0.9 + rev * 0.1})`,
          boxShadow: `0 20px 80px ${c.accentGlow}`,
        }}
      >
        REVENUE
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <path d="M5 19L19 5M9 5h10v10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { brand } from "../brand";
import { useFilm } from "../context";
import { Presenter } from "../components/Presenter";
import { cueTime, TimedScene } from "../timeline";
import { ramp, useFilmTime } from "../components/Words";

const c = brand.colors;

const Chip: React.FC<{ p: number; label: string; icon: React.ReactNode }> = ({ p, label, icon }) => (
  <div
    style={{
      opacity: p,
      transform: `translateY(${(1 - p) * 30}px)`,
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "18px 28px",
      borderRadius: 999,
      background: c.charcoal,
      border: `2px solid ${c.line}`,
      color: c.white,
      fontFamily: brand.font.family,
      fontWeight: 650,
      fontSize: 34,
    }}
  >
    {icon}
    {label}
  </div>
);

const FactoryIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2">
    <path d="M3 21V10l6 4V10l6 4V5h4v16z" strokeLinejoin="round" />
  </svg>
);
const ChartIcon = () => (
  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2">
    <path d="M3 20h18M6 16l4-5 3 3 5-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Intro: React.FC<{ scene: TimedScene }> = ({ scene }) => {
  const { tl } = useFilm();
  const t = useFilmTime(scene.start);
  const nameP = ramp(t, cueTime(tl, "intro", "name") - 0.1, 0.5);
  const yearsAt = cueTime(tl, "intro", "years");
  const years = Math.round(interpolate(t, [yearsAt, yearsAt + 0.8], [0, 16], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const yearsP = ramp(t, yearsAt - 0.1, 0.4);

  return (
    <AbsoluteFill>
      <Presenter at={scene.start} style={{ left: 90, top: 150, width: 900, height: 1060, borderRadius: 44 }} />
      {/* Lower third */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 1000,
          width: 900,
          padding: "30px 44px",
          boxSizing: "border-box",
          background: "linear-gradient(180deg, rgba(6,10,28,0.0), rgba(6,10,28,0.92) 35%)",
          borderRadius: "0 0 44px 44px",
          opacity: nameP,
          transform: `translateY(${(1 - nameP) * 40}px)`,
          fontFamily: brand.font.family,
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 850, color: c.white, letterSpacing: -1 }}>{brand.name}</div>
        <div style={{ fontSize: 30, fontWeight: 700, color: c.accent, letterSpacing: 6, marginTop: 6 }}>
          {brand.positioning}
        </div>
      </div>
      {/* 16 years stat */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 110,
          opacity: yearsP,
          transform: `scale(${0.8 + yearsP * 0.2})`,
          background: c.accent,
          color: c.white,
          borderRadius: 30,
          padding: "20px 30px",
          textAlign: "center",
          fontFamily: brand.font.display,
          boxShadow: `0 20px 60px ${c.accentGlow}`,
        }}
      >
        <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 1 }}>{years}+</div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4 }}>YEARS</div>
      </div>
      <div style={{ position: "absolute", top: 1560, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24 }}>
        <Chip p={ramp(t, cueTime(tl, "intro", "factory"), 0.4)} label="Factory floors" icon={<FactoryIcon />} />
        <Chip p={ramp(t, cueTime(tl, "intro", "digital"), 0.4)} label="Digital campaigns" icon={<ChartIcon />} />
      </div>
    </AbsoluteFill>
  );
};

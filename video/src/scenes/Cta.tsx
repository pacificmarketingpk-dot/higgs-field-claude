import React from "react";
import { AbsoluteFill } from "remotion";
import { brand } from "../brand";
import { useFilm } from "../context";
import { Presenter } from "../components/Presenter";
import { cueTime, TimedScene } from "../timeline";
import { ramp, useFilmTime, Words } from "../components/Words";

const c = brand.colors;

export const Cta: React.FC<{ scene: TimedScene }> = ({ scene }) => {
  const { tl } = useFilm();
  const t = useFilmTime(scene.start);
  const w = tl.words.filter((x) => x.scene === "cta");
  const buildP = ramp(t, cueTime(tl, "cta", "build") - 0.1, 0.45);
  const mag = ["m", "a", "g"].map((k) => ramp(t, cueTime(tl, "cta", k) - 0.05, 0.35));
  const endCard = ramp(t, w[w.length - 1].end + 0.15, 0.6);
  const photo = ramp(t, scene.start + 0.1, 0.6);
  const headline = 1 - endCard;

  return (
    <AbsoluteFill style={{ fontFamily: brand.font.family, color: c.white, alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          top: 170,
          width: 420,
          height: 420,
          borderRadius: 210,
          padding: 8,
          background: `conic-gradient(${c.accent}, #9FB0FF, ${c.accent})`,
          opacity: photo,
          transform: `scale(${0.9 + photo * 0.1})`,
          boxShadow: `0 0 80px ${c.accentGlow}`,
        }}
      >
        <div style={{ position: "relative", width: 420, height: 420, borderRadius: 210, overflow: "hidden", background: c.navy }}>
          <Presenter at={scene.start} compact style={{ left: 0, top: 0, width: 420, height: 420, borderRadius: 210 }} />
        </div>
      </div>

      {/* Spoken headline (fades as the end card takes over) */}
      <div style={{ position: "absolute", top: 680, left: 80, right: 80, opacity: headline }}>
        <Words
          words={w.slice(0, 9)}
          base={scene.start}
          style={{ fontSize: 74, fontWeight: 850, letterSpacing: -1.5, lineHeight: 1.12 }}
          wordStyle={(x) => ({ color: x.emphasis ? c.accent : c.white })}
        />
        <div
          style={{
            marginTop: 50,
            display: "flex",
            justifyContent: "center",
            opacity: buildP,
            transform: `translateY(${(1 - buildP) * 30}px)`,
          }}
        >
          <div
            style={{
              padding: "28px 50px",
              borderRadius: 999,
              background: c.accent,
              fontSize: 44,
              fontWeight: 850,
              boxShadow: `0 20px 70px ${c.accentGlow}`,
            }}
          >
            Let’s build your growth system →
          </div>
        </div>
      </div>

      {/* End card */}
      <div style={{ position: "absolute", top: 700, left: 60, right: 60, textAlign: "center", opacity: endCard, transform: `translateY(${(1 - endCard) * 40}px)` }}>
        <div style={{ fontFamily: brand.font.display, fontSize: 96, fontWeight: 900, letterSpacing: -3, lineHeight: 1.02 }}>
          {brand.name}
        </div>
        <div style={{ width: 120 * endCard, height: 6, background: c.accent, borderRadius: 3, margin: "34px auto" }} />
        <div style={{ fontSize: 30, fontWeight: 600, color: c.muted, lineHeight: 1.4, maxWidth: 820, margin: "0 auto", textWrap: "balance" } as React.CSSProperties}>{brand.tagline}</div>
        <div style={{ marginTop: 60, fontSize: 30, fontWeight: 700, letterSpacing: 2, color: c.white }}>{brand.handle}</div>
      </div>

      {/* MARKETING × AI × GROWTH — each word lights as it is spoken */}
      <div
        style={{
          position: "absolute",
          top: 1330,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 26,
          fontFamily: brand.font.display,
          fontWeight: 900,
          fontSize: 58,
          letterSpacing: 4,
        }}
      >
        {["MARKETING", "AI", "GROWTH"].map((label, i) => (
          <React.Fragment key={label}>
            {i > 0 && <span style={{ color: c.accent, opacity: Math.max(mag[i - 1], 0.15) }}>×</span>}
            <span
              style={{
                color: c.white,
                opacity: 0.15 + 0.85 * mag[i],
                transform: `scale(${0.92 + 0.08 * mag[i]})`,
                display: "inline-block",
                textShadow: mag[i] > 0.5 ? `0 0 40px ${c.accentGlow}` : "none",
              }}
            >
              {label}
            </span>
          </React.Fragment>
        ))}
      </div>
    </AbsoluteFill>
  );
};

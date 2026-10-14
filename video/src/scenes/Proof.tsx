import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { brand } from "../brand";
import { useFilm } from "../context";
import { cueTime, TimedScene } from "../timeline";
import { ramp, useFilmTime } from "../components/Words";

const c = brand.colors;

// Figures from Mohammad Ali Khan's CV (Case Study 2, energy-sector Meta Ads).
const SPEND = 2200;
const SALES = 40000;

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const Tile: React.FC<{ label: string; value: string; p: number; accent?: boolean }> = ({ label, value, p, accent }) => (
  <div
    style={{
      flex: 1,
      padding: "34px 34px",
      borderRadius: 30,
      background: accent ? c.accent : c.charcoal,
      border: `2px solid ${accent ? c.accent : c.line}`,
      opacity: 0.3 + 0.7 * p,
      transform: `translateY(${(1 - p) * 30}px)`,
      boxShadow: accent ? `0 20px 70px ${c.accentGlow}` : "none",
    }}
  >
    <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, color: accent ? "rgba(255,255,255,0.85)" : c.muted }}>
      {label}
    </div>
    <div style={{ fontSize: 84, fontWeight: 900, letterSpacing: -2, color: c.white, marginTop: 10, fontFamily: brand.font.display }}>
      {value}
    </div>
  </div>
);

export const Proof: React.FC<{ scene: TimedScene }> = ({ scene }) => {
  const { tl } = useFilm();
  const t = useFilmTime(scene.start);
  const card = ramp(t, scene.start + 0.1, 0.6);
  const spendAt = cueTime(tl, "proof", "spend");
  const salesAt = cueTime(tl, "proof", "sales");
  const spendP = ramp(t, spendAt - 0.1, 0.4);
  const salesP = ramp(t, salesAt - 0.1, 0.4);
  const spend = interpolate(t, [spendAt, spendAt + 1.0], [0, SPEND], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sales = interpolate(t, [salesAt, salesAt + 1.3], [0, SALES], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const roasP = ramp(t, cueTime(tl, "proof", "confirmed"), 0.5);
  const barMax = 560;

  return (
    <AbsoluteFill style={{ fontFamily: brand.font.family, color: c.white }}>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 170,
          padding: 44,
          borderRadius: 44,
          background: "rgba(19,32,77,0.65)",
          border: `2px solid ${c.line}`,
          opacity: card,
          transform: `translateY(${(1 - card) * 40}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: c.accent, boxShadow: `0 0 18px ${c.accent}` }} />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4, color: c.muted }}>CASE STUDY · META ADS</div>
        </div>
        <div style={{ fontSize: 58, fontWeight: 850, marginTop: 16, letterSpacing: -1 }}>Solar energy client</div>
        <div style={{ fontSize: 32, color: c.muted, marginTop: 6 }}>3-month campaign</div>

        <div style={{ display: "flex", gap: 26, marginTop: 44 }}>
          <Tile label="AD SPEND" value={money(spend)} p={spendP} />
          <Tile label="CONFIRMED SALES" value={money(sales) + (sales >= SALES ? "+" : "")} p={salesP} accent />
        </div>

        <div style={{ marginTop: 50 }}>
          {[
            { label: "Spend", v: SPEND, p: spendP, color: "rgba(255,255,255,0.35)" },
            { label: "Sales", v: SALES, p: salesP, color: c.accent },
          ].map((b) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 18 }}>
              <div style={{ width: 110, fontSize: 28, color: c.muted, fontWeight: 600 }}>{b.label}</div>
              <div style={{ height: 44, width: Math.max(10, (b.v / SALES) * barMax * b.p), background: b.color, borderRadius: 12 }} />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1120,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: roasP,
          transform: `scale(${0.85 + roasP * 0.15})`,
        }}
      >
        <div
          style={{
            padding: "22px 40px",
            borderRadius: 999,
            border: `3px solid ${c.accent}`,
            background: c.accentSoft,
            fontSize: 44,
            fontWeight: 850,
          }}
        >
          ≈ <span style={{ color: c.accent }}>18×</span> return on ad spend
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 90, width: "100%", textAlign: "center", fontSize: 22, color: "rgba(255,255,255,0.4)" }}>
        Result for one client. Outcomes vary by business.
      </div>
    </AbsoluteFill>
  );
};

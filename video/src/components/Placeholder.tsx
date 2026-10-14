import React from "react";
import { brand } from "../brand";

const c = brand.colors;

// Clearly-marked stand-in for an asset that does not exist yet.
export const PlaceholderCard: React.FC<{
  title: string;
  lines: string[];
  style?: React.CSSProperties;
  compact?: boolean;
}> = ({ title, lines, style, compact }) => (
  <div
    style={{
      position: "absolute",
      boxSizing: "border-box",
      border: `4px dashed ${c.accent}`,
      borderRadius: 36,
      background: `repeating-linear-gradient(135deg, ${c.navyLift} 0 26px, ${c.navy} 26px 52px)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: compact ? 10 : 18,
      padding: compact ? 18 : 40,
      color: c.white,
      fontFamily: brand.font.family,
      textAlign: "center",
      overflow: "hidden",
      ...style,
    }}
  >
    <svg width={compact ? 90 : 170} height={compact ? 90 : 170} viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="36" r="18" fill="none" stroke={c.accent} strokeWidth="4" />
      <path d="M18 88c4-18 17-28 32-28s28 10 32 28" fill="none" stroke={c.accent} strokeWidth="4" />
    </svg>
    <div
      style={{
        fontSize: compact ? 22 : 30,
        fontWeight: 800,
        letterSpacing: 3,
        color: c.accent,
        background: "rgba(6,10,28,0.85)",
        padding: "6px 14px",
        borderRadius: 10,
      }}
    >
      PLACEHOLDER
    </div>
    <div style={{ fontSize: compact ? 26 : 40, fontWeight: 700 }}>{title}</div>
    {!compact &&
      lines.map((l) => (
        <div key={l} style={{ fontSize: 26, color: c.muted, maxWidth: 760, lineHeight: 1.35 }}>
          {l}
        </div>
      ))}
  </div>
);

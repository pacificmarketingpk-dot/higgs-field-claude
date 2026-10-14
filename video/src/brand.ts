// Brand tokens — Mohammad Ali Khan. Edit here; every scene reads from this file.
export const brand = {
  name: "Mohammad Ali Khan",
  positioning: "MARKETING × AI × GROWTH",
  tagline: "Turning Business Opportunities Into Scalable Growth Systems",
  handle: "linkedin.com/in/leadgenwithkhan",
  colors: {
    navyDeep: "#060A1C",
    navy: "#0B1433",
    navyLift: "#13204D",
    charcoal: "#1B1E26",
    line: "rgba(255,255,255,0.10)",
    white: "#FFFFFF",
    muted: "rgba(255,255,255,0.62)",
    accent: "#5170FF",
    accentSoft: "rgba(81,112,255,0.18)",
    accentGlow: "rgba(81,112,255,0.45)",
    warn: "#FF6B6B",
  },
  font: {
    family: "'Inter', 'Inter Display', system-ui, sans-serif",
    display: "'Inter Display', 'Inter', system-ui, sans-serif",
  },
} as const;

export const VIDEO = { width: 1080, height: 1920, fps: 30, seconds: 60 } as const;
export const TOTAL_FRAMES = VIDEO.fps * VIDEO.seconds;

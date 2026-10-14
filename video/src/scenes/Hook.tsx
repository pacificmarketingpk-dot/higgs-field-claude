import React from "react";
import { AbsoluteFill } from "remotion";
import { brand } from "../brand";
import { useFilm } from "../context";
import { cueTime, TimedScene } from "../timeline";
import { ramp, useFilmTime, Words } from "../components/Words";

const c = brand.colors;

export const Hook: React.FC<{ scene: TimedScene }> = ({ scene }) => {
  const { tl } = useFilm();
  const t = useFilmTime(scene.start);
  const w = tl.words.filter((x) => x.scene === "hook");
  const systemsAt = cueTime(tl, "hook", "systems");
  const marketingAt = cueTime(tl, "hook", "marketing");
  const strike = ramp(t, systemsAt - 0.05, 0.35);
  const settle = ramp(t, w[7].start - 0.1, 0.5); // "They" — first block steps back
  const big = (color: string): React.CSSProperties => ({
    fontFamily: brand.font.display,
    fontWeight: 900,
    fontSize: 168,
    letterSpacing: -6,
    lineHeight: 1,
    textTransform: "uppercase",
    color,
  });
  const small: React.CSSProperties = { fontFamily: brand.font.family, fontWeight: 600, fontSize: 60, color: c.white, maxWidth: 960 };
  const mkPop = ramp(t, marketingAt, 0.3);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 60 }}>
      <div style={{ transform: `translateY(${-settle * 70}px) scale(${1 - settle * 0.12})`, opacity: 1 - settle * 0.45 }}>
        <Words words={w.slice(0, 5)} base={scene.start} style={small} />
        <div style={{ position: "relative", marginTop: 18, textAlign: "center" }}>
          <Words
            words={[w[5]]}
            base={scene.start}
            style={big(c.white)}
            wordStyle={() => ({ transform: `scale(${0.9 + mkPop * 0.1})`, color: c.white })}
          />
          <div
            style={{
              position: "absolute",
              left: "4%",
              top: "50%",
              height: 16,
              width: `${92 * strike}%`,
              background: c.warn,
              borderRadius: 8,
              transform: "rotate(-3deg)",
              boxShadow: "0 0 30px rgba(255,107,107,0.6)",
            }}
          />
        </div>
        <Words words={[w[6]]} base={scene.start} style={{ ...small, marginTop: 10, color: c.muted }} />
      </div>
      <div style={{ marginTop: 40 }}>
        <Words words={w.slice(7, 10)} base={scene.start} style={small} />
        <Words
          words={[w[10]]}
          base={scene.start}
          style={{ ...big(c.accent), marginTop: 18, textShadow: `0 0 60px ${c.accentGlow}` }}
          wordStyle={(_, i) => ({
            transform: `scale(${0.85 + ramp(t, systemsAt, 0.35) * 0.15})`,
          })}
        />
        <Words words={[w[11]]} base={scene.start} style={{ ...small, marginTop: 10 }} />
      </div>
    </AbsoluteFill>
  );
};

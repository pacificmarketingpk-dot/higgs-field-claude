import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, VIDEO } from "./brand";
import { Background } from "./components/Background";
import { Captions } from "./components/Captions";
import { OVERLAP, SceneShell } from "./components/SceneShell";
import { Soundtrack } from "./components/Soundtrack";
import { FilmFlags, FilmProvider } from "./context";
import { Cta } from "./scenes/Cta";
import { Hook } from "./scenes/Hook";
import { Intro } from "./scenes/Intro";
import { Problem } from "./scenes/Problem";
import { Proof } from "./scenes/Proof";
import { System } from "./scenes/System";
import { SceneId } from "./script";
import { AlignedWord, buildTimeline, sec, TimedScene } from "./timeline";

export interface FilmProps {
  showPlaceholders: boolean;
  alignment: AlignedWord[] | null;
  flags: Omit<FilmFlags, "showPlaceholders">;
  [key: string]: unknown;
}

const SCENES: Record<SceneId, React.FC<{ scene: TimedScene }>> = {
  hook: Hook,
  intro: Intro,
  problem: Problem,
  system: System,
  proof: Proof,
  cta: Cta,
};

// Captions are carried by the scene's own typography in these scenes.
const NO_CAPTIONS: SceneId[] = ["hook", "cta"];

const VoiceBadge: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 40,
      left: 40,
      padding: "10px 18px",
      borderRadius: 12,
      border: `3px dashed ${brand.colors.accent}`,
      background: "rgba(6,10,28,0.85)",
      color: brand.colors.white,
      fontFamily: brand.font.family,
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: 1,
    }}
  >
    PLACEHOLDER · narration not recorded yet (public/audio/narration.wav)
  </div>
);

const CaptionLayer: React.FC<{ scenes: TimedScene[] }> = ({ scenes }) => {
  const { fps } = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const s = scenes.find((x) => t >= x.start && t < x.end);
  if (!s || NO_CAPTIONS.includes(s.id)) return null;
  return <Captions />;
};

export const MAKBrandFilm: React.FC<FilmProps> = ({ showPlaceholders, alignment, flags }) => {
  const tl = React.useMemo(() => buildTimeline(alignment), [alignment]);
  const full: FilmFlags = { ...flags, showPlaceholders };
  return (
    <FilmProvider tl={tl} flags={full}>
      <AbsoluteFill style={{ background: brand.colors.navyDeep }}>
        <Background />
        {tl.scenes.map((s, i) => {
          const Scene = SCENES[s.id];
          const from = Math.max(0, sec(s.start) - (i === 0 ? 0 : OVERLAP / 2));
          const to = sec(s.end) + (i === tl.scenes.length - 1 ? 0 : OVERLAP / 2);
          return (
            <Sequence key={s.id} from={from} durationInFrames={to - from} name={`Scene: ${s.id}`}>
              <SceneShell first={i === 0} last={i === tl.scenes.length - 1}>
                <Scene scene={{ ...s, start: from / VIDEO.fps }} />
              </SceneShell>
            </Sequence>
          );
        })}
        <CaptionLayer scenes={tl.scenes} />
        {showPlaceholders && !flags.hasNarration && <VoiceBadge />}
        <Soundtrack />
      </AbsoluteFill>
    </FilmProvider>
  );
};

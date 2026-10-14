import React from "react";
import { CalculateMetadataFunction, Composition, staticFile } from "remotion";
import { TOTAL_FRAMES, VIDEO } from "./brand";
import { PRESENTER_FILE } from "./components/Presenter";
import { MUSIC_FILE, NARRATION_FILE } from "./components/Soundtrack";
import { FilmProps, MAKBrandFilm } from "./MAKBrandFilm";

export const ALIGNMENT_FILE = "audio/narration.alignment.json";

const exists = async (file: string) => {
  try {
    const r = await fetch(staticFile(file), { method: "HEAD" });
    return r.ok;
  } catch {
    return false;
  }
};

// Detects which real assets are present, so the same project renders with
// placeholders today and with Mohammad's real footage and voice once they are dropped in.
const calculateMetadata: CalculateMetadataFunction<FilmProps> = async ({ props }) => {
  const [hasNarration, hasPresenter, hasMusic, hasAlignment] = await Promise.all([
    exists(NARRATION_FILE),
    exists(PRESENTER_FILE),
    exists(MUSIC_FILE),
    exists(ALIGNMENT_FILE),
  ]);
  const alignment = hasAlignment ? await (await fetch(staticFile(ALIGNMENT_FILE))).json() : null;
  return {
    durationInFrames: TOTAL_FRAMES,
    props: { ...props, alignment, flags: { hasNarration, hasPresenter, hasMusic } },
  };
};

export const Root: React.FC = () => (
  <Composition
    id="MAKBrandFilm"
    component={MAKBrandFilm}
    durationInFrames={TOTAL_FRAMES}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
    defaultProps={{
      showPlaceholders: true,
      alignment: null,
      flags: { hasNarration: false, hasPresenter: false, hasMusic: false },
    }}
    calculateMetadata={calculateMetadata}
  />
);

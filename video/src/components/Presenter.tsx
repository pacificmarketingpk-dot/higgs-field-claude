import React from "react";
import { OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useFilm } from "../context";
import { PlaceholderCard } from "./Placeholder";

export const PRESENTER_FILE = "presenter/talking-head.mp4";

// Talking-head footage of Mohammad Ali Khan. The clip is muted: his voice comes from
// the narration track so picture and sound can be replaced independently.
// `at` = second of the full film this slot first appears; the clip is played in
// film time so lip movement stays in sync with the narration across cuts.
export const Presenter: React.FC<{ style: React.CSSProperties; at: number; compact?: boolean }> = ({
  style,
  at,
  compact,
}) => {
  const { flags } = useFilm();
  const { fps } = useVideoConfig();
  useCurrentFrame();
  if (flags.hasPresenter) {
    return (
      <div style={{ position: "absolute", overflow: "hidden", ...style }}>
        <OffthreadVideo
          src={staticFile(PRESENTER_FILE)}
          muted
          startFrom={Math.round(at * fps)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }
  if (!flags.showPlaceholders) return null;
  return (
    <PlaceholderCard
      compact={compact}
      style={style}
      title="Mohammad Ali Khan · talking head"
      lines={[
        "Footage not generated yet. Create it from your own face/avatar reference,",
        `then save it as public/${PRESENTER_FILE} (1080×1920, full 60 s, lip-synced to the narration).`,
      ]}
    />
  );
};

# Talking-head brief — Mohammad Ali Khan

The film needs **one continuous 60 s, 1080×1920 clip of you** speaking the narration, saved as
`video/public/presenter/talking-head.mp4`. It is played muted (your voice comes from `narration.wav`)
and in film time, so the same clip stays lip-synced in both places it appears:

| Film time | Where | Framing |
|---|---|---|
| 06–15 s | Intro, large rounded card (900×1060) | Chest-up, eyes to lens, centred, headroom for the "16+ YEARS" badge top-right |
| 50–60 s | CTA, circular portrait (420 px) | Same shot; face centred so it survives the circle crop |

Look: deep navy / charcoal background or softly lit office, a little cool key light, dark or navy clothing,
no logos. Confident, conversational, no exaggerated gestures.

## Route A — film it (recommended, fastest)
Phone on a tripod, vertical, 4K/30 if possible, read `docs/narration-cue-sheet.md` to camera.
Record the audio on the phone or a lav mic. Save the video as `talking-head.mp4` and its audio as `narration.wav`.

## Route B — generate from your avatar in Higgsfield
1. Provide 10–20 clear photos of your face (varied angles, good light) — none were found in your Drive.
2. Train a Soul Character from them (`higgsfield soul-id …`, skill `higgsfield-soul-id`).
3. Record `narration.wav` in your own voice (or, with your written authorisation, clone it from
   `assets/source/presenter/mak_voice_sample_2025-08-14.wav`).
4. Generate a lip-synced talking head driven by that audio using your Soul ID; export 1080×1920, 60 s.

Nothing in this route has been run yet: the Higgsfield CLI is not signed in and no face reference exists.

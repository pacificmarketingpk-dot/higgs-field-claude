# Asset manifest — Mohammad Ali Khan brand film (60 s, 1080×1920, 30 fps)

Audit date: 2026-10-14. Searched this repo, your Google Drive (owned + shared), your ElevenLabs workspace
(voices + asset library) and the Higgsfield connector.

## Audit result

| Asset | Status | What was found |
|---|---|---|
| Face / avatar reference | **MISSING** | No portrait, avatar, Soul ID or character sheet of you was found. Drive photos found were either not of you (e.g. `IMG_2137.jpeg` is a restaurant interior) or undated personal photos from 2017–2019 that I did not use without your confirmation. |
| Usable talking-head footage | **MISSING** | The only video of you (`…Aug 14, 2025-VEED.mp4`) is captions on green screen — no face on camera. |
| Original voice recording | **FOUND (needs your confirmation)** | 30 s of speech in the VEED video, extracted to `source/presenter/mak_voice_sample_2025-08-14.wav`. It is a different script, so it is **not** used as narration; it is reserved as the reference for an authorised voice clone or as a tone guide for your recording. |
| Narration for this film | **MISSING** | Script + timings written (`docs/narration-cue-sheet.md`); slot is `video/public/audio/narration.wav`. |
| Voice clone | **NOT CREATED** | ElevenLabs has no voice of yours (search results were other people's library voices — none used). |
| Existing generated video clips | **NONE** | Nothing in Higgsfield/ElevenLabs libraries; Higgsfield CLI is not signed in. |
| Brand assets | **PARTIAL** | Brand direction from your brief (name, positioning, tagline, #5170FF, navy/charcoal/white) built into `video/src/brand.ts`. No personal logo file exists; the film uses a typographic wordmark. Facts and case-study figures come from `Mohammad Ali Khan CV 31 May 2026` (Drive). |
| Music & sound effects | **GENERATED** | No licensed music/SFX found. Synthesised in code (`video/tools/make-sfx.sh`) — royalty-free, replaceable by dropping a file of the same name. |

## Files

| Path | Origin | Intended use |
|---|---|---|
| `assets/source/presenter/mak_veed_2025-08-14.mp4` | Drive: *Mohammad Ali Khan (Unimind Studios)'s Video - Aug 14, 2025-VEED.mp4* | Source of your voice sample. Not placed in the film. |
| `assets/source/presenter/mak_voice_sample_2025-08-14.wav` | Extracted from the above (48 kHz mono) | Voice-clone reference **only after your authorisation**; tone reference for recording. |
| `video/public/presenter/talking-head.mp4` | **PLACEHOLDER — not created** | Your talking head, full 60 s, muted in the mix, shown in Intro (6–15 s) and CTA (50–60 s). |
| `video/public/audio/narration.wav` | **PLACEHOLDER — not recorded** | Your narration; master timing reference. |
| `video/public/audio/narration.alignment.json` | **PLACEHOLDER** | Word timings of your recording (`[{"word","start","end"}]`, seconds). Re-times every scene, caption, UI cue and SFX. |
| `video/public/audio/music/bed.wav` | Generated (ambient pad, D major, 60 s) | Music bed, ducked under the voice. |
| `video/public/audio/sfx/{whoosh,impact,tick,glitch,count,riser,shimmer}.wav` | Generated | Transition + UI sound effects, each tied to a narration cue. |
| `deliverables/mak-brand-film_preview-placeholders.mp4` | Rendered | Timing/layout preview with placeholders visible and no voice. **Not the final film.** |
| `docs/narration-cue-sheet.md` | Generated from the script | What to record, scene in/out points, per-word timings. |
| `docs/talking-head-brief.md` | Written | How to produce the talking head from your own reference. |

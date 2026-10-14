# Mohammad Ali Khan — 60 s brand film (editable)

Remotion (React) project. Every word, colour, timing, transition and sound cue is code.

```
npm install
npm run studio          # live editor / timeline at http://localhost:3000
npm run render          # final MP4 → out/mak-brand-film.mp4 (placeholders shown if assets missing)
npm run render:clean    # same, placeholders hidden
npm run sfx             # re-synthesise sound effects + music bed
```

## Where things live
| Edit this | File |
|---|---|
| Narration text, emphasis (`*word*`), scene timings, cue words | `src/script.ts` |
| Name, tagline, colours, fonts | `src/brand.ts` |
| Scenes (Hook, Intro, Problem, System, Proof, CTA) | `src/scenes/*.tsx` |
| Captions / transitions / presenter slot / sound mix | `src/components/*.tsx` |
| Timing engine (estimate ⇄ real recording) | `src/timeline.ts` |

## Finishing with your real voice and face
1. Record the script in `../docs/narration-cue-sheet.md` → `public/audio/narration.wav` (48 kHz WAV, peaks ≤ −3 dBFS).
2. Get word timings of that recording (any transcriber with word timestamps, e.g. ElevenLabs Scribe or Whisper)
   → `public/audio/narration.alignment.json` as `[{"word":"Most","start":0.42,"end":0.61}, …]`.
   All scenes, captions, UI animations and SFX snap to your actual words; the voice is never sped up.
   If the read runs past 60 s the timeline reports it — tighten the read rather than stretching audio.
3. Add `public/presenter/talking-head.mp4` (see `../docs/talking-head-brief.md`).
4. `npm run render:clean`. Footage, voice, music and motion stay separate files, so any one can be replaced.

Rendering in this cloud container uses the preinstalled Chromium (see `remotion.config.ts`);
elsewhere run with `REMOTION_BROWSER=auto`.

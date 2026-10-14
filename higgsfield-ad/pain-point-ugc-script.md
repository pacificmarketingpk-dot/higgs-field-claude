# Higgsfield — "I stopped waiting on video" · pain-point UGC script v1

**Format:** UGC talking-head ad, 9:16, ~30 s, captions burned in.
**Structure:** Hook → Pain → Agitate → Turn → Solution/proof → CTA.
**Audience:** small-business owners, solo marketers and creators who need ad video every week but have no crew, no budget and no time.
**Core pain:** video is the content that performs best, and it's the slowest, most expensive thing to make.

## Presenter
- **MAYA** (~28–32, founder of a small skincare brand), hoodie, hair up, kitchen-table office, phone propped on a ring light. Natural daylight, slight handheld wobble, real-phone feel.
- Tone: tired-then-relieved, talking to a friend, not selling.

## Beat sheet

| # | Time | Beat | Shot | Maya says (VO / on camera) | On-screen text | SFX / cut |
|---|---|---|---|---|---|---|
| 1 | 0:00–0:03 | **Hook** | Tight selfie, she drops her face into her hands, then looks up | "I spent three weeks and my whole ad budget on *one* video." | ONE video. 3 weeks. | Phone-notification ping, hard cut |
| 2 | 0:03–0:08 | **Pain** | B-roll montage, quick cuts: messy calendar, an unanswered freelancer email, a quote with a big total circled in red | "Booking a shoot. Chasing the editor. Waiting on revisions." | Booking… Chasing… Waiting… | Three quick whooshes, one per item |
| 3 | 0:08–0:13 | **Agitate** | Back to selfie, she scrolls her phone showing a flat ad-results screen | "And by the time it went live? The trend was dead. Ad got ignored. Back to zero." | Trend: dead 💀 | Sad trombone-lite "bloop" (subtle) |
| 4 | 0:13–0:16 | **Turn** | She leans into camera, lowers voice | "So here's what I do now." | — | Music drops in (upbeat bed) |
| 5 | 0:16–0:24 | **Solution** | Screen-record style: she types a prompt in Higgsfield, uploads a product photo, a finished vertical ad plays. Then she's in frame holding her phone up to camera showing the result | "I type what I want, drop in my product, and Higgsfield makes the video. UGC, product shots, even the ad itself — in minutes, not weeks." | Prompt → Product → Video ✅ | Keyboard taps, soft "shimmer" on reveal |
| 6 | 0:24–0:27 | **Proof / payoff** | Selfie, relaxed, a grid of 4–6 different ad variations on her laptop behind her | "Now I test five ads a week instead of one a month." | 5 ads / week | Pop on each grid tile |
| 7 | 0:27–0:30 | **CTA** | Points down at caption | "If video's your bottleneck — try Higgsfield. Link below." | Try Higgsfield ↓ | Music button-out |

> Line 6 ("five ads a week") is a presenter's personal claim, not a product statistic. Keep it as her own experience, or swap it for a real customer number before running paid.

## Alternate hooks (A/B test — swap into beat 1)
1. "Nobody tells you the hardest part of running ads is making the video."
2. "My editor quoted me more than my ad budget. So I fired the process, not the editor."
3. "POV: you have a great product and zero video for it."
4. "If you've ever said 'I'll post the ad once the video's done'… this is for you."
5. "Stop paying for a shoot to test *one* idea."

## Higgsfield generation plan

Generate in segments so each beat can be re-rolled without redoing the whole ad, then cut together.

| Segment | Beats | Tool / mode | Duration | Notes |
|---|---|---|---|---|
| A — Hook + agitate | 1, 3, 4 | `marketing_studio_video`, `--mode ugc`, `9:16`, `generate_audio: true` | ~8 s each or one 16 s take | Same avatar (Maya) for all presenter segments; keep wardrobe/location identical. |
| B — Pain montage | 2 | `generate_image` (3 stills) → `generate_video` image-to-video, 2 s each | ~5 s | Calendar, email inbox, invoice with red circle. No real brand names or real people's emails on screen. |
| C — Solution demo | 5 | `marketing_studio_video`, `--mode ugc_how_to`, `9:16` | ~8 s | Pair with a real screen recording of the Higgsfield UI for the "typing a prompt" moment — don't generate fake UI. |
| D — Proof + CTA | 6, 7 | `marketing_studio_video`, `--mode ugc`, `9:16` | ~6 s | Laptop grid can be a composite of real outputs from segments A–C. |

**Presenter prompt (reuse for every Maya segment):**
> Vertical 9:16 UGC selfie video. A woman around 30, founder of a small skincare brand, grey hoodie, hair in a loose bun, sitting at a kitchen table with a laptop and a ring light. Soft morning daylight from a side window, slightly handheld phone camera, natural skin texture, casual and honest delivery, talking directly to camera.

**Captions:** bold white sans with black outline, 2–4 words per card, highlight the key word of each line (one, waiting, dead, minutes, five, Higgsfield).

## Audio
- Native dialogue from generation; re-record as VO if lip-sync drifts.
- Music enters at beat 4 (the turn) — silence or room tone before it makes the pain feel heavier.
- Mix: dialogue ~ −14 LUFS for social, peaks ≤ −1 dBTP.

## Before running as a paid ad
- Confirm any product claims ("in minutes", supported formats) against Higgsfield's current features.
- If this runs as an official Higgsfield ad, get brand approval; if it's an affiliate/creator ad, add the platform's paid-partnership disclosure.

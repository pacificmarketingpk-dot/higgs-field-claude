# Build the Higgsfield pain-point ad in Claude Code

## 1. One-time setup (on your computer)

1. **Install Claude Code**: https://code.claude.com, then sign in.
2. **Get this repo**:
   ```bash
   git clone https://github.com/pacificmarketingpk-dot/higgs-field-claude.git
   cd higgs-field-claude
   git checkout claude/nice-franklin-kxkjfu
   ```
   The Higgsfield skills are already in the repo (`.agents/skills/` and `.claude/skills/`), so Claude Code picks them up automatically.
3. **Install the Higgsfield CLI and log in**:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/higgsfield-ai/cli/main/install.sh | sh
   higgsfield auth login
   higgsfield account status   # should show your account and credits
   ```
   *(Alternative: connect the Higgsfield connector in claude.ai → Settings → Connectors. Claude can then use it instead of the CLI.)*

## 2. Put your element photos in place

Create this folder and drop your files in with these exact names:

```
higgsfield-ad/elements/
  maya/          ← 3–5 face photos of the presenter (front, ¾ left, ¾ right)
  kitchen.jpg    ← the empty kitchen-table set
  product.jpg    ← clean product photo
  higgsfield-ui.png ← screenshot of the Higgsfield generate screen
```

These become the `@Maya`, `@Kitchen`, `@Product`, `@HiggsfieldUI` elements from the script.

## 3. Start Claude Code and paste the prompt

```bash
claude
```

Then paste the master prompt below.

---

## Master prompt (copy everything in the box)

```
Build the 30-second 9:16 UGC ad described in higgsfield-ad/pain-point-ugc-script.md using Higgsfield. Use the higgsfield-generate skill.

ELEMENTS (my reference files):
- @Maya = all photos in higgsfield-ad/elements/maya/  (the presenter — keep her face, grey hoodie and bun identical in every shot)
- @Kitchen = higgsfield-ad/elements/kitchen.jpg  (location for every presenter shot)
- @Product = higgsfield-ad/elements/product.jpg
- @HiggsfieldUI = higgsfield-ad/elements/higgsfield-ui.png

STEPS:
1. Check `higgsfield account status`. If I'm not logged in, stop and tell me to run `higgsfield auth login`.
2. Upload every element file to Higgsfield. If Marketing Studio supports a custom avatar, create one for @Maya from her photos; register @Product as a Marketing Studio product. Save all returned IDs in higgsfield-ad/elements/ids.json so we never re-upload.
3. Generate the six segments from the "Copy-paste Higgsfield prompts" section of the script, in order:
   - Prompts 1, 3, 5, 6: presenter video, 9:16, 720p, audio ON, with @Maya + @Kitchen as references (Marketing Studio mode `ugc`).
   - Prompt 2: generate the three still images, then animate each for 2 seconds (no elements).
   - Prompt 4: Marketing Studio mode `ugc_how_to`, with @Maya, @Kitchen, @Product, @HiggsfieldUI.
   Replace each @Name in the prompt text with the matching uploaded element/reference — do not describe Maya's face in words.
4. Make 2 variations per segment. Download every result into higgsfield-ad/out/segment-<n>-v<k>.mp4 and show me the links.
5. Wait for me to pick one take per segment, then stitch the picks in order with ffmpeg into higgsfield-ad/out/final-9x16.mp4, add burned-in captions from the script's "On-screen text" column (bold white, black outline, 2–4 words per card), and loudness-normalise to -14 LUFS, peaks ≤ -1 dBTP.

RULES:
- Ask me before any single step that will spend a lot of credits.
- Don't invent stats or fake UI; if the Higgsfield screen looks wrong in prompt 4, tell me and I'll supply a screen recording.
- Commit the script changes and ids.json to git, but NOT the video files.
```

---

## 4. What happens next

- Claude Code runs the steps, shows you links to each take, and pauses so you can pick.
- Reply like: `use 1-v2, 2-v1, 3-v1, 4-v2, 5-v1, 6-v2` and it builds `higgsfield-ad/out/final-9x16.mp4`.
- To redo one beat: `re-roll segment 3, she should sound more tired`.
- To test hooks: `make segment 1 again with alternate hook #3 from the script and export a second final`.

## Tips
- Keep the same `@Maya` and `@Kitchen` in every presenter shot, or her face and the room will drift between cuts.
- Short, specific prompts beat long ones: action + line of dialogue + camera + light.
- If lip-sync drifts, ask Claude Code to generate that segment with audio OFF and lay your own recorded voiceover on top.

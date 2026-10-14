// Prints the narration cue sheet (scene timings + per-word timings) as Markdown.
// Usage: npx tsx tools/export-cue-sheet.ts [public/audio/narration.alignment.json] > ../docs/narration-cue-sheet.md
import { readFileSync } from "node:fs";
import { SCRIPT } from "../src/script";
import { buildTimeline } from "../src/timeline";

const file = process.argv[2];
const tl = buildTimeline(file ? JSON.parse(readFileSync(file, "utf8")) : null);
const f = (s: number) => s.toFixed(2).padStart(5, "0");
const out: string[] = [];
out.push(`# Narration cue sheet — ${tl.source === "alignment" ? "from the recorded voice" : "ESTIMATED (no recording yet)"}`, "");
out.push("| Scene | In | Out | Line to record |", "|---|---|---|---|");
tl.scenes.forEach((s) => {
  const line = SCRIPT.find((x) => x.id === s.id)!.text.replace(/\*/g, "");
  out.push(`| ${s.id} | ${f(s.start)} | ${f(s.end)} | ${line} |`);
});
out.push("", "## Word timings", "", "| Word | Start (s) | Scene |", "|---|---|---|");
tl.words.forEach((w) => out.push(`| ${w.emphasis ? `**${w.text}**` : w.text} | ${f(w.start)} | ${w.scene} |`));
if (tl.warnings.length) out.push("", "## Warnings", ...tl.warnings.map((w) => `- ${w}`));
console.log(out.join("\n"));

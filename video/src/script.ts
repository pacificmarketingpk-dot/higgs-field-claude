// Narration script — the primary timing reference for the film.
//
// Words wrapped in *asterisks* are emphasised in the kinetic captions.
// `start`/`end` are ESTIMATES (seconds, ~140 wpm). When the real recording exists,
// drop word timings into public/audio/narration.alignment.json and every scene,
// caption, UI cue and SFX re-times itself to the actual voice (see timeline.ts).
//
// `cues` name words that trigger on-screen events; scenes look them up by key.

export type SceneId = "hook" | "intro" | "problem" | "system" | "proof" | "cta";

export interface ScriptScene {
  id: SceneId;
  start: number;
  end: number;
  text: string;
  cues: Record<string, string>; // cue key -> word (first match, case-insensitive, inside this scene)
}

export const SCRIPT: ScriptScene[] = [
  {
    id: "hook",
    start: 0,
    end: 6,
    text: "Most businesses don't have a *marketing* problem. They have a *systems* problem.",
    cues: { marketing: "marketing", systems: "systems" },
  },
  {
    id: "intro",
    start: 6,
    end: 15,
    text: "I'm *Mohammad Ali Khan*. For *sixteen years* I've built businesses, from factory floors to digital campaigns.",
    cues: { name: "Mohammad", years: "sixteen", factory: "factory", digital: "digital" },
  },
  {
    id: "problem",
    start: 15,
    end: 25,
    text: "Ads run. Leads come in. Then they *leak*: slow follow-ups, scattered tools, and no clear pipeline.",
    cues: { ads: "Ads", leads: "Leads", leak: "leak", slow: "slow", scattered: "scattered", pipeline: "pipeline" },
  },
  {
    id: "system",
    start: 25,
    end: 38,
    text: "So I connect three things. *Marketing* that earns attention. *AI* that qualifies and follows up in seconds. And *growth* systems that turn it all into revenue.",
    cues: { three: "three", marketing: "Marketing", ai: "AI", growth: "growth", revenue: "revenue" },
  },
  {
    id: "proof",
    start: 38,
    end: 50,
    text: "One solar client invested about *two thousand two hundred* dollars in Meta ads, and closed over *forty thousand* dollars in confirmed sales.",
    cues: { client: "solar", spend: "two", sales: "forty", confirmed: "confirmed" },
  },
  {
    id: "cta",
    start: 50,
    end: 60,
    text: "If you're ready to turn opportunity into *scalable growth*, let's build your system. Marketing. AI. Growth.",
    cues: { scalable: "scalable", build: "build", m: "Marketing", a: "AI", g: "Growth#2" },
  },
];

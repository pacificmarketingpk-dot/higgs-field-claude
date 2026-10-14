import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setCodec("h264");
Config.setCrf(18);
Config.setPixelFormat("yuv420p");
Config.setAudioCodec("aac");
// Cloud container: use the preinstalled headless Chromium instead of downloading one.
// Delete this line (or point it elsewhere) when rendering on another machine.
if (process.env.REMOTION_BROWSER !== "auto") {
  Config.setBrowserExecutable(
    process.env.REMOTION_BROWSER ??
      "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
  );
}

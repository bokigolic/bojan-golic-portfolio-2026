import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const origin = "http://127.0.0.1:4173";
const output = "test-results/portfolio-review";
const routes = [
  ["home", "/"],
  ["work", "/work"],
  ["case-study", "/projects/lwr-local"],
];
const browser = await chromium.launch({
  channel: process.env.CI ? "chromium" : "msedge",
});
const measurements = [];
try {
  await mkdir(output, { recursive: true });
  for (const width of [1440, 1024, 768, 390, 320]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    for (const [name, path] of routes) {
      await page.goto(origin + path);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((image) => {
            image.loading = "eager";
            return image.decode();
          }),
        );
      });
      const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      measurements.push({ width, path, scrollWidth });
      await page.screenshot({
        path: `${output}/${name}-${width}.jpg`,
        fullPage: true,
        quality: 85,
      });
    }
    await page.close();
  }
  await writeFile(
    `${output}/measurements.json`,
    JSON.stringify(measurements, null, 2) + "\n",
  );
  console.log(`Captured ${measurements.length} layouts in ${output}.`);
} finally {
  await browser.close();
}

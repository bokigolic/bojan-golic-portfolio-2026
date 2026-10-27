import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

// Local production preview only. No hosted forms or external applications.
const origin = "http://127.0.0.1:4173";
const output = "docs/verification/ux-refinement";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  channel: process.env.CI ? "chromium" : "msedge",
});
const measurements = [];
// Isolated section captures exclude sticky navigation; full pages retain it.
const sectionStyle =
  ".site-header, .skip-link { visibility: hidden !important; }";
try {
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (const image of document.images) image.loading = "eager";
      await Promise.all(
        [...document.images].map((image) => image.decode().catch(() => {})),
      );
    });
    measurements.push(
      await page.evaluate((viewport) => {
        const height = (selector) =>
          Math.round(
            document.querySelector(selector).getBoundingClientRect().height,
          );
        return {
          width: viewport,
          scrollWidth: document.documentElement.scrollWidth,
          heroHeight: height(".hero"),
          workbenchPanelHeight: height(".workbench-panel"),
        };
      }, width),
    );
    await page.screenshot({
      path: `${output}/home-${width}.jpg`,
      fullPage: true,
      quality: 85,
    });
    if (width === 1440 || width === 390) {
      for (const [name, selector] of [
        ["hero", ".hero"],
        ["workbench", "#workbench"],
        ["projects", "#work"],
        ["expertise", "#expertise"],
        ["experience", "#experience"],
        ["process-about", "#about"],
      ]) {
        await page.locator(selector).screenshot({
          path: `${output}/${name}-${width}.jpg`,
          quality: 85,
          style: sectionStyle,
        });
      }
    }
    await page.getByRole("tab").nth(2).click();
    await page.getByRole("button", { name: "Mobile", exact: true }).click();
    await page.locator("#workbench").screenshot({
      path: `${output}/workbench-mobile-${width}.jpg`,
      quality: 85,
      style: sectionStyle,
    });
    await page.close();
  }
  await writeFile(
    `${output}/measurements.json`,
    JSON.stringify(measurements, null, 2) + "\n",
  );
  console.log(JSON.stringify(measurements));
} finally {
  await browser.close();
}

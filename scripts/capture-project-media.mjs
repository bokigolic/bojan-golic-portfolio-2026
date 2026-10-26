import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("public/projects", { recursive: true });
const browser = await chromium.launch({
  channel: process.env.CI ? "chromium" : "msedge",
  headless: true,
});
try {
  for (const [slug, url] of [
    ["lwr-local", "https://lwrlocal.com/"],
    ["bokigym", "https://bokigym.netlify.app/"],
    ["english-learning", "https://be-fluent.netlify.app/"],
  ]) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      reducedMotion: "reduce",
    });
    try {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      if (slug === "english-learning") {
        await page
          .getByRole("button", { name: "Intermediate", exact: false })
          .click();
        await page
          .getByRole("button", { name: "Start Learning", exact: false })
          .click();
        await page
          .getByRole("button", { name: "Search", exact: true })
          .waitFor();
      }
      await page.screenshot({
        path: `public/projects/${slug}-desktop.jpg`,
        type: "jpeg",
        quality: 82,
      });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({
        path: `public/projects/${slug}-mobile.jpg`,
        type: "jpeg",
        quality: 82,
      });
      console.log(`Captured ${slug}: ${await page.title()}`);
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

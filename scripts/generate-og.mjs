import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { createLocale, english } from "../src/i18n/locale.js";
import serbian from "../src/i18n/sr.js";

const localized = process.argv[2] === "sr";
const { t, tag } = localized ? createLocale("sr", serbian) : english;
const output = localized ? "public/og-image-sr.png" : "public/og-image.png";
const css = await readFile("src/styles/portfolio.css", "utf8");
const fonts = [...css.matchAll(/@font-face\s*\{[^}]+\}/g)]
  .map(([rule]) => rule)
  .join("\n");
const browser = await chromium.launch({
  channel: process.env.CI ? "chromium" : "msedge",
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
  });
  await page.goto("http://127.0.0.1:4173/");
  const subtitle = localized
    ? "CMS i samostalni razvoj veb aplikacija"
    : "Enterprise CMS &amp; independent web applications";
  await page.setContent(`<!doctype html><html lang="${tag}"><head><meta charset="utf-8">
    <title>${t("Bojan Golic portfolio")}</title>
    <style>
      ${fonts}
      * {box-sizing: border-box;}
      body {margin: 0; padding: 55px 66px; height: 630px; background: #f7f5ee; color: #211e1a; font-family: Manrope, Arial, sans-serif;}
      h1 {font-size: ${localized ? 105 : 92}px; line-height: 1.04; font-weight: 800; letter-spacing: -.06em; margin: 85px 0 55px;}
      h1 span {display: block; color: #a63320;}
      footer {display: flex; justify-content: space-between; padding-top: 22px; border-top: 1px solid #d1c9ba; font-size: 22px; color: #58524a;}
    </style></head><body>
      <h1>${t("Web production meets")}<span>${t("frontend development.")}</span></h1>
      <footer><span>${subtitle}</span><span>bojangolic.com</span></footer>
    </body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: output });
  console.log(`Generated ${output} at 1200 x 630.`);
} finally {
  await browser.close();
}

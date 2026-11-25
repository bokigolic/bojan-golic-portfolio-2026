import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  channel: process.env.CI ? "chromium" : "msedge",
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto("http://127.0.0.1:4173/");
  await page.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8">
    <title>Bojan Golic portfolio social preview</title>
    <style>
      @font-face {font-family: Manrope; src: url('/fonts/manrope-latin.woff2'); font-weight: 200 800;}
      * {box-sizing: border-box;}
      body {margin: 0; padding: 55px 66px; height: 630px; background: #f7f5ee; color: #211e1a; font-family: Manrope, Arial, sans-serif;}
      header {display: flex; align-items: center; gap: 12px; font: 700 20px "Courier New", monospace; letter-spacing: 1px; text-transform: uppercase;}
      i {width: 12px; height: 12px; background: #a63320;}
      h1 {font-size: 115px; line-height: .97; font-weight: 800; letter-spacing: -.06em; margin: 60px 0 55px;}
      h1 span {display: block; color: #a63320;}
      footer {display: flex; justify-content: space-between; padding-top: 22px; border-top: 1px solid #d1c9ba; font-size: 22px; color: #58524a;}
    </style></head><body>
      <header><i></i> Portfolio of Bojan Golic</header>
      <h1>Web production<span>&amp; frontend.</span></h1>
      <footer><span>Enterprise CMS &amp; independent web applications</span><span>bojangolic.com</span></footer>
    </body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/og-image.png" });
  console.log("Generated public/og-image.png at 1200 x 630.");
} finally {
  await browser.close();
}

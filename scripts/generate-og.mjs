import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  channel: process.env.CI ? "chromium" : "msedge",
  headless: true,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto("http://127.0.0.1:4173/");
  await page.setContent(`<!doctype html><html><head><style>
    @font-face{font-family:Manrope;src:url('/fonts/manrope-latin.woff2')}*{box-sizing:border-box}body{margin:0;background:#f6f4ed;color:#1e3028;padding:55px 65px;font-family:Manrope,Arial,sans-serif;height:630px}
    header{display:flex;justify-content:space-between;align-items:center;font-size:15px}header strong{font-size:21px;letter-spacing:-1px}.tag{font-size:11px;letter-spacing:1px;text-transform:uppercase;border:1px solid #bfccb4;padding:12px 17px;border-radius:30px}
    h1{font-size:86px;line-height:1.06;font-weight:500;letter-spacing:-5px;margin:55px 0 35px}em{font-family:Georgia,serif;font-weight:400;color:#436147}footer{display:flex;justify-content:space-between;padding-top:20px;border-top:1px solid #cbd5c1;font-size:12px;color:#526249}.dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#3b6344;margin-right:10px}
    </style></head><body><header><strong>Bojan Golic<span style="color:#718658">.</span></strong><span class="tag"><span class="dot"></span>Web Producer & Digital Experience Specialist</span></header><h1>Web Producer &<br>Digital Experience<br><em>Specialist.</em></h1><footer><span>CMS / Frontend / SEO / Accessibility</span><span>bojangolic.com ↗</span></footer></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/og-image.png" });
  console.log("Generated public/og-image.png at 1200 x 630.");
} finally {
  await browser.close();
}

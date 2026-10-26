// Re-encode real captures without altering their content or using a runtime dependency.
import { chromium } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  channel: process.env.CI ? "chromium" : "msedge",
  headless: true,
});
try {
  const page = await browser.newPage();
  for (const slug of ["lwr-local", "bokigym", "english-learning"]) {
    for (const device of ["desktop", "mobile"]) {
      const source = await readFile(`public/projects/${slug}-${device}.jpg`);
      for (const width of device === "desktop" ? [1280, 640] : [390]) {
        const encoded = await page.evaluate(
          async ({ data, width }) => {
            const bitmap = await createImageBitmap(
              await (await fetch(`data:image/jpeg;base64,${data}`)).blob(),
            );
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = Math.round((bitmap.height * width) / bitmap.width);
            canvas
              .getContext("2d")
              .drawImage(bitmap, 0, 0, canvas.width, canvas.height);
            bitmap.close();
            return canvas.toDataURL("image/webp", 0.82).split(",")[1];
          },
          { data: source.toString("base64"), width },
        );
        const suffix = width === 640 ? "-640" : "";
        const target = `public/projects/${slug}-${device}${suffix}.webp`;
        const result = Buffer.from(encoded, "base64");
        await writeFile(target, result);
        console.log(`${target}: ${Math.round(result.length / 1024)} KB`);
      }
    }
  }
} finally {
  await browser.close();
}

// Read-only identity review aid. Never submits forms or signs into external apps.
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { projects } from "../src/data/projects.js";

const demoSignals = {
  "LWR Local": ["Discover Lakewood Ranch", "LWR LOCAL"],
  "BokiGym / Gym Master": ["Gym Master", "Workout Generator"],
  "Be Fluent": ["BeFluent", "Engleski"],
  BookEasy: ["BookEasy", "bookings"],
  InvoicePro: ["InvoicePro", "invoices"],
  "IV Clean": ["Magic Shine", "Lakewood Ranch"],
};
const targets = projects.flatMap((project) => [
  ...(project.liveUrl
    ? [{ project: project.name, kind: "demo", url: project.liveUrl }]
    : []),
  ...(project.githubUrl
    ? [
        { project: project.name, kind: "repository", url: project.githubUrl },
        {
          project: project.name,
          kind: "source",
          url: `${project.githubUrl}/blob/HEAD/${project.sourcePath}`,
        },
      ]
    : []),
]);
const browser = await chromium.launch({
  channel: process.env.CI ? "chromium" : "msedge",
});
const results = [];
await mkdir("playwright-report/external-links", { recursive: true });
try {
  // Small batches avoid overwhelming either the browser or the public services.
  for (let i = 0; i < targets.length; i += 3) {
    const batch = await Promise.allSettled(
      targets.slice(i, i + 3).map(async (target) => {
        const page = await browser.newPage();
        try {
          const response = await page.goto(target.url, {
            waitUntil: "domcontentloaded",
            timeout: 60000,
          });
          await page.locator("body").waitFor();
          if (target.kind === "demo") {
            await page
              .waitForLoadState("networkidle", { timeout: 10000 })
              .catch(() => {});
          }
          const title = await page.title();
          const text = await page.locator("body").innerText();
          const signals =
            target.kind === "demo"
              ? demoSignals[target.project]
              : target.kind === "repository"
                ? [new URL(target.url).pathname.slice(1), "Public"]
                : [
                    new URL(target.url).pathname.split("/")[2],
                    new URL(target.url).pathname.split("/blob/HEAD/")[1],
                  ];
          const record = {
            ...target,
            status: response?.status(),
            finalUrl: page.url(),
            title,
            identitySignals: signals.map((signal) => ({
              signal,
              found: `${title}\n${text}`.includes(signal),
            })),
            headings: (await page.locator("h1,h2").allTextContents())
              .slice(0, 10)
              .map((heading) => heading.slice(0, 200)),
            excerpt: text.slice(0, 800),
          };
          await page.screenshot({
            path: `playwright-report/external-links/${i + targets.slice(i, i + 3).indexOf(target)}.png`,
          });
          return record;
        } finally {
          await page.close();
        }
      }),
    );
    batch.forEach((result, index) =>
      results.push(
        result.status === "fulfilled"
          ? result.value
          : {
              ...targets[i + index],
              error: String(result.reason),
            },
      ),
    );
  }
} finally {
  await browser.close();
}
await mkdir("docs/verification", { recursive: true });
await writeFile(
  "docs/verification/external-links.json",
  JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2) +
    "\n",
);
for (const {
  project,
  kind,
  status,
  finalUrl,
  identitySignals,
  error,
} of results)
  console.log(
    JSON.stringify({ project, kind, status, finalUrl, identitySignals, error }),
  );
if (
  results.some(
    (result) =>
      result.error ||
      result.status !== 200 ||
      result.finalUrl !== result.url ||
      result.identitySignals.some((signal) => !signal.found),
  )
)
  process.exitCode = 1;

import { test, expect } from "@playwright/test";

test("The linked resume identifies the candidate and remains useful when printed", async ({
  page,
}) => {
  const response = await page.goto("/resume-en.html");
  expect(response.status()).toBe(200);
  await expect(page).toHaveTitle(/Bojan Golic/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Bojan Golic",
  );
  await expect(
    page.locator('a[href="mailto:hello@bojangolic.com"]').first(),
  ).toBeVisible();
  await expect(page.locator('a[href="https://bojangolic.com/"]')).toBeVisible();
  await expect(page.locator("body")).not.toContainText("4+ years");
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.locator('a[href="mailto:hello@bojangolic.com"]').first(),
  ).toBeVisible();
  await page.emulateMedia({ media: "screen" });
  await page.setViewportSize({ width: 320, height: 900 });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
});

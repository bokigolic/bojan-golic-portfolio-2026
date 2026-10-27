import { test, expect } from "@playwright/test";

test("Fragment navigation transfers focus into its destination and survives history", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".hero-actions a").click();
  await expect(page.locator("#work h2")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.locator(".featured-grid .feature-media-link").first(),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  await page.locator('.case-outline a[href="#architecture"]').click();
  await expect(page.locator("#architecture h2")).toBeFocused();
  await page.locator(".case-top a").click();
  await expect(page.locator("#work h2")).toBeFocused();
  await page.goBack();
  await expect(page.locator("#architecture h2")).toBeFocused();
  await page.goForward();
  await expect(page.locator("#work h2")).toBeFocused();
});

test("Case studies have a single current navigation marker after leaving About", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect(
    page.locator('.desktop-nav [aria-current="location"]'),
  ).toHaveText("About");
  await page
    .locator('.featured-grid a.feature-media-link[href="/projects/lwr-local"]')
    .click();
  await expect(
    page.locator('.desktop-nav [aria-current="location"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('.desktop-nav [aria-current="location"]'),
  ).toHaveText("Work");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Menu", exact: false }).click();
  await expect(
    page.locator('.mobile-dialog [aria-current="location"]'),
  ).toHaveCount(1);
});

test("Unknown URLs have server-side 404 status and noindex HTML, with or without JavaScript", async ({
  page,
  request,
  browser,
}) => {
  for (const path of [
    "/not-a-portfolio-route",
    "/projects/not-a-project",
    "/not-a-page.html",
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(404);
    const body = await response.text();
    expect(body).toContain('content="noindex,follow"');
    expect(body).toContain("Page not found");
    expect(body).not.toContain('id="hero-title"');
    const navigation = await page.goto(path);
    expect(navigation.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("usual path");
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const document = await context.newPage();
    const response = await document.goto(
      "http://127.0.0.1:4173/projects/missing",
    );
    expect(response.status()).toBe(404);
    await expect(document.locator("h1")).toContainText("usual path");
  } finally {
    await context.close();
  }
  expect((await request.get("/projects/lwr-local")).status()).toBe(200);
  expect((await request.get("/projects/lwr-local/")).status()).toBe(200);
  expect((await request.get("/assets/missing.js")).status()).toBe(404);
});

test("The fitness case study does not present the unavailable anatomy route as implemented", async ({
  page,
}) => {
  await page.goto("/projects/bokigym");
  await expect(page.locator(".case-summary")).not.toContainText(
    "anatomy learning",
  );
  await expect(page.locator("#features")).not.toContainText("anatomy learning");
  await expect(page.locator("#next")).toContainText(
    "anatomy-guide route needs completion",
  );
});

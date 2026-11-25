import { test, expect } from "@playwright/test";

test("Professional homepage leads with authentic featured work and reaches the full collection", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero h1")).toContainText("Web production");
  await expect(page.locator(".hero img")).toHaveCount(0);
  await expect(page.locator("#work .featured-grid > article")).toHaveCount(3);
  await expect(page.locator("#work .feature-media-link img")).toHaveCount(3);
  await expect(page.locator(".hero + .featured-work")).toHaveCount(1);
  for (const id of ["expertise", "experience", "process", "about", "contact"])
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  await page
    .getByRole("link", { name: "Explore My Work", exact: false })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator("h1")).toHaveText("Selected work");
  await expect(page.locator("main")).not.toContainText("NACD");
  for (const [slug, device] of [
    ["lwr-local", "desktop"],
    ["bokigym", "desktop"],
    ["english-learning", "desktop"],
  ]) {
    const link = page.locator(`.feature-media-link[href="/projects/${slug}"]`);
    await expect(link.locator("img")).toHaveAttribute(
      "src",
      `/projects/${slug}-${device}.webp`,
    );
    await expect(link).toHaveAttribute("href", `/projects/${slug}`);
  }
});

test("Skill evidence and the résumé remain reachable by keyboard", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator("#expertise")
    .getByRole("link", { name: "BokiGym", exact: false })
    .click();
  await expect(page).toHaveURL(/\/projects\/bokigym#architecture$/);
  await expect(page.locator("#architecture h2")).toBeFocused();
  await page.goBack();
  await page
    .locator("#expertise")
    .getByRole("link", { name: "Professional experience", exact: false })
    .click();
  await expect(page.locator("#experience h3")).toBeFocused();
  await expect(page.locator("#experience")).toContainText("Optimizely");
  await page
    .locator("#about")
    .getByRole("link", { name: "View résumé" })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/resume-en\.html$/);
});

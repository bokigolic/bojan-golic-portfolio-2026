import { test, expect } from "@playwright/test";

test("Professional homepage has no product screenshots and leads to Selected Work", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero h1")).toContainText("Building digital");
  await expect(
    page.locator("#workbench, .featured-grid, main img"),
  ).toHaveCount(0);
  for (const id of ["expertise", "experience", "process", "about", "contact"])
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  await page
    .getByRole("link", { name: "Explore My Work", exact: false })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator("h1")).toHaveText("Selected Work");
  await expect(page.locator("#workbench")).toHaveCount(0);
  for (const [slug, device] of [
    ["lwr-local", "desktop"],
    ["bokigym", "desktop"],
    ["english-learning", "mobile"],
  ]) {
    const link = page.locator(`.feature-media-link[href="/projects/${slug}"]`);
    await expect(link.locator("img")).toHaveAttribute(
      "src",
      `/projects/${slug}-${device}.webp`,
    );
    await expect(link).toHaveAttribute("href", `/projects/${slug}`);
  }
});

test("Skill evidence reaches the relevant implementation and enterprise responsibilities remain keyboard operable", async ({
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
    .getByRole("link", { name: "NACD experience", exact: false })
    .click();
  await expect(page.locator("#experience h2")).toBeFocused();
  const responsibility = page.locator(".service-disclosures details").first();
  const summary = responsibility.locator("summary");
  await expect(responsibility).toHaveAttribute("open", "");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(responsibility).not.toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(responsibility.locator("p")).toBeVisible();
});

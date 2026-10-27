import { test, expect } from "@playwright/test";

test("Project inspection switches authentic captures for every project and viewport", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  for (const [index, slug] of [
    "lwr-local",
    "bokigym",
    "english-learning",
  ].entries()) {
    await tabs.nth(index).click();
    for (const device of ["mobile", "desktop"]) {
      await page
        .getByRole("button", {
          name: device === "mobile" ? "Mobile" : "Desktop",
          exact: true,
        })
        .click();
      const panel = page.getByRole("tabpanel");
      await expect(panel).toHaveAttribute("aria-labelledby", `tab-${slug}`);
      await expect(panel.locator("img")).toHaveAttribute(
        "src",
        `/projects/${slug}-${device}.webp`,
      );
      await expect(panel.locator("img")).toHaveJSProperty("complete", true);
      expect(
        await panel.locator("img").evaluate((image) => image.naturalWidth),
      ).toBeGreaterThan(0);
      await expect(panel).toContainText("Static screenshot");
      await expect(
        panel.getByRole("link", { name: /View case study/ }),
      ).toHaveAttribute("href", `/projects/${slug}`);
    }
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

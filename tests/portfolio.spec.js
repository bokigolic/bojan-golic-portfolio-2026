import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const primary = ["lwr-local", "bokigym", "english-learning"];
test("Work collection preserves seven projects and filters categories with the keyboard", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/work");
  await expect(page.locator(".featured-grid > article")).toHaveCount(3);
  await expect(page.locator(".featured-grid > article").first()).toContainText(
    "LWR Local",
  );
  await expect(page.locator(".additional-grid article")).toHaveCount(4);
  await page.locator(".more-work > summary").click();
  await expect(page.locator(".additional-grid")).toBeHidden();
  await page.locator(".more-work > summary").click();
  await expect(
    page.locator(
      '.additional-grid a[href="https://boki-book-easy.netlify.app/"]',
    ),
  ).toBeVisible();
  const groups = [
    ["Discovery", 1, 0, ["LWR Local"]],
    ["Fitness", 1, 1, ["BokiGym", "FitPro"]],
    ["Learning", 1, 0, ["Be Fluent"]],
    ["Business tools", 0, 2, ["BookEasy", "InvoicePro"]],
    ["Websites", 0, 1, ["IV Clean"]],
    ["All work", 3, 4, ["LWR Local", "BokiGym", "Be Fluent", "FitPro"]],
  ];
  for (const [label, featured, additional, names] of groups) {
    const button = page.getByRole("button", { name: label, exact: true });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toBeFocused();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.locator('.category-filters [aria-pressed="true"]'),
    ).toHaveCount(1);
    await expect(page.locator(".featured-grid > article")).toHaveCount(
      featured,
    );
    await expect(page.locator(".additional-grid article")).toHaveCount(
      additional,
    );
    await expect(page.locator(".filter-status")).toContainText(
      `Showing ${featured + additional} of 7 projects`,
    );
    for (const name of names)
      await expect(page.locator("#project-collection")).toContainText(name);
    if (label === "Fitness")
      await expect(page.locator(".is-flagship")).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`Responsive pages at ${width}px: no overflow, missing images, or console errors`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const path of [
      "/",
      "/work",
      ...primary.map((slug) => `/projects/${slug}`),
    ]) {
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      await expect(page.locator("main h1")).toHaveCount(1);
      const overflow = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(overflow.scroll, path).toBeLessThanOrEqual(overflow.client + 1);
      for (const img of await page.locator("main img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect(img).toBeVisible();
        await expect
          .poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0))
          .toBe(true);
      }
      expect(
        await page
          .locator('a[href^="/#"]')
          .evaluateAll((links) =>
            links
              .filter(
                (link) =>
                  location.pathname === "/" &&
                  !document.getElementById(new URL(link.href).hash.slice(1)),
              )
              .map((link) => link.getAttribute("href")),
          ),
      ).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("Accessible mobile menu traps focus, closes with Escape, and restores its trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu", exact: false });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About", exact: false })
    .click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator("dialog")).toHaveCount(0);
});

test("Contact validates, traps focus, reports errors, and handles a mocked successful delivery", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: /^Get in touch$/i,
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /What are you/ });
  await expect(dialog).toBeVisible();
  await expect(page.locator("#contact-name")).toBeFocused();
  await page
    .getByRole("button", { name: "Send message", exact: false })
    .click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#contact-name")).toBeFocused();
  await page.locator("#contact-name").fill("Portfolio QA");
  await page.locator("#contact-email").fill("qa@example.test");
  await page
    .locator("#contact-message")
    .fill("A local automated test. No real message is sent.");
  await page
    .getByRole("button", { name: "Send message", exact: false })
    .click();
  await expect(page.getByRole("alert")).toContainText("hosted site");
  for (let i = 0; i < 11; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.evaluate(() => {
    window.FORM_ENDPOINT = "https://forms.example.test/contact";
  });
  await page.route("https://forms.example.test/contact", (route) =>
    route.fulfill({ status: 500 }),
  );
  await page
    .getByRole("button", { name: "Send message", exact: false })
    .click();
  await expect(page.getByRole("alert")).toContainText("could not be sent");
  await page.unroute("https://forms.example.test/contact");
  await page.route("https://forms.example.test/contact", (route) =>
    route.fulfill({ status: 200, body: "ok" }),
  );
  await page
    .getByRole("button", { name: "Send message", exact: false })
    .click();
  await expect(dialog.getByRole("status")).toContainText("Message sent");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

for (const width of [390, 1440]) {
  test(`WCAG 2.2 AA automated audit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      "/",
      "/work",
      ...primary.map((slug) => `/projects/${slug}`),
    ]) {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        results.violations,
        `${path}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
    await page.goto("/");
    await page
      .getByRole("button", { name: /^Get in touch$/i, exact: true })
      .click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
}

test("Direct URLs include page-specific SEO in server HTML and survive refresh and history", async ({
  page,
  request,
}) => {
  for (const slug of primary) {
    const response = await request.get(`/projects/${slug}/`);
    const html = await response.text();
    expect(html).toContain(`https://bojangolic.com/projects/${slug}`);
    expect(html).toContain("Case Study");
    expect(html).toContain("Technical architecture");
    await page.goto(`/projects/${slug}`);
    await page.reload();
    await expect(page).toHaveTitle(/Case Study/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://bojangolic.com/projects/${slug}`,
    );
    await page.locator(".case-top a").click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(page.locator("#project-collection")).toBeVisible();
    await page.goBack();
    await expect(page.locator(".case-header h1")).toBeVisible();
  }
  await page.goto("/missing-project");
  await expect(page.locator("h1")).toContainText("usual path");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex,follow",
  );
});

test("Quick navigation and reduced-motion mode remain usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "Quick navigation" });
  await expect(dialog).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search navigation" })
    .fill("expertise");
  await page.keyboard.press("ArrowDown");
  await expect(
    dialog.getByRole("button", { name: "Technical expertise", exact: false }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#expertise$/);
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

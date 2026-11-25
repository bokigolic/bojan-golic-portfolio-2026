import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/data/projects.js";
import { alternatePaths } from "../src/i18n/routes.js";

const origin = "https://bojangolic.com";
const appRoutes = [
  "/",
  "/work",
  ...projects.map(({ slug }) => `/projects/${slug}`),
];
const routes = [...appRoutes, "/resume-en.html"];

test("Every language pair has reciprocal HTML metadata and sitemap entries", async ({
  browser,
  baseURL,
  request,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  expect([...xml.matchAll(/<loc>/g)]).toHaveLength(routes.length * 2);
  expect(xml).not.toContain("/404");
  for (const route of routes) {
    const alternates = alternatePaths(route);
    const titles = [];
    const descriptions = [];
    for (const tag of ["en-US", "sr-Latn-RS"]) {
      const path = alternates[tag];
      expect((await page.goto(path)).status(), path).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", tag);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        origin + path,
      );
      titles.push(await page.title());
      descriptions.push(
        await page.locator('meta[name="description"]').getAttribute("content"),
      );
      const sitemapEntry = xml
        .split("<url>")
        .find((entry) => entry.includes(`<loc>${origin + path}</loc>`));
      expect(sitemapEntry, path).toBeTruthy();
      for (const [lang, href] of Object.entries(alternates)) {
        await expect(page.locator(`link[hreflang="${lang}"]`)).toHaveAttribute(
          "href",
          origin + href,
        );
        expect(sitemapEntry).toContain(
          `hreflang="${lang}" href="${origin + href}"`,
        );
      }
      if (appRoutes.includes(route)) {
        await expect(
          page.locator('meta[property="og:locale"]'),
        ).toHaveAttribute("content", tag === "en-US" ? "en_US" : "sr_RS");
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
          "content",
          tag === "en-US"
            ? origin + "/og-image.png"
            : origin + "/og-image-sr.png",
        );
        expect(
          JSON.parse(await page.locator("#page-schema").textContent())
            .inLanguage,
        ).toBe(tag);
      }
    }
    expect(titles[0]).not.toEqual(titles[1]);
    expect(descriptions[0]).not.toEqual(descriptions[1]);
  }

  expect((await page.goto("/sr/projects/nepostojeci")).status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Stranica nije pronađena.");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex,follow",
  );
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "English" })).toHaveAttribute(
    "href",
    "/",
  );
  await context.close();
});

test("Keyboard language switching keeps route, query, fragment and browser history", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/projects/lwr-local?ref=portfolio#architecture");
  await expect(page.locator("#architecture h2")).toBeFocused();
  const serbian = page.getByRole("link", { name: "Srpski (latinica)" });
  await expect(serbian).toHaveAttribute(
    "href",
    "/sr/projects/lwr-local?ref=portfolio#architecture",
  );
  await serbian.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(
    /\/sr\/projects\/lwr-local\?ref=portfolio#architecture$/,
  );
  await expect(page.locator("#architecture h2")).toBeFocused();
  await expect(page.locator("html")).toHaveAttribute("lang", "sr-Latn-RS");
  await page.reload();
  await expect(page.locator("#architecture h2")).toHaveText("Kako radi");
  await page.getByRole("link", { name: "Nazad na projekte" }).click();
  await expect(page).toHaveURL(/\/sr\/work$/);
  await expect(page.locator('link[hreflang="en-US"]')).toHaveAttribute(
    "href",
    origin + "/work",
  );
  await page.goBack();
  await expect(page.locator("#architecture h2")).toBeFocused();
  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
  await page.goForward();
  await expect(page.locator("html")).toHaveAttribute("lang", "sr-Latn-RS");
  expect(errors).toEqual([]);
});

test("Serbian mobile menu, filters, project navigation and contact form stay localized", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 820 });
  await page.goto("/sr/");
  await expect(
    page.getByRole("link", { name: "Srpski (latinica)" }),
  ).toHaveAttribute("aria-current", "page");
  const menu = page.getByRole("button", { name: "Meni" });
  await menu.focus();
  await page.keyboard.press("Enter");
  const navigation = page.getByRole("dialog", {
    name: "Navigacija",
    exact: true,
  });
  await expect(
    navigation.getByRole("button", { name: "Zatvorite meni" }),
  ).toBeFocused();
  await navigation.getByRole("link", { name: "Projekti", exact: true }).click();
  await expect(page).toHaveURL(/\/sr\/work$/);
  const fitness = page.getByRole("button", { name: "Fitnes", exact: true });
  await fitness.focus();
  await page.keyboard.press("Space");
  await expect(fitness).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status").first()).toHaveText(
    "Prikazano 2 od 7 projekata",
  );
  await page
    .getByRole("link", {
      name: "Kako sam napravio BokiGym / Gym Master",
    })
    .click();
  await expect(page).toHaveURL(/\/sr\/projects\/bokigym$/);
  await expect(
    page.getByRole("link", { name: "Otvorite sajt", exact: true }),
  ).toHaveAttribute("href", "https://bokigym.netlify.app/");
  await expect(
    page.getByRole("link", { name: "Sljedeći projekat Be Fluent" }),
  ).toHaveAttribute("href", "/sr/projects/english-learning");
  await expect(
    page.locator('a[href="mailto:hello@bojangolic.com"]'),
  ).toBeVisible();
  const opener = page.getByRole("button", { name: "Pošaljite mi poruku" });
  await opener.click();
  const form = page.getByRole("dialog", { name: "Pošaljite poruku" });
  await expect(form.getByLabel(/^Ime/)).toBeFocused();
  await form.getByRole("button", { name: "Pošaljite poruku" }).click();
  await expect(form.getByText("Unesite ime.")).toBeVisible();
  await expect(form.getByText("Provjerite adresu e-pošte.")).toBeVisible();
  await expect(form.getByText("Napišite poruku.")).toBeVisible();
  await form.getByLabel(/^Ime/).fill("Test portfolija");
  await form.getByLabel(/^E-pošta/).fill("test@example.test");
  await form.getByLabel("Poruka (obavezno)").fill("Lokalni test.");
  await form
    .getByLabel("Tema poruke")
    .selectOption({ label: "Veb aplikacija" });
  await page.evaluate(() => {
    window.FORM_ENDPOINT = "https://forms.example.test/contact";
  });
  await page.route("https://forms.example.test/contact", async (route) => {
    const form = new URLSearchParams(route.request().postData());
    expect(form.get("form-name")).toBe("contact");
    expect(form.get("service")).toBe("Web application");
    await route.fulfill({ status: 200, body: "ok" });
  });
  await form.getByRole("button", { name: "Pošaljite poruku" }).click();
  await expect(form.getByRole("status")).toContainText(
    "Poruka je poslata putem obrasca.",
  );
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});

test("English leaves the Serbian dictionary and font subset unloaded", async ({
  page,
}) => {
  const assets = [];
  page.on("request", (request) => assets.push(new URL(request.url()).pathname));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(
    assets.filter((url) => /\/assets\/sr-|manrope-latin-ext/.test(url)),
  ).toEqual([]);
  await page.getByRole("link", { name: "Srpski (latinica)" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Veb produkcija i razvoj aplikacija.",
  );
  await page.evaluate(() => document.fonts.ready);
  expect(assets.some((url) => url.includes("/assets/sr-"))).toBe(true);
  expect(assets).toContain("/fonts/manrope-latin-ext.woff2");
});

for (const width of [320, 768, 1440]) {
  test(`Serbian route layout and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of routes) {
      const path = alternatePaths(route)["sr-Latn-RS"];
      await page.goto(path);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((image) => {
            image.loading = "eager";
            return image.decode();
          }),
        );
      });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        path,
      ).toBeLessThanOrEqual(width + 1);
      if (
        ["/", "/work", "/projects/lwr-local", "/resume-en.html"].includes(route)
      ) {
        const { violations } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(
          violations.map(({ id, nodes }) => [
            id,
            nodes.map(({ target }) => target),
          ]),
          path,
        ).toEqual([]);
      }
    }
    expect(errors).toEqual([]);
  });
}

test("Serbian analytics consent respects decisions and can be reopened in English", async ({
  page,
}) => {
  test.skip(
    !process.env.VITE_GA_MEASUREMENT_ID,
    "Analytics is optional on local builds",
  );
  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({ status: 200, body: "" }),
  );
  await page.goto("/sr/");
  const consent = page.getByRole("dialog", { name: "Saglasnost za kolačiće" });
  await expect(consent).toBeVisible();
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
  const decline = consent.getByRole("button", { name: "Odbijte" });
  await decline.click();
  await expect(consent).toBeHidden();
  await page.reload();
  await expect(consent).toBeHidden();
  const preferences = page.getByRole("button", {
    name: "Podešavanja kolačića",
  });
  await preferences.click();
  await expect(decline).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(consent).toBeHidden();
  await expect(preferences).toBeFocused();
  expect(
    await page.evaluate(() => localStorage.getItem("cookie_consent")),
  ).toBe("denied");
  await preferences.click();
  await consent.getByRole("button", { name: "Dozvolite analitiku" }).click();
  await expect(preferences).toBeFocused();
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(1);
  await page.getByRole("link", { name: "English" }).click();
  await expect(
    page.getByRole("dialog", { name: "Cookie consent" }),
  ).toBeHidden();
  await page.getByRole("button", { name: "Cookie preferences" }).click();
  await expect(
    page.getByRole("dialog", { name: "Cookie consent" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Decline" }).click();
  expect(
    await page.evaluate(() => localStorage.getItem("cookie_consent")),
  ).toBe("denied");
});

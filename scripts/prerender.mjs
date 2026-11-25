import { readFile, writeFile, mkdir } from "node:fs/promises";
import { PassThrough } from "node:stream";
import { createElement } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { createServer } from "vite";
import { projects } from "../src/data/projects.js";
import { pageMeta, site } from "../src/data/site.js";
import { createLocale, english, localizeProject } from "../src/i18n/locale.js";
import { alternatePaths, languages } from "../src/i18n/routes.js";
import serbian from "../src/i18n/sr.js";

const template = await readFile("dist/index.html", "utf8");
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
const escape = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const routes = [
  { route: "/", project: null },
  { route: "/work", project: null },
  ...projects.map((project) => ({
    route: `/projects/${project.slug}`,
    project,
  })),
  { route: "/404", project: null },
];

function render(App, path, locale) {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks = [];
    output.on("data", (data) => chunks.push(data));
    output.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    output.on("error", reject);
    const stream = renderToPipeableStream(
      createElement(App, { initialPath: path, locale }),
      {
        onAllReady() {
          stream.pipe(output);
        },
        onError: reject,
      },
    );
  });
}

function applyMetadata(html, meta) {
  html = html
    .replace(/<html lang="[^"]+">/, `<html lang="${meta.tag}">`)
    .replace(
      /<title>.*?<\/title>/s,
      () => `<title>${escape(meta.title)}</title>`,
    );
  for (const [key, value] of Object.entries(meta.tags)) {
    const re = new RegExp(
      `(<meta (?:name|property)="${key}" content=")[^"]*(")`,
    );
    html = html.replace(
      re,
      (_, prefix, suffix) => prefix + escape(value) + suffix,
    );
  }
  return html
    .replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      (_, prefix, suffix) => prefix + meta.url + suffix,
    )
    .replace(
      "<!-- page-alternates -->",
      Object.entries(meta.alternates)
        .map(
          ([lang, url]) =>
            `<link rel="alternate" hreflang="${lang}" href="${escape(url)}" />`,
        )
        .join("\n  "),
    )
    .replace(
      /(<script id="page-schema" type="application\/ld\+json">).*?(<\/script>)/s,
      (_, prefix, suffix) =>
        prefix +
        (meta.schema
          ? JSON.stringify(meta.schema).replaceAll("<", "\\u003c")
          : "") +
        suffix,
    );
}

function sitemap() {
  const indexable = [
    ...routes.filter(({ route }) => route !== "/404").map(({ route }) => route),
    "/resume-en.html",
  ];
  const entries = indexable.flatMap((route) => {
    const alternates = alternatePaths(route);
    const links = Object.entries(alternates)
      .map(
        ([lang, href]) =>
          `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escape(site.url + href)}" />`,
      )
      .join("\n");
    return Object.values(languages).map(
      ({ tag }) =>
        `  <url>\n    <loc>${escape(site.url + alternates[tag])}</loc>\n${links}\n  </url>`,
    );
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
}

try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  for (const locale of [english, createLocale("sr", serbian)]) {
    for (const { route, project } of routes) {
      const path = locale.path(route);
      const markup = await render(App, path, locale);
      const meta = pageMeta(
        project && localizeProject(project, locale),
        route,
        locale,
      );
      const html = applyMetadata(
        template.replace(
          '<div id="root"></div>',
          () => `<div id="root" data-path="${path}">${markup}</div>`,
        ),
        meta,
      );
      const filePath = path.replace(/\/$/, "");
      const dir = `dist${filePath}`;
      await mkdir(dir, { recursive: true });
      await writeFile(`${dir}/index.html`, html);
      if (filePath) await writeFile(`dist${filePath}.html`, html);
    }
  }
  await writeFile("dist/sitemap.xml", sitemap());
  console.log(
    `Pre-rendered ${routes.length * 2} localized routes and their sitemap.`,
  );
} finally {
  await server.close();
}

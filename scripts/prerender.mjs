import { readFile, writeFile, mkdir } from "node:fs/promises";
import { PassThrough } from "node:stream";
import { createElement } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { createServer } from "vite";
import { projects } from "../src/data/projects.js";
import { pageMeta } from "../src/data/site.js";

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
try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const routes = [
    { path: "/", project: null },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      project,
    })),
    { path: "/404", project: null },
  ];
  for (const { path, project } of routes) {
    const markup = await new Promise((resolve, reject) => {
      const output = new PassThrough();
      const chunks = [];
      output.on("data", (data) => chunks.push(data));
      output.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      output.on("error", reject);
      const stream = renderToPipeableStream(
        createElement(App, { initialPath: path }),
        {
          onAllReady() {
            stream.pipe(output);
          },
          onError: reject,
        },
      );
    });
    const meta = pageMeta(project, path);
    let html = template.replace(
      '<div id="root"></div>',
      `<div id="root" data-path="${path}">${markup}</div>`,
    );
    html = html.replace(
      /<title>.*?<\/title>/s,
      `<title>${escape(meta.title)}</title>`,
    );
    for (const [key, value] of [
      ["description", meta.description],
      ["og:title", meta.title],
      ["og:description", meta.description],
      ["og:url", meta.url],
      ["twitter:title", meta.title],
      ["twitter:description", meta.description],
    ]) {
      const re = new RegExp(
        `(<meta (?:name|property)="${key}" content=")[^"]*(")`,
      );
      html = html.replace(re, (_, a, b) => a + escape(value) + b);
    }
    html = html.replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      (_, a, b) => a + meta.url + b,
    );
    html = html.replace(
      /(<script id="page-schema" type="application\/ld\+json">).*?(<\/script>)/s,
      (_, a, b) =>
        a + JSON.stringify(meta.schema).replaceAll("<", "\\u003c") + b,
    );
    if (path === "/404")
      html = html.replace('content="index,follow"', 'content="noindex,follow"');
    const dir = path === "/" ? "dist" : `dist${path}`;
    await mkdir(dir, { recursive: true });
    await writeFile(`${dir}/index.html`, html);
    // Extensionless URLs are resolved to .html by static preview servers;
    // directory index files also support hosts that prefer trailing slashes.
    if (path !== "/") await writeFile(`dist${path}.html`, html);
    if (path === "/404") await writeFile("dist/404.html", html);
  }
  console.log(
    `Pre-rendered ${routes.length} routes with page-specific content and metadata.`,
  );
} finally {
  await server.close();
}

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFile, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";

export default defineConfig(({ isPreview }) => ({
  // Every public route has static HTML; unknown URLs must not become a SPA 200.
  appType: isPreview ? "mpa" : "spa",
  plugins: [
    react(),
    {
      name: "static-preview-404",
      configurePreviewServer(server) {
        const output = resolve(server.config.root, server.config.build.outDir);
        return () =>
          server.middlewares.use(async (req, res, next) => {
            if (!["GET", "HEAD"].includes(req.method)) return next();
            const pathname = new URL(req.url, "http://localhost").pathname;
            // Existing .html routes have been resolved by Vite. Let its index
            // middleware serve those; missing paths receive our generated document.
            if (pathname.endsWith(".html")) {
              const candidate = resolve(output, `.${pathname}`);
              const localPath = relative(output, candidate);
              if (localPath.startsWith("..") || isAbsolute(localPath))
                return next();
              try {
                if ((await stat(candidate)).isFile()) return next();
              } catch {
                /* missing document */
              }
            }
            const htmlRequest =
              req.headers.accept?.includes("text/html") ||
              /\.html$/i.test(pathname) ||
              !/\.[^/]+$/.test(pathname);
            if (!htmlRequest) {
              res.statusCode = 404;
              res.end();
              return;
            }
            try {
              const html = await readFile(resolve(output, "404.html"));
              res.statusCode = 404;
              res.setHeader("Content-Type", "text/html; charset=utf-8");
              res.setHeader("Cache-Control", "no-store");
              res.end(req.method === "HEAD" ? undefined : html);
            } catch (error) {
              next(error);
            }
          });
      },
    },
  ],
}));

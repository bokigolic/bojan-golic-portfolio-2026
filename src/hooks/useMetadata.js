import { useEffect } from "react";
import { pageMeta } from "../data/site";
export default function useMetadata(project, pathname) {
  useEffect(() => {
    const meta = pageMeta(project, pathname);
    document.title = meta.title;
    const set = (selector, content) =>
      document.querySelector(selector)?.setAttribute("content", content);
    set('meta[name="description"]', meta.description);
    for (const kind of ["og", "twitter"]) {
      const key = kind === "og" ? "property" : "name";
      set(`meta[${key}="${kind}:title"]`, meta.title);
      set(`meta[${key}="${kind}:description"]`, meta.description);
    }
    set('meta[property="og:url"]', meta.url);
    set(
      'meta[name="robots"]',
      !project && pathname !== "/" && !/^\/work\/?$/.test(pathname)
        ? "noindex,follow"
        : "index,follow",
    );
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", meta.url);
    const schema = document.getElementById("page-schema");
    if (schema) schema.textContent = JSON.stringify(meta.schema);
  }, [project, pathname]);
}

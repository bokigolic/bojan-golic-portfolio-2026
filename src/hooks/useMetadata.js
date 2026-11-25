import { useEffect } from "react";
import { pageMeta } from "../data/site";

export default function useMetadata(project, route, locale) {
  useEffect(() => {
    const meta = pageMeta(project, route, locale);
    document.documentElement.lang = meta.tag;
    document.title = meta.title;
    for (const [key, value] of Object.entries(meta.tags)) {
      const attribute = key.startsWith("og:") ? "property" : "name";
      document
        .querySelector(`meta[${attribute}="${key}"]`)
        ?.setAttribute("content", value);
    }
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", meta.url);
    const schema = document.getElementById("page-schema");
    if (schema)
      schema.textContent = meta.schema ? JSON.stringify(meta.schema) : "";
    for (const link of document.querySelectorAll(
      'link[rel="alternate"][hreflang]',
    ))
      link.remove();
    for (const [lang, href] of Object.entries(meta.alternates)) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang;
      link.href = href;
      document.head.append(link);
    }
  }, [project, route, locale]);
}

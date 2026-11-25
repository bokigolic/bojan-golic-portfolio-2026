import { projects } from "./projects.js";
import { english } from "../i18n/locale.js";
import { alternatePaths, languages } from "../i18n/routes.js";

export const site = {
  url: "https://bojangolic.com",
  jobTitle: "Web Producer & Digital Experience Specialist",
  description:
    "Bojan Golic works in enterprise web production at NACD, builds pages in Optimizely, and develops independent React applications.",
};

export function pageMeta(project, path = "/", locale = english) {
  const { t, tag } = locale;
  const home = !project && path === "/";
  const work = !project && path === "/work";
  const indexable = Boolean(project || home || work);
  const title = project
    ? `${project.name} — ${t(project.featured ? "Case Study" : "Project Details")} | Bojan Golic`
    : home
      ? `Bojan Golic | ${t(site.jobTitle)}`
      : `${t(work ? "Selected work" : "Page not found")} | Bojan Golic`;
  const description =
    project?.summary ??
    t(
      work
        ? "See what Bojan Golic built with LWR Local, BokiGym, and Be Fluent, from finding local services to planning workouts and learning English."
        : home
          ? site.description
          : "Can’t find a page on Bojan Golic’s site? Start on the homepage or browse his projects.",
    );
  const route = project
    ? `/projects/${project.slug}`
    : indexable
      ? path
      : "/404";
  const url = site.url + locale.path(route);
  const alternates = indexable
    ? Object.fromEntries(
        Object.entries(alternatePaths(route)).map(([lang, href]) => [
          lang,
          site.url + href,
        ]),
      )
    : {};
  const schema = project
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.name,
        description,
        inLanguage: tag,
        url,
        author: { "@type": "Person", name: "Bojan Golic" },
        about: project.category,
      }
    : work
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t("Selected work"),
          description,
          inLanguage: tag,
          url,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              url: site.url + locale.path(`/projects/${item.slug}`),
            })),
          },
        }
      : home
        ? {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            inLanguage: tag,
            url,
            description,
            mainEntity: {
              "@type": "Person",
              name: "Bojan Golic",
              jobTitle: t(site.jobTitle),
              url: site.url + locale.path("/"),
              sameAs: [
                "https://github.com/bokigolic",
                "https://www.linkedin.com/in/bojan-golic",
              ],
            },
          }
        : null;
  const image = `${site.url}/${locale.language === "sr" ? "og-image-sr.png" : "og-image.png"}`;
  const tags = {
    description,
    robots: indexable ? "index,follow" : "noindex,follow",
    "og:title": title,
    "og:description": description,
    "og:url": url,
    "og:locale": locale.og,
    "og:locale:alternate": languages[locale.language === "en" ? "sr" : "en"].og,
    "og:image": image,
    "og:image:alt": t("Bojan Golic portfolio"),
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:image:alt": t("Bojan Golic portfolio"),
  };
  return { title, description, url, schema, tag, alternates, tags };
}

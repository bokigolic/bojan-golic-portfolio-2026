import { projects } from "./projects.js";

export const site = {
  url: "https://bojangolic.com",
  title: "Bojan Golic | Web Producer & Digital Experience Specialist",
  description:
    "Web production, enterprise CMS expertise, frontend development, SEO, accessibility, and independent digital projects by Bojan Golic.",
};
export function pageMeta(project, path = "/") {
  const work = !project && /^\/work\/?$/.test(path);
  const title = project
    ? `${project.name} — Case Study | Bojan Golic`
    : work
      ? "Selected Work | Bojan Golic"
      : path === "/"
        ? site.title
        : "Page not found | Bojan Golic";
  const description = work
    ? "Selected websites and web applications by Bojan Golic. Explore LWR Local, BokiGym, Be Fluent, and further projects through real interfaces and implementation case studies."
    : project?.summary || site.description;
  const url = `${site.url}${project ? `/projects/${project.slug}` : work ? "/work" : path === "/" ? "/" : "/404"}`;
  const schema = project
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.name,
        description,
        url,
        author: { "@type": "Person", name: "Bojan Golic" },
        about: project.category,
      }
    : work
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Selected Work",
          description,
          url,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              url: `${site.url}/projects/${item.slug}`,
            })),
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Bojan Golic",
          jobTitle: "Web Producer & Digital Experience Specialist",
          description,
          url: site.url,
          sameAs: [
            "https://github.com/bokigolic",
            "https://www.linkedin.com/in/bojan-golic",
          ],
        };
  return { title, description, url, schema, image: `${site.url}/og-image.png` };
}

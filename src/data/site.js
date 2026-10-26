export const site = {
  url: "https://bojangolic.com",
  title: "Bojan Golic | Web Developer & Digital Experience Specialist",
  description:
    "Web development, React applications, and thoughtful digital experiences. Explore personal projects and enterprise CMS experience by Bojan Golic.",
};
export function pageMeta(project, path = "/") {
  const title = project
    ? `${project.name} — Case Study | Bojan Golic`
    : path === "/"
      ? site.title
      : "Page not found | Bojan Golic";
  const description = project?.summary || site.description;
  const url = `${site.url}${project ? `/projects/${project.slug}` : path === "/" ? "/" : "/404"}`;
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
    : {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Bojan Golic",
        jobTitle: "Web Developer & Digital Experience Specialist",
        description,
        url: site.url,
        sameAs: [
          "https://github.com/bokigolic",
          "https://www.linkedin.com/in/bojan-golic",
        ],
      };
  return { title, description, url, schema, image: `${site.url}/og-image.png` };
}

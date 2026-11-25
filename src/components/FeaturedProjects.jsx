import { useLocale } from "../i18n/context";
import ProjectMedia from "./ProjectMedia";
import SiteLink from "./SiteLink";

const imageSizes = "(max-width: 700px) 76vw, (max-width: 1620px) 68vw, 1100px";

export default function FeaturedProjects({
  projects,
  additional = [],
  home = false,
}) {
  const { t } = useLocale();
  return (
    <section
      id={home ? "work" : "project-collection"}
      className="featured-work section"
      aria-label={t(home ? "Selected work" : "Project collection")}
    >
      {home && (
        <div className="section-heading">
          <h2>{t("Selected work")}</h2>
          <SiteLink className="text-link" href="/work">
            {t("View all projects")}
          </SiteLink>
        </div>
      )}
      <div className="featured-grid">
        {projects.map((project) => (
          <article
            className={project.slug === "lwr-local" ? "is-flagship" : undefined}
            key={project.slug}
          >
            <SiteLink
              className={`feature-media-link stage-${project.tone}`}
              href={`/projects/${project.slug}`}
              aria-label={t("View {project} case study", {
                project: project.name,
              })}
            >
              <ProjectMedia
                project={project}
                priority={home && project.slug === "lwr-local"}
                sizes={
                  project.slug === "lwr-local"
                    ? imageSizes
                    : "(max-width: 700px) 76vw, 38vw"
                }
              />
            </SiteLink>
            <div className="project-caption">
              <div>
                <p className="eyebrow">{project.category}</p>
                <h3>
                  <SiteLink href={`/projects/${project.slug}`}>
                    {project.name}
                  </SiteLink>
                </h3>
              </div>
              <p>{project.summary}</p>
            </div>
          </article>
        ))}
      </div>
      {additional.length > 0 && (
        <div className="more-work">
          {projects.length > 0 && <h2>{t("More projects")}</h2>}
          <div className="additional-grid">
            {additional.map((project) => (
              <article key={project.slug}>
                <div>
                  <p className="eyebrow">{project.category}</p>
                  <h3>
                    <SiteLink href={`/projects/${project.slug}`}>
                      {project.name}
                    </SiteLink>
                  </h3>
                </div>
                <p>{project.summary}</p>
                <div className="index-actions">
                  <SiteLink
                    className="text-link"
                    href={`/projects/${project.slug}`}
                    aria-label={t("View {project} project details", {
                      project: project.name,
                    })}
                  >
                    {t("Project details")}
                  </SiteLink>
                  {project.liveUrl && (
                    <a className="text-link" href={project.liveUrl}>
                      {t("Live site")}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

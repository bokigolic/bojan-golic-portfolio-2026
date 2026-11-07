import { additionalProjects, featuredProjects } from "../data/projects";
import ProjectMedia from "./ProjectMedia";
import ProjectActions from "./ProjectActions";
import SiteLink from "./SiteLink";
export default function FeaturedProjects({
  projects,
  additional = additionalProjects,
  showHeading = true,
  presentation = "collection",
}) {
  if (presentation === "homepage") {
    return (
      <section
        className="featured-work featured-work-home section reveal"
        id="project-collection"
        aria-labelledby="work-title"
      >
        <div className="section-heading project-stories-heading">
          <div>
            <p className="eyebrow">01 / Selected independent work</p>
            <h2 id="work-title">
              Products with a point
              <br />
              <em>of view.</em>
            </h2>
          </div>
          <p>
            Three independent products shaped around different people, problems,
            and interface systems. Each presentation uses an authentic
            application capture.
          </p>
        </div>
        <div className="featured-grid homepage-project-stories">
          {projects.map((project, index) => {
            const mobile = project.tone === "fluent";
            return (
              <article
                key={project.slug}
                className={`feature-card project-story project-story-${project.tone}`}
              >
                <div className="project-story-copy">
                  <div className="project-story-index">
                    <span>0{index + 1}</span>
                    <span>{project.category}</span>
                  </div>
                  <p className="project-story-kicker">
                    {project.slug === "lwr-local"
                      ? "Flagship local discovery platform"
                      : project.slug === "bokigym"
                        ? "Exercise discovery and workout tools"
                        : "A mobile-first language companion"}
                  </p>
                  <h3>{project.name}</h3>
                  <p className="project-story-tagline">{project.tagline}</p>
                  <p className="project-story-summary">{project.summary}</p>
                  <ul
                    className="tech-tags"
                    aria-label={`${project.name} verified technologies`}
                  >
                    {project.stack.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                  <ProjectActions project={project} details />
                </div>
                <SiteLink
                  className="feature-media-link project-story-media"
                  href={`/projects/${project.slug}`}
                  aria-label={`View ${project.name} case study`}
                >
                  <ProjectMedia
                    project={project}
                    device={mobile ? "mobile" : "desktop"}
                    priority={project.slug === "lwr-local"}
                  />
                  <span className="media-open" aria-hidden="true">
                    &#8599;
                  </span>
                </SiteLink>
              </article>
            );
          })}
        </div>
        <div className="project-stories-footer">
          <p>Seven projects. One considered body of work.</p>
          <SiteLink className="text-link" href="/work">
            Explore the complete collection{" "}
            <span aria-hidden="true">&#8599;</span>
          </SiteLink>
        </div>
      </section>
    );
  }
  return (
    <section
      className="featured-work section"
      id="project-collection"
      aria-labelledby="work-title"
    >
      {showHeading ? (
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Featured independent work</p>
            <h2 id="work-title">
              Practical products.
              <br />
              <em>Real interfaces.</em>
            </h2>
          </div>
          <p>
            Three independently developed products, each grounded in a real use
            case and supported by authentic interface captures.
          </p>
        </div>
      ) : (
        <h2 className="visually-hidden" id="work-title">
          Project collection
        </h2>
      )}
      <div className="featured-grid">
        {projects.map((p) => {
          const i = featuredProjects.findIndex(
            (project) => project.slug === p.slug,
          );
          const flagship = p.slug === "lwr-local";
          const media = (
            <SiteLink
              className="feature-media-link"
              href={`/projects/${p.slug}`}
              aria-label={`View ${p.name} case study`}
            >
              <ProjectMedia
                project={p}
                device={p.tone === "fluent" ? "mobile" : "desktop"}
              />
              <span className="media-open" aria-hidden="true">
                &#8599;
              </span>
            </SiteLink>
          );
          const copy = (
            <div className="feature-copy">
              <div className="feature-meta">
                <span>
                  0{i + 1} / {p.category}
                </span>
                <span>
                  {flagship
                    ? "FLAGSHIP PROJECT"
                    : p.tone === "gym"
                      ? "EXERCISE & ROUTING"
                      : "LANGUAGE & STATE"}
                </span>
              </div>
              <h3>{p.name}</h3>
              <p className="feature-tagline">{p.tagline}</p>
              <p>{p.summary}</p>
              <ul
                className="tech-tags"
                aria-label={`${p.name} verified technologies`}
              >
                {p.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <ProjectActions project={p} details />
            </div>
          );
          return (
            <article
              key={p.slug}
              className={`feature-card feature-${p.tone}${flagship ? " is-flagship" : ""}`}
            >
              {p.tone === "fluent" ? (
                <>
                  {copy}
                  {media}
                </>
              ) : (
                <>
                  {media}
                  {copy}
                </>
              )}
            </article>
          );
        })}
      </div>
      {additional.length > 0 && (
        <details className="more-work" open>
          <summary>
            More projects &amp; experiments{" "}
            <span>
              {additional.length.toString().padStart(2, "0")}{" "}
              {additional.length === 1 ? "project" : "projects"} / +
            </span>
          </summary>
          <div className="additional-grid">
            {additional.map((p) => (
              <article key={p.slug}>
                <span className="eyebrow">{p.category}</span>
                <h3>
                  <SiteLink href={`/projects/${p.slug}`}>{p.name}</SiteLink>
                </h3>
                <p>{p.summary}</p>
                <ul
                  className="tech-tags"
                  aria-label={`${p.name} verified technologies`}
                >
                  {p.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                <ProjectActions project={p} details />
              </article>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}

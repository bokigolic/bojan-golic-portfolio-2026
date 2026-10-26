import { additionalProjects } from "../data/projects";
import ProjectMedia from "./ProjectMedia";
import ProjectActions from "./ProjectActions";
import SiteLink from "./SiteLink";
export default function FeaturedProjects({ projects }) {
  return (
    <section
      className="featured-work section"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Featured work</p>
          <h2 id="work-title">
            Independent ideas.
            <br />
            <em>Real applications.</em>
          </h2>
        </div>
        <p>
          Three personal projects, each built around a different problem. A
          closer look at the interface, the implementation, and the thinking
          behind it.
        </p>
      </div>
      <div className="featured-grid">
        {projects.map((p, i) => (
          <article
            key={p.slug}
            className={`feature-card feature-${p.tone}${i === 0 ? " is-flagship" : ""}`}
          >
            <SiteLink
              className="feature-media-link"
              href={`/projects/${p.slug}`}
              aria-label={`View ${p.name} case study`}
            >
              <ProjectMedia project={p} />
              <span className="media-open" aria-hidden="true">
                &#8599;
              </span>
            </SiteLink>
            <div className="feature-copy">
              <div className="feature-meta">
                <span>
                  0{i + 1} / {p.category}
                </span>
                <span>{i === 0 ? "FLAGSHIP PROJECT" : "PERSONAL PROJECT"}</span>
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
          </article>
        ))}
      </div>
      <details className="more-work">
        <summary>
          More projects &amp; experiments{" "}
          <span>
            {additionalProjects.length.toString().padStart(2, "0")} projects / +
          </span>
        </summary>
        <div className="additional-grid">
          {additionalProjects.map((p) => (
            <article key={p.slug}>
              <span className="eyebrow">{p.category}</span>
              <h3>
                <SiteLink href={`/projects/${p.slug}`}>{p.name}</SiteLink>
              </h3>
              <p>{p.summary}</p>
              <ProjectActions project={p} details />
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}

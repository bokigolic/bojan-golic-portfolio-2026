import { useState } from "react";
import ProjectPreview from "./ProjectPreview";

export function ProjectArtwork({ project }) {
  return <ProjectPreview project={project} />;
}

export function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      {project.liveUrl && (
        <a
          className="project-demo"
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name} live demo`}
        >
          Live demo <span aria-hidden="true">&#8599;</span>
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} on GitHub`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.58 9.58 0 0 1 12 6.83c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
          </svg>
          GitHub <span aria-hidden="true">&#8599;</span>
        </a>
      )}
    </div>
  );
}

export default function FeaturedProjects({ projects }) {
  const [filter, setFilter] = useState("All work");
  const selectedProjects = [...projects].sort((a, b) => a.order - b.order);
  const filters = [
    "All work",
    "Business tools",
    "Fitness",
    "Learning",
    "Websites",
    "In progress",
  ];
  const visibleProjects = selectedProjects.filter(
    (p) => filter === "All work" || p.group === filter,
  );
  return (
    <section
      className="featured-projects section showcase-editorial"
      id="work"
      aria-labelledby="featured-projects-title"
    >
      <div className="section-head">
        <div>
          <p className="section-kicker">01 / The project collection</p>
          <h2 id="featured-projects-title">
            Useful by purpose.
            <br />
            <em>Thoughtful by design.</em>
          </h2>
        </div>
        <div className="collection-intro">
          <span className="collection-edition">
            INDEPENDENT PRODUCTS &amp; WEB WORK
          </span>
          <p>
            Applications for learning, fitness, and everyday business. Explore
            the experience, discover the details, or dive into the code.
          </p>
        </div>
      </div>
      <div className="showcase-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((label) => (
            <button
              key={label}
              type="button"
              aria-pressed={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="showcase-count" role="status" aria-live="polite">
          {String(visibleProjects.length).padStart(2, "0")} / selected projects
        </span>
      </div>
      <div className="featured-project-grid">
        {visibleProjects.map((project) => (
          <article
            className={`featured-project collection-project collection-project--${project.tone}`}
            key={project.slug}
          >
            <a
              className="project-art-link"
              href={`/projects/${project.slug}`}
              aria-label={`Explore ${project.title}`}
            >
              <ProjectArtwork project={project} />
              <span className="project-hover-label">
                Explore the project &#8599;
              </span>
            </a>
            <div className="featured-project-copy">
              <div className="featured-project-meta">
                <span>{project.category}</span>
                <span className={project.liveUrl ? "project-live" : ""}>
                  {project.liveUrl ? "Live project" : project.status}
                </span>
              </div>
              <h3>
                <a href={`/projects/${project.slug}`}>{project.name}</a>
              </h3>
              <p className="project-descriptor">{project.descriptor}</p>
              <p>{project.summary}</p>
              {project.stack.length > 0 && (
                <ul
                  className="project-stack"
                  aria-label={`${project.name} technologies`}
                >
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}
              <div className="project-card-footer">
                <ProjectLinks project={project} />
                <a
                  className="project-details"
                  href={`/projects/${project.slug}`}
                  aria-label={`Read about ${project.name}`}
                >
                  View project <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="collection-end">
        <span>BUILT WITH PURPOSE. SHARED WITH YOU.</span>
        <p>From the first interaction to the details that make it work.</p>
        <a
          href="https://github.com/bokigolic?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub &#8599;
        </a>
      </div>
    </section>
  );
}

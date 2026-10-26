import { useEffect } from "react";
import { ProjectArtwork, ProjectLinks } from "./FeaturedProjects";

export default function ProjectCaseStudy({ project, projects }) {
  const collection = [...projects].sort((a, b) => a.order - b.order);
  const index = collection.findIndex((item) => item.slug === project.slug);
  const next = collection[(index + 1) % collection.length];
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${project.name} | Bojan Golic`;
    return () => {
      document.title = previousTitle;
    };
  }, [project.name]);
  return (
    <article className="project-case-page section">
      <div className="case-study-back-row">
        <a href="/#work">&#8592; All projects</a>
        <span>
          PROJECT {String(index + 1).padStart(2, "0")} /{" "}
          {String(collection.length).padStart(2, "0")}
        </span>
      </div>
      <header className="case-study-hero">
        <div>
          <p className="section-kicker">{project.category} / Selected work</p>
          <h1>{project.name}</h1>
          <p className="case-study-brand">{project.descriptor}</p>
          <p className="case-study-summary">{project.summary}</p>
          <ProjectLinks project={project} />
        </div>
        <ProjectArtwork project={project} />
      </header>
      <div className="case-study-content">
        <section>
          <p className="section-kicker">The project</p>
          <h2>{project.tagline}</h2>
          <p>{project.summary}</p>
          {project.features.length > 0 && (
            <ul className="project-feature-list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
          {project.githubUrl && (
            <a
              className="project-source-note"
              href={`${project.githubUrl}/blob/HEAD/${project.sourcePath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the documentation &amp; implementation &#8599;
            </a>
          )}
        </section>
        <aside className="case-study-overview">
          <h2>At a glance</h2>
          <dl>
            <dt>Category</dt>
            <dd>{project.category}</dd>
            <dt>Product</dt>
            <dd>{project.name}</dd>
            {project.stack.length > 0 && (
              <>
                <dt>Built with</dt>
                <dd>{project.stack.join(" / ")}</dd>
              </>
            )}
            {project.liveUrl && (
              <>
                <dt>Deployment</dt>
                <dd>Netlify</dd>
              </>
            )}
          </dl>
        </aside>
      </div>
      <nav className="case-study-next" aria-label="Other projects">
        <a href="/#work">
          Back to showcase <span>All projects &#8599;</span>
        </a>
        <a href={`/projects/${next.slug}`}>
          Next project <span>{next.name} &#8594;</span>
        </a>
      </nav>
    </article>
  );
}

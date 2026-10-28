import ProjectMedia from "./ProjectMedia";
import ProjectActions from "./ProjectActions";
import SiteLink from "./SiteLink";
const sections = [
  ["problem", "The problem"],
  ["role", "My role"],
  ["architecture", "Technical architecture"],
  ["process", "Design & development"],
  ["challenges", "Challenges & decisions"],
  ["results", "What is demonstrated"],
  ["next", "Lessons & next steps"],
];
export default function ProjectCaseStudy({ project, projects }) {
  const collection = project.featured
    ? projects.filter((p) => p.featured)
    : projects;
  const index = collection.findIndex((p) => p.slug === project.slug);
  const next = collection[(index + 1) % collection.length];
  return (
    <article className={`case-study theme-${project.tone}`}>
      <div className="case-top section">
        <SiteLink className="text-link" href="/work">
          <span aria-hidden="true">&#8592;</span> Back to work
        </SiteLink>
        <span className="eyebrow">
          PROJECT {String(index + 1).padStart(2, "0")} /{" "}
          {String(collection.length).padStart(2, "0")}
        </span>
      </div>
      <header className="case-header section">
        <p className="eyebrow">
          {project.category} / {project.status}
        </p>
        <h1>{project.name}</h1>
        <p className="case-tagline">{project.tagline}</p>
        <p className="case-summary">{project.summary}</p>
        <ProjectActions project={project} />
        <ul className="tech-tags" aria-label="Verified technologies">
          {project.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </header>
      <div className="case-cover section">
        <ProjectMedia
          project={project}
          priority
          sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 1100px) calc(100vw - 72px), 1248px"
        />
      </div>
      <div className="case-body section">
        <aside className="case-outline" aria-label="On this page">
          <span className="eyebrow">Inside the project</span>
          <SiteLink href="#overview">Overview</SiteLink>
          {sections
            .filter(([key]) => project.caseStudy[key])
            .map(([key, title]) => (
              <SiteLink key={key} href={`#${key}`}>
                {title}
              </SiteLink>
            ))}
          <SiteLink href="#features">Features</SiteLink>
          <SiteLink href="#visual-evidence">Visual evidence</SiteLink>
        </aside>
        <div className="case-sections">
          <section id="overview">
            <p className="eyebrow">01 / Overview</p>
            <h2>{project.tagline}</h2>
            <p>{project.summary}</p>
          </section>
          {sections
            .filter(([key]) => project.caseStudy[key])
            .map(([key, title], i) => (
              <section key={key} id={key}>
                <p className="eyebrow">
                  {String(i + 2).padStart(2, "0")} / The implementation
                </p>
                <h2>{title}</h2>
                <p>{project.caseStudy[key]}</p>
              </section>
            ))}
          <section id="features">
            <p className="eyebrow">Product functionality</p>
            <h2>What is in the project.</h2>
            <ul className="case-feature-list">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {project.evidence && (
              <p className="evidence-note">Source review: {project.evidence}</p>
            )}
          </section>
          <section id="visual-evidence">
            <p className="eyebrow">Visual evidence</p>
            <h2>The experience across screens.</h2>
            <p>
              These are captures of the real public interface, not an embedded
              application. Open the demo to interact with the product.
            </p>
            <div className="case-responsive-media">
              <ProjectMedia project={project} />
              <ProjectMedia project={project} device="mobile" />
            </div>
            {project.githubUrl && (
              <a
                className="text-link"
                href={`${project.githubUrl}/blob/HEAD/${project.sourcePath}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Explore the source implementation for ${project.name} (opens in a new tab)`}
              >
                Explore the source implementation{" "}
                <span aria-hidden="true">&#8599;</span>
              </a>
            )}
          </section>
        </div>
      </div>
      <nav className="case-navigation section" aria-label="Project navigation">
        <SiteLink href="/work">
          <span>BACK TO THE COLLECTION</span>
          <strong>All projects &#8599;</strong>
        </SiteLink>
        <SiteLink href={`/projects/${next.slug}`}>
          <span>NEXT PROJECT</span>
          <strong>{next.name} &#8594;</strong>
        </SiteLink>
      </nav>
    </article>
  );
}

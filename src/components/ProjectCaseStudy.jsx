import ProjectMedia from "./ProjectMedia";
import ProjectActions from "./ProjectActions";
import SiteLink from "./SiteLink";

const sections = [
  ["problem", "The brief"],
  ["role", "My role"],
  ["architecture", "Technical architecture"],
  ["process", "Design & development"],
  ["challenges", "Design decisions"],
  ["results", "The current build"],
  ["next", "Next steps"],
];

export default function ProjectCaseStudy({ project, projects }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const story = sections.filter(([key]) => project.caseStudy[key]);
  return (
    <article className="case-study">
      <div className="case-top section">
        <SiteLink className="text-link" href="/work">
          All projects
        </SiteLink>
      </div>
      <header className="case-header section" id="overview">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.name}</h1>
        <div className="case-intro">
          <div>
            <p className="case-summary">{project.summary}</p>
            <ProjectActions project={project} />
          </div>
          <dl className="project-facts">
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
            <div>
              <dt>Technologies</dt>
              <dd>{project.stack.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </header>
      {project.media && (
        <div className={`case-cover section stage-${project.tone}`}>
          <ProjectMedia
            project={project}
            priority
            sizes="(max-width: 680px) 86vw, (max-width: 1440px) 78vw, 1100px"
          />
        </div>
      )}
      <div className="case-body section">
        <nav className="case-outline" aria-label="On this page">
          <p className="eyebrow">On this page</p>
          {story.map(([key, title]) => (
            <SiteLink key={key} href={`#${key}`}>
              {title}
            </SiteLink>
          ))}
          <SiteLink href="#features">Features</SiteLink>
          {project.media && (
            <SiteLink href="#visual-evidence">Mobile interface</SiteLink>
          )}
        </nav>
        <div className="case-sections">
          {story.map(([key, title]) => (
            <section key={key} id={key}>
              <h2>{title}</h2>
              <p>{project.caseStudy[key]}</p>
            </section>
          ))}
          <section id="features">
            <h2>Features</h2>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {project.githubUrl && (
              <a
                className="text-link"
                href={`${project.githubUrl}/blob/HEAD/${project.sourcePath}`}
              >
                Browse the implementation
              </a>
            )}
          </section>
          {project.media && (
            <section id="visual-evidence">
              <h2>Mobile interface</h2>
              <ProjectMedia project={project} device="mobile" caption />
            </section>
          )}
        </div>
      </div>
      <nav className="case-navigation section" aria-label="Project navigation">
        <SiteLink className="text-link" href="/work">
          Back to all work
        </SiteLink>
        <SiteLink href={`/projects/${next.slug}`}>
          <span className="eyebrow">Next project</span>
          <strong>{next.name}</strong>
        </SiteLink>
      </nav>
    </article>
  );
}

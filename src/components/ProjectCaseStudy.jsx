import { useLocale } from "../i18n/context";
import ProjectMedia from "./ProjectMedia";
import ProjectActions from "./ProjectActions";
import SiteLink from "./SiteLink";

const sections = [
  ["problem", "Why I built it"],
  ["role", "My role"],
  ["architecture", "How it works"],
  ["process", "Design & development"],
  ["challenges", "Design decisions"],
  ["results", "Try the current version"],
];

export default function ProjectCaseStudy({ project, projects }) {
  const related = project.featured
    ? projects.filter((item) => item.featured)
    : projects;
  const next = related[(related.indexOf(project) + 1) % related.length];
  const { t } = useLocale();
  const story = sections
    .filter(([key]) => project.caseStudy[key])
    .map(([key, title]) => [key, project.sectionTitles?.[key] ?? title]);
  return (
    <article className="case-study">
      <div className="case-top section">
        <SiteLink className="text-link" href="/work">
          {t("All projects")}
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
              <dt>{t("Status")}</dt>
              <dd>{t(project.status)}</dd>
            </div>
            <div>
              <dt>{t("Technologies")}</dt>
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
        <nav className="case-outline" aria-labelledby="case-outline-title">
          <p className="eyebrow" id="case-outline-title">
            {t("On this page")}
          </p>
          {story.map(([key, title]) => (
            <SiteLink key={key} href={`#${key}`}>
              {t(title)}
            </SiteLink>
          ))}
          <SiteLink href="#features">{t("Features")}</SiteLink>
          {project.media && (
            <SiteLink href="#visual-evidence">
              {t("Interface screenshots")}
            </SiteLink>
          )}
          {project.caseStudy.next && (
            <SiteLink href="#next">{t("What’s next")}</SiteLink>
          )}
        </nav>
        <div className="case-sections">
          {story.map(([key, title]) => (
            <section key={key} id={key}>
              <h2>{t(title)}</h2>
              <p>{project.caseStudy[key]}</p>
            </section>
          ))}
          <section id="features">
            <h2>{t("Features")}</h2>
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
                {t("Browse the implementation")}
              </a>
            )}
          </section>
          {project.media && (
            <section id="visual-evidence">
              <h2>{t("Interface screenshots")}</h2>
              {project.media.detail && (
                <ProjectMedia
                  project={project}
                  detail
                  caption
                  sizes="(max-width: 700px) 90vw, (max-width: 1200px) 63vw, 800px"
                />
              )}
              <ProjectMedia project={project} device="mobile" caption />
            </section>
          )}
          {project.caseStudy.next && (
            <section id="next">
              <h2>{t("What’s next")}</h2>
              <p>{project.caseStudy.next}</p>
            </section>
          )}
        </div>
      </div>
      <nav
        className="case-navigation section"
        aria-label={t("Project navigation")}
      >
        <SiteLink className="text-link" href="/work">
          {t("Back to all work")}
        </SiteLink>
        <SiteLink href={`/projects/${next.slug}`}>
          <span className="eyebrow">{t("Next project")}</span>
          <strong>{next.name}</strong>
        </SiteLink>
      </nav>
    </article>
  );
}

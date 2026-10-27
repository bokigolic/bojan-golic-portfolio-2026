import SiteLink from "./SiteLink";

export default function ProjectActions({ project, details = false }) {
  return (
    <div className="project-actions">
      {details && (
        <SiteLink
          className="button button-dark"
          href={`/projects/${project.slug}`}
        >
          View case study <span aria-hidden="true">↗</span>
        </SiteLink>
      )}
      {project.liveUrl && (
        <a
          className={`button ${details ? "button-outline" : "button-dark"}`}
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name} live demo (new tab)`}
        >
          Live demo <span aria-hidden="true">↗</span>
        </a>
      )}
      {project.githubUrl && (
        <a
          className="text-link"
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} on GitHub (new tab)`}
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

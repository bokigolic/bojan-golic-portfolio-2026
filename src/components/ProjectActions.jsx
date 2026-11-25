export default function ProjectActions({ project }) {
  return (
    <div className="project-actions">
      {project.liveUrl && (
        <a className="button button-dark" href={project.liveUrl}>
          Live site
        </a>
      )}
      {project.githubUrl && (
        <a className="text-link" href={project.githubUrl}>
          GitHub repository
        </a>
      )}
    </div>
  );
}

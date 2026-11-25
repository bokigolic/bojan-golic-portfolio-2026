import { useLocale } from "../i18n/context";
export default function ProjectActions({ project }) {
  const { t } = useLocale();
  return (
    <div className="project-actions">
      {project.liveUrl && (
        <a className="button button-dark" href={project.liveUrl}>
          {t("Live site")}
        </a>
      )}
      {project.githubUrl && (
        <a className="text-link" href={project.githubUrl}>
          {t("GitHub repository")}
        </a>
      )}
    </div>
  );
}

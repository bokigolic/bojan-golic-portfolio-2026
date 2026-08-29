import { trackEvent } from "../utils/analytics";

export default function ProjectCard({ project, index = 0 }) {
  const alt = index % 2 === 1;
  return (
    <details
      className={"case-card" + (alt ? " case-card--alt" : "")}
      key={project.id}
      onClick={() => trackEvent("project_click", { project: project.id })}
    >
      <summary>
        <div className="case-top">
          <span className="case-number">{project.id}</span>
          <p className="case-eyebrow">{project.eyebrow}</p>
          <i className="case-toggle">+</i>
        </div>
        <h3>{project.title}</h3>
        <p className="case-summary">{project.summary}</p>
        <div className="case-result">
          <strong>{project.result}</strong>
          <span>{project.resultLabel}</span>
        </div>
        <div className="case-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <span className="open-label">
          View project approach <i className="open-arrow">→</i>
        </span>
        <div className="case-visual" aria-hidden="true" />
      </summary>
      <div className="case-details">
        <p>What the work included</p>
        <ul>
          {project.details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function ProjectCard({ project }) {
  return (
    <details className="case-card" key={project.id}>
      <summary>
        <div className="case-top">
          <span>{project.id}</span>
          <p>{project.eyebrow}</p>
          <i>+</i>
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
        <span className="open-label">View project approach</span>
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

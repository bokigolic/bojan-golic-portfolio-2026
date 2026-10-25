import { trackEvent } from "../utils/analytics";

export default function ProjectCard({ project, index = 0 }) {
  const alt = index % 2 === 1;
  return (
    <details
      className={"case-card reveal" + (alt ? " case-card--alt" : "")}
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
        <div
          className={`case-visual case-visual--${project.id}`}
          aria-hidden="true"
        >
          {project.id === "01" && (
            <div className="visual-migration">
              <span className="visual-label">CONTENT MIGRATION</span>
              <div className="migration-flow">
                <span>Inventory</span>
                <i />
                <span>Mapping</span>
                <i />
                <strong>Launch</strong>
              </div>
              <div className="migration-progress">
                <i />
              </div>
              <small>Content structured for the next platform</small>
            </div>
          )}
          {project.id === "02" && (
            <div className="visual-publishing">
              <span className="visual-label">PUBLISHING CALENDAR</span>
              <div className="calendar-week">
                {["M", "T", "W", "T", "F"].map((day, index) => (
                  <span key={`${day}-${index}`}>{day}</span>
                ))}
              </div>
              <div className="calendar-bars">
                <i />
                <i />
                <i />
                <i />
              </div>
              <small>
                Draft <b /> Review <b /> Scheduled
              </small>
            </div>
          )}
          {project.id === "03" && (
            <div className="visual-quality">
              <span className="visual-label">SITE QUALITY CHECK</span>
              <div className="quality-score">
                <strong>QA</strong>
                <span>Ready for review</span>
              </div>
              <div className="quality-checks">
                <span>Accessibility</span>
                <i>✓</i>
                <span>Metadata</span>
                <i>✓</i>
                <span>Responsive</span>
                <i>✓</i>
              </div>
            </div>
          )}
          {project.id === "04" && (
            <div className="visual-delivery">
              <span className="visual-label">REQUEST TO RELEASE</span>
              <div className="delivery-steps">
                <span>
                  01
                  <br />
                  <b>Scope</b>
                </span>
                <i />
                <span>
                  02
                  <br />
                  <b>Build</b>
                </span>
                <i />
                <span>
                  03
                  <br />
                  <b>QA</b>
                </span>
                <i />
                <strong>
                  04
                  <br />
                  <b>Live</b>
                </strong>
              </div>
              <small>Clear ownership at every handoff</small>
            </div>
          )}
        </div>
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

// Portfolio illustrations of each product's focus, not captured app screenshots.
export default function ProjectPreview({ project }) {
  if (!project.liveUrl)
    return (
      <div
        className={`project-art project-art--${project.tone}`}
        aria-hidden="true"
      >
        <span className="project-art-top">{project.category}</span>
        <span className="project-art-mark">{project.shortName}</span>
        <span className="project-art-bottom">{project.tagline}</span>
      </div>
    );
  return (
    <div
      className={`product-scene product-scene--${project.tone}`}
      aria-hidden="true"
    >
      <div className="product-window">
        <div className="product-window-bar">
          <span>
            <i />
            <i />
            <i />
          </span>
          <small>{project.name}</small>
          <span>↗</span>
        </div>
        <div className="product-window-body">
          <aside className="product-sidebar">
            <b>{project.shortName}</b>
            <span />
            <span />
            <span />
            <span />
            <i />
          </aside>
          <div className="product-canvas">
            <span className="preview-eyebrow">{project.category}</span>
            {project.tone === "gym" ? (
              <>
                <h4>
                  Built around
                  <br />
                  your movement.
                </h4>
                <div className="movement-visual">
                  <svg viewBox="0 0 260 140" fill="none">
                    <circle cx="132" cy="23" r="12" />
                    <path d="m130 39-16 36 32 23 13 31M114 75l-31 21-22 33M127 45l34 18 36-12M125 48 94 59 70 42" />
                    <path
                      className="movement-orbit"
                      d="M25 100c-8-60 168-100 210-52s-65 103-145 82"
                    />
                  </svg>
                  <span>EXPLORE / TRAIN / LEARN</span>
                </div>
              </>
            ) : project.tone === "booking" ? (
              <>
                <h4>
                  Make room
                  <br />
                  for what's next.
                </h4>
                <div className="preview-calendar">
                  <div>
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                  <div>
                    {Array.from({ length: 21 }, (_, i) => (
                      <span
                        className={
                          [3, 9, 16].includes(i) ? "calendar-selected" : ""
                        }
                        key={i}
                      >
                        {i + 1}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : project.tone === "invoice" ? (
              <>
                <h4>
                  Your work.
                  <br />
                  Clearly accounted for.
                </h4>
                <div className="preview-invoice">
                  <div>
                    <b>INVOICE</b>
                    <span>№ 001</span>
                  </div>
                  <i />
                  <i />
                  <div className="invoice-table">
                    {["Description", "Quantity", "Amount"].map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <i />
                  <i />
                  <div className="invoice-total">
                    <span>Total</span>
                    <b>—</b>
                  </div>
                </div>
              </>
            ) : project.tone === "fluent" ? (
              <>
                <h4>
                  A new word.
                  <br />A new possibility.
                </h4>
                <div className="preview-word">
                  <span>YOUR NEXT WORD</span>
                  <strong>
                    possibility<span> / noun</span>
                  </strong>
                  <p>A chance to learn something new.</p>
                  <div>
                    <span>Discover</span>
                    <span>Save</span>
                    <span>Practice</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="preview-clean-star">✳</span>
                <h4>
                  A fresh start.
                  <br />
                  For every space.
                </h4>
                <div className="preview-services">
                  <span>Carpet care</span>
                  <span>Tile &amp; grout</span>
                  <span>Upholstery</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <span className="scene-caption">INTERFACE ILLUSTRATION</span>
    </div>
  );
}

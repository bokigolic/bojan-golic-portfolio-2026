import { useState } from "react";

export default function HeroIllustration() {
  const [view, setView] = useState("desktop");

  return (
    <div className={`hero-illo preview-is-${view}`}>
      <div className="preview-toolbar">
        <div className="preview-toolbar-copy">
          <span className="preview-indicator" />
          <span>RESPONSIVE PREVIEW</span>
        </div>
        <div
          className="preview-switch"
          role="group"
          aria-label="Preview viewport"
        >
          <button
            type="button"
            aria-pressed={view === "desktop"}
            onClick={() => setView("desktop")}
          >
            Desktop
          </button>
          <button
            type="button"
            aria-pressed={view === "mobile"}
            onClick={() => setView("mobile")}
          >
            Mobile
          </button>
        </div>
      </div>
      <div className="site-preview">
        <div className="preview-chrome">
          <div className="preview-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>website-preview.com</span>
          <span className="preview-status">DESIGN CONCEPT</span>
        </div>
        <div className="preview-page">
          <header className="preview-nav">
            <strong>
              FIELDNOTES<span>.</span>
            </strong>
            <nav aria-label="Preview navigation">
              <span>Stories</span>
              <span>Places</span>
              <span>About</span>
            </nav>
            <span className="preview-menu" aria-hidden="true">
              ☰
            </span>
          </header>
          <div className="preview-hero">
            <div className="preview-copy">
              <span className="preview-eyebrow">A journal for the curious</span>
              <strong>
                Find your
                <br />
                next somewhere.
              </strong>
              <span className="preview-link">
                Explore the journal <b>↗</b>
              </span>
            </div>
            <div className="preview-photo" aria-hidden="true">
              <div className="preview-sun" />
              <div className="preview-hill preview-hill-back" />
              <div className="preview-hill preview-hill-front" />
              <div className="preview-photo-label">
                DOLOMITES, ITALY · 06:42 AM
              </div>
            </div>
          </div>
          <div className="preview-bottom">
            <span>
              Thoughtful design. Clear content. Built for every screen.
            </span>
            <span>
              01 — 04 <i />
            </span>
          </div>
        </div>
        <div className="preview-note">
          <span>01</span> RESPONSIVE WEB DESIGN
        </div>
      </div>
      <p className="preview-caption" aria-live="polite">
        {view === "desktop"
          ? "Desktop layout · fluid content · accessible navigation"
          : "Mobile layout · touch-ready navigation · responsive type"}
      </p>
    </div>
  );
}

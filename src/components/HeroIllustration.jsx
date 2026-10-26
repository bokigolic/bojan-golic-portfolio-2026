import { useState } from "react";

const workViews = {
  publishing: {
    label: "Publishing queue",
    caption: "CONTENT OPERATIONS / RELEASE CONTROL",
    rows: [
      ["Marketing landing page", "Ready to publish", "ready"],
      ["Research profile update", "Stakeholder review", "review"],
      ["Campaign registration form", "Scheduled · 14:30", "scheduled"],
    ],
    metric: "04",
    metricLabel: "releases in today's queue",
  },
  migration: {
    label: "Migration tracker",
    caption: "CONTENT MODEL / URL VALIDATION",
    rows: [
      ["Content inventory", "Mapped", "ready"],
      ["Legacy page templates", "In progress", "review"],
      ["Redirect and metadata QA", "Next step", "scheduled"],
    ],
    metric: "100s",
    metricLabel: "of pages supported in migrations",
  },
  quality: {
    label: "Pre-publish quality check",
    caption: "ACCESSIBILITY / CONTENT / RESPONSIVE QA",
    rows: [
      ["Content and link review", "Checked", "ready"],
      ["Metadata and page structure", "Checked", "ready"],
      ["Responsive and accessibility QA", "In review", "review"],
    ],
    metric: "03",
    metricLabel: "quality checks before release",
  },
};

export default function HeroIllustration() {
  const [activeView, setActiveView] = useState("publishing");
  const currentView = workViews[activeView];

  return (
    <div
      className="workbench"
      aria-label="Interactive web production workbench"
    >
      <div className="workbench-topbar">
        <div className="workbench-brand">
          <span className="workbench-mark">BG</span>
          <span>WEB PRODUCTION</span>
        </div>
        <span className="workbench-status">
          <i /> SYSTEMS CLEAR
        </span>
      </div>
      <div className="workbench-body">
        <aside className="workbench-rail" aria-hidden="true">
          <span className="rail-icon is-active">⌘</span>
          <span className="rail-icon">▤</span>
          <span className="rail-icon">◷</span>
          <span className="rail-icon">✓</span>
          <span className="rail-avatar">BG</span>
        </aside>
        <div className="workbench-main">
          <div className="workbench-heading">
            <div>
              <p>{currentView.caption}</p>
              <h2>{currentView.label}</h2>
            </div>
            <span className="workbench-date">
              TODAY <b>24 OCT</b>
            </span>
          </div>
          <div
            className="workbench-tabs"
            role="tablist"
            aria-label="Web production views"
          >
            {Object.entries(workViews).map(([key, view]) => (
              <button
                key={key}
                id={`workbench-tab-${key}`}
                type="button"
                role="tab"
                aria-selected={activeView === key}
                aria-controls="workbench-panel"
                onClick={() => setActiveView(key)}
              >
                {key === "publishing"
                  ? "Publishing"
                  : key === "migration"
                    ? "Migration"
                    : "Quality"}
              </button>
            ))}
          </div>
          <div
            className="workbench-panel"
            id="workbench-panel"
            role="tabpanel"
            aria-labelledby={`workbench-tab-${activeView}`}
          >
            <div className="workbench-list-head">
              <span>WORK ITEM</span>
              <span>STATUS</span>
            </div>
            {currentView.rows.map(([title, status, tone], index) => (
              <div
                className="workbench-row"
                key={title}
                style={{ "--row-index": index }}
              >
                <span className="workbench-row-icon">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{title}</strong>
                <span className={`workbench-pill is-${tone}`}>
                  <i />
                  {status}
                </span>
              </div>
            ))}
            <div className="workbench-foot">
              <span>
                PLATFORM SCOPE <b>3,000+ PAGES</b>
              </span>
              <span>
                <strong>{currentView.metric}</strong> {currentView.metricLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="workbench-note">
        <span>01</span>
        <span>ANONYMIZED PRODUCTION WORKFLOW</span>
        <span>CMS / QA / RELEASE</span>
      </div>
    </div>
  );
}

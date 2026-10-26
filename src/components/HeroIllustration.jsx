import { useEffect, useState } from "react";

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
  performance: {
    label: "Live page diagnostics",
    caption: "REAL-TIME / THIS BROWSER SESSION",
    rows: [],
    metric: "LIVE",
    metricLabel: "metrics measured on this page",
  },
};

export default function HeroIllustration() {
  const [activeView, setActiveView] = useState("publishing");
  const currentView = workViews[activeView];
  const [liveMetrics, setLiveMetrics] = useState({
    lcp: null,
    cls: 0,
    transfer: null,
    nodes: 0,
    load: null,
  });

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const transferredBytes = resources.reduce(
      (total, resource) => total + (resource.transferSize || 0),
      navigation?.transferSize || 0,
    );

    setLiveMetrics((metrics) => ({
      ...metrics,
      lcp: navigation?.domContentLoadedEventEnd || null,
      load: navigation?.loadEventEnd || null,
      transfer: transferredBytes,
      nodes: document.getElementsByTagName("*").length,
    }));

    const observers = [];

    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const latest = entries[entries.length - 1];
        if (latest) {
          setLiveMetrics((metrics) => ({ ...metrics, lcp: latest.startTime }));
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(lcpObserver);
    } catch {}

    try {
      const clsObserver = new PerformanceObserver((list) => {
        const shift = list
          .getEntries()
          .filter((entry) => !entry.hadRecentInput)
          .reduce((total, entry) => total + entry.value, 0);
        if (shift) {
          setLiveMetrics((metrics) => ({ ...metrics, cls: metrics.cls + shift }));
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
      observers.push(clsObserver);
    } catch {}

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const performanceRows = [
    ["Largest contentful paint", liveMetrics.lcp ? `${(liveMetrics.lcp / 1000).toFixed(2)} s` : "Measuring", liveMetrics.lcp && liveMetrics.lcp < 2500 ? "ready" : "review"],
    ["Cumulative layout shift", liveMetrics.cls.toFixed(3), liveMetrics.cls < 0.1 ? "ready" : "review"],
    ["Transferred resources", liveMetrics.transfer ? `${(liveMetrics.transfer / 1024).toFixed(0)} KB` : "Unavailable", liveMetrics.transfer ? "ready" : "review"],
    ["Page load timing", liveMetrics.load ? `${(liveMetrics.load / 1000).toFixed(2)} s` : "Measuring", "scheduled"],
  ];
  const rows = activeView === "performance" ? performanceRows : currentView.rows;

  function handleTabKeyDown(event, key) {
    const tabs = Object.keys(workViews);
    const currentIndex = tabs.indexOf(key);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextKey = tabs[nextIndex];
    setActiveView(nextKey);
    document.getElementById(`workbench-tab-${nextKey}`)?.focus();
  }

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
              TODAY <b>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date()).toUpperCase()}</b>
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
                tabIndex={activeView === key ? 0 : -1}
                aria-controls="workbench-panel"
                onKeyDown={(event) => handleTabKeyDown(event, key)}
                onClick={() => setActiveView(key)}
              >
                {key === "publishing"
                  ? "Publishing"
                  : key === "migration"
                    ? "Migration"
                    : key === "quality"
                      ? "Quality"
                      : "Performance"}
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
            {rows.map(([title, status, tone], index) => (
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

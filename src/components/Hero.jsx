export default function Hero({
  onPrimaryClick,
  leadText,
  primaryLabel,
  secondaryLabel,
  onSecondaryClick,
}) {
  return (
    <section className="hero-modern" aria-label="Hero">
      <div className="hero-copy reveal reveal--delay-1">
        <p className="availability reveal reveal--delay-2">
          <i /> Available for select remote projects
        </p>
        <p className="overline reveal reveal--delay-2">
          Digital Experience · Web Production · Content Operations
        </p>
        <h1 className="reveal reveal--delay-3">
          Complex content.
          <br />
          <em>Clear digital</em>
          <br />
          experiences.
        </h1>
        <p className="hero-lead reveal reveal--delay-4">{leadText}</p>
        <div className="hero-actions reveal reveal--delay-5">
          <button
            className="button primary"
            onClick={onPrimaryClick}
            aria-label={primaryLabel}
          >
            {primaryLabel}
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => onSecondaryClick?.()}
            aria-label={secondaryLabel}
          >
            {secondaryLabel}
          </button>
        </div>
      </div>

      <div className="hero-dashboard reveal reveal--delay-6" aria-hidden="true">
        <div className="dash-top">
          <span>Production overview</span>
          <i>Live portfolio</i>
        </div>
        <div className="metric-feature">
          <div>
            <small>Enterprise platform</small>
            <strong>
              3,000<span>+</span>
            </strong>
            <p>
              pages supported through migration, production, QA, publishing, and
              ongoing maintenance
            </p>
          </div>
          <div className="ring" aria-label="End-to-end web production">
            <svg viewBox="0 0 120 120">
              <circle className="ring-bg" cx="60" cy="60" r="49" />
              <circle className="ring-line" cx="60" cy="60" r="49" />
            </svg>
            <span>
              End-to-end
              <br />
              <b>production</b>
            </span>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-head">
            <span>Production range</span>
            <small>2015 — 2026</small>
          </div>
          <svg
            className="line-chart"
            viewBox="0 0 520 145"
            role="img"
            aria-label="Career progression"
          >
            <defs>
              <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#38bdf8" stopOpacity=".5" />
                <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              className="chart-area"
              d="M0 116 C70 108 105 98 150 101 S245 70 300 75 S405 37 520 18 L520 145 L0 145Z"
            />
            <path
              className="chart-line"
              d="M0 116 C70 108 105 98 150 101 S245 70 300 75 S405 37 520 18"
            />
          </svg>
        </div>

        <div className="mini-metrics">
          <div>
            <strong>4+</strong>
            <span>years focused on web production</span>
          </div>
          <div>
            <strong>100+</strong>
            <span>pages in one standardized initiative</span>
          </div>
        </div>
      </div>

      <div className="orb orb-one" />
      <div className="orb orb-two" />
    </section>
  );
}

import HeroIllustration from "./HeroIllustration";

export default function Hero({ onPrimaryClick, onSecondaryClick }) {
  return (
    <section className="hero-modern" aria-label="Hero">
      <div className="hero-copy">
        <h1 className="reveal reveal--delay-2">
          COMPLEX WEB OPERATIONS.
          <br />
          CLEAR DIGITAL EXPERIENCES.
        </h1>
        <p className="hero-lead reveal reveal--delay-3">
          Digital Experience & Web Producer focused on enterprise CMS
          production, content operations, migration, QA, publishing, and
          continuous website improvement.
        </p>

        <div className="hero-actions reveal reveal--delay-4">
          <button
            className="button primary"
            onClick={onPrimaryClick}
            aria-label="View selected work"
          >
            View selected work
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={onSecondaryClick}
            aria-label="Explore capabilities"
          >
            Explore capabilities
          </button>
        </div>

        <div className="hero-stats reveal reveal--delay-5">
          <div className="stat">
            <strong data-count="3000">0</strong>
            <span>Enterprise pages supported</span>
          </div>
          <div className="stat">
            <strong data-count="4">0</strong>
            <span>Years focused on web production</span>
          </div>
          <div className="stat">
            <strong data-count="100">0</strong>
            <span>Pages delivered in a standardized initiative</span>
          </div>
        </div>
      </div>

      <div className="hero-dashboard" aria-hidden="true">
        <HeroIllustration />
      </div>
      <div
        className="scroll-indicator reveal reveal--delay-6"
        aria-hidden="true"
      >
        <span className="dot" />
        <small>Scroll to explore</small>
      </div>
    </section>
  );
}

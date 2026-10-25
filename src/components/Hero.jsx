import HeroIllustration from "./HeroIllustration";

export default function Hero({ onPrimaryClick, onSecondaryClick }) {
  return (
    <section className="hero-modern" id="about" aria-label="Hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-copy">
        <p className="hero-name reveal reveal--delay-1">
          WEB PRODUCER <span>/</span> FRONT-END DEVELOPER
        </p>
        <h1 className="reveal reveal--delay-2">
          <span>WEB</span>
          <span>BUILT TO</span>
          <span>PERFORM.</span>
        </h1>
        <p className="hero-lead reveal reveal--delay-3">
          I build and maintain enterprise websites, from reusable CMS components
          to responsive front-end, migrations, and quality assurance.
        </p>

        <div className="hero-actions reveal reveal--delay-4">
          <button
            className="button primary"
            onClick={onPrimaryClick}
            aria-label="View selected work"
          >
            View selected work <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={onSecondaryClick}
            aria-label="Explore capabilities"
          >
            Capabilities <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="hero-stats reveal reveal--delay-5">
          <div className="stat">
            <strong data-count="3000">3,000+</strong>
            <span>Pages across the enterprise platform</span>
          </div>
          <div className="stat">
            <strong>100s</strong>
            <span>Pages migrated and remediated</span>
          </div>
          <div className="stat">
            <strong>4+</strong>
            <span>Years in enterprise web production</span>
          </div>
        </div>
      </div>

      <div
        className="hero-dashboard"
        aria-label="Interactive responsive website preview"
      >
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

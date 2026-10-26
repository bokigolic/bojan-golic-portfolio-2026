import HeroIllustration from "./HeroIllustration";

export default function Hero({ onPrimaryClick, onSecondaryClick }) {
  return (
    <section className="hero-modern" id="about" aria-label="Hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-copy">
        <p className="hero-name reveal reveal--delay-1">
          BOJAN GOLIC <span>·</span> WEB PRODUCTION &amp; FRONT-END
        </p>
        <h1 className="reveal reveal--delay-2">
          <span>Complex web.</span>
          <span>Clear delivery.</span>
        </h1>
        <p className="hero-lead reveal reveal--delay-3">
          I build useful web applications and deliver enterprise websites.
          Explore my projects in learning, fitness, and business tools,
          alongside my work in CMS production and front-end development.
        </p>

        <div className="hero-actions reveal reveal--delay-4">
          <button
            className="button primary"
            onClick={onPrimaryClick}
            aria-label="Explore my projects"
          >
            Explore my projects <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={onSecondaryClick}
            aria-label="Explore capabilities"
          >
            How I work <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="hero-stats reveal reveal--delay-5">
          <div className="stat">
            <strong>3,000+</strong>
            <span>Pages across platform supported</span>
          </div>
          <div className="stat">
            <strong>100s</strong>
            <span>Pages in migration initiatives</span>
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

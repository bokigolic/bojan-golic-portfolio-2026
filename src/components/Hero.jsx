import SiteLink from "./SiteLink";
export default function Hero({ onOpenContact }) {
  return (
    <section className="hero section" id="intro" aria-labelledby="hero-title">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="status-dot" /> Web production / CMS / Frontend
        </p>
        <span className="hero-note">CODE. CRAFT. CONTEXT.</span>
      </div>
      <div className="hero-composition">
        <h1 id="hero-title">
          Web Producer &amp;
          <br />
          Digital Experience
          <br />
          <em>Specialist.</em>
        </h1>
        <div className="hero-bottom">
          <p>
            I build, manage, and improve modern digital experiences through CMS
            expertise, frontend development, SEO, accessibility, and thoughtful
            website production.
          </p>
          <div className="hero-actions">
            <SiteLink className="button button-dark" href="/work">
              Explore My Work <span aria-hidden="true">&#8599;</span>
            </SiteLink>
            <button className="button button-outline" onClick={onOpenContact}>
              Get in Touch <span aria-hidden="true">&#8599;</span>
            </button>
          </div>
        </div>
      </div>
      <div className="hero-footnote">
        <span>Web production / CMS / Frontend / SEO / Accessibility</span>
        <SiteLink href="/work">
          Selected projects &amp; case studies{" "}
          <span aria-hidden="true">&#8599;</span>
        </SiteLink>
      </div>
    </section>
  );
}

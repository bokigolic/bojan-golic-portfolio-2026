import SiteLink from "./SiteLink";
export default function Hero({ onOpenContact }) {
  return (
    <section className="hero section" aria-labelledby="hero-title">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="status-dot" /> Web Developer &amp; Digital Experience
          Specialist
        </p>
        <span className="hero-note">CODE. CRAFT. CONTEXT.</span>
      </div>
      <div className="hero-composition">
        <h1 id="hero-title">
          Building digital
          <br />
          experiences that
          <br />
          <em>work beautifully.</em>
        </h1>
        <div className="hero-bottom">
          <p>
            I design, build, and refine modern websites and web applications,
            combining frontend development with real-world experience in
            enterprise web production.
          </p>
          <div className="hero-actions">
            <SiteLink className="button button-dark" href="/#work">
              Explore my work <span aria-hidden="true">&#8599;</span>
            </SiteLink>
            <button className="button button-outline" onClick={onOpenContact}>
              Get in touch <span aria-hidden="true">&#8599;</span>
            </button>
          </div>
        </div>
      </div>
      <div className="hero-footnote">
        <span>Frontend development / Web applications / Enterprise CMS</span>
        <SiteLink href="/#workbench">
          Explore the workbench <span aria-hidden="true">&#8599;</span>
        </SiteLink>
      </div>
    </section>
  );
}

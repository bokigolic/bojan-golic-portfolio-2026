import SiteLink from "./SiteLink";
export default function Hero({ onOpenContact }) {
  return (
    <section className="hero section" id="intro" aria-labelledby="hero-title">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="status-dot" /> Bojan Golic / Web Developer &amp;
          Digital Experience Specialist
        </p>
        <span className="hero-note">FRONTEND / ENTERPRISE WEB / PRODUCTS</span>
      </div>
      <div className="hero-stage">
        <div className="hero-composition">
          <h1
            id="hero-title"
            aria-label="Built with purpose. Designed to perform."
          >
            <span>Built with </span>
            <strong>purpose.</strong>
            <em>Designed to perform.</em>
          </h1>
        </div>
        <div className="hero-brief">
          <p>
            I build modern web applications and digital experiences, bringing
            together frontend development, thoughtful design, and enterprise web
            expertise.
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
      <div className="hero-practice" aria-label="Areas of practice">
        <ol>
          <li>
            <span>01</span>
            <strong>Frontend engineering</strong>
          </li>
          <li>
            <span>02</span>
            <strong>Enterprise web</strong>
          </li>
          <li>
            <span>03</span>
            <strong>Independent products</strong>
          </li>
        </ol>
        <SiteLink href="/work">
          View all seven projects <span aria-hidden="true">&#8599;</span>
        </SiteLink>
      </div>
    </section>
  );
}

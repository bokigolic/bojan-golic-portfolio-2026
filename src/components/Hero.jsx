import SiteLink from "./SiteLink";
import ProjectMedia from "./ProjectMedia";
import { featuredProjects } from "../data/projects";
export default function Hero({ onOpenContact }) {
  const flagship = featuredProjects[0];
  return (
    <section className="hero section" id="intro" aria-labelledby="hero-title">
      <div className="hero-topline">
        <p className="eyebrow">
          <span className="status-dot" /> Bojan Golic / Web Developer &amp;
          Digital Experience Specialist
        </p>
        <span className="hero-note">FRONTEND / ENTERPRISE WEB / PRODUCTS</span>
      </div>
      <div className="hero-layout">
        <div className="hero-composition">
          <h1 id="hero-title">
            Built with purpose.
            <br />
            <em>Designed to perform.</em>
          </h1>
          <p>
            I build modern web applications and digital experiences, bringing
            together frontend development, thoughtful design, and enterprise
            web expertise.
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
        <div className="hero-evidence">
          <SiteLink
            className="hero-project-link"
            href={`/projects/${flagship.slug}`}
            aria-label={`Explore the ${flagship.name} case study`}
          >
            <div className="hero-project-meta">
              <span>Featured project</span>
              <strong>{flagship.name}</strong>
              <span aria-hidden="true">&#8599;</span>
            </div>
            <ProjectMedia
              project={flagship}
              priority
              sizes="(max-width: 849px) calc(100vw - 36px), 46vw"
            />
          </SiteLink>
          <p>
            Authentic interface capture. Independent product development,
            directory architecture, and responsive discovery.
          </p>
        </div>
      </div>
      <div className="hero-footnote">
        <span>React / Next.js / CMS / Accessibility / QA</span>
        <SiteLink href="/work">
          View all seven projects{" "}
          <span aria-hidden="true">&#8599;</span>
        </SiteLink>
      </div>
    </section>
  );
}

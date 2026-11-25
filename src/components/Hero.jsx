import SiteLink from "./SiteLink";

export default function Hero() {
  return (
    <section className="hero section" id="intro" aria-labelledby="hero-title">
      <p className="eyebrow hero-kicker">
        <span aria-hidden="true" /> Portfolio of Bojan Golic
      </p>
      <h1 id="hero-title">
        Web production<span>&amp; frontend.</span>
      </h1>
      <div className="hero-bottom">
        <div className="hero-actions">
          <SiteLink className="button button-dark" href="/work">
            Explore my work
          </SiteLink>
          <SiteLink className="text-link" href="#about">
            About me
          </SiteLink>
        </div>
        <p>
          I build and maintain enterprise websites in Optimizely and develop
          independent web applications with React.
        </p>
      </div>
    </section>
  );
}

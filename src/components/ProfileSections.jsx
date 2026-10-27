import { expertise, process, services } from "../data/profile";
import SiteLink from "./SiteLink";
export function Expertise() {
  return (
    <section
      className="expertise section"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / Technical expertise</p>
          <h2 id="expertise-title">
            The craft behind
            <br />
            <em>the experience.</em>
          </h2>
        </div>
        <p>
          Skills in context: the implementation choices behind the projects and
          the discipline behind enterprise publishing.
        </p>
      </div>
      <div className="expertise-grid">
        {expertise.map((e) => (
          <article key={e.number}>
            <span className="expertise-number">{e.number}</span>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
            <ul className="tech-tags">
              {e.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="expertise-evidence">
              <span className="eyebrow">In the work</span>
              {e.evidence.map((item) => (
                <div key={item.href}>
                  <SiteLink className="text-link" href={item.href}>
                    {item.label} <span aria-hidden="true">&#8599;</span>
                  </SiteLink>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Experience() {
  return (
    <section
      className="experience section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / Professional experience</p>
          <h2 id="experience-title">
            Built in practice.
            <br />
            <em>Grounded in delivery.</em>
          </h2>
        </div>
        <p>
          Enterprise publishing brings a different responsibility: keeping an
          established website clear, consistent, and current.
        </p>
      </div>
      <article className="experience-card">
        <div className="experience-company">
          <span className="eyebrow">Enterprise experience</span>
          <span className="company-monogram" aria-hidden="true">
            NACD
          </span>
          <p>
            National Association
            <br />
            of Corporate Directors
          </p>
          <span className="eyebrow">2023 - Present</span>
          <p className="company-context">
            Content, components, and the care behind a public-facing website.
          </p>
        </div>
        <div className="experience-role">
          <p className="eyebrow">Enterprise web production</p>
          <h3>
            Marketing Website
            <br />
            Production Analyst
          </h3>
          <p>
            Turning content updates into maintained pages through Optimizely CMS
            production, component configuration, and collaboration across teams.
          </p>
          <div className="service-disclosures">
            {services.map((s, i) => (
              <details key={s.title} open>
                <summary>
                  <span className="responsibility-number">0{i + 1}</span>
                  <strong>{s.title}</strong>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{s.text}</p>
              </details>
            ))}
          </div>
          <p className="experience-note">
            Professional experience at NACD. The software projects above are
            independent personal work.
          </p>
        </div>
      </article>
    </section>
  );
}
export function Process() {
  return (
    <section
      className="process section"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">04 / Development process</p>
          <h2 id="process-title">
            A clear path.
            <br />
            <em>A considered result.</em>
          </h2>
        </div>
        <p>Four steps, with review built into the work.</p>
      </div>
      <ol className="process-grid">
        {process.map(([title, text], i) => (
          <li key={title}>
            <span>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <p className="eyebrow">05 / A little context</p>
      <div className="about-layout">
        <h2 id="about-title">
          I like the place where
          <br />
          <em>design meets logic.</em>
        </h2>
        <div>
          <p className="about-lead">
            I enjoy turning a complex set of content and interactions into
            something people can navigate with confidence.
          </p>
          <p>
            My background spans economics, software development, and web
            production. That mix keeps me interested in both how an interface
            works and why someone needs it.
          </p>
          <div className="education">
            <span className="eyebrow">Education &amp; development</span>
            <ul>
              <li>
                Full Stack Web Development Certificate{" "}
                <span>George Washington University Boot Camp</span>
              </li>
              <li>
                Software Developer <span>IT Academy Serbia</span>
              </li>
              <li>
                Bachelor of Economics{" "}
                <span>University for Applied and Legal Sciences</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { expertise, process, services } from "../data/profile";
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
          A development foundation informed by personal applications and the
          everyday demands of enterprise websites.
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
          Alongside personal product development, I work in enterprise web
          production with the National Association of Corporate Directors.
        </p>
      </div>
      <article className="experience-card">
        <div className="experience-company">
          <span className="company-monogram" aria-hidden="true">
            NACD
          </span>
          <p>
            National Association
            <br />
            of Corporate Directors
          </p>
          <span className="eyebrow">2023 - Present</span>
        </div>
        <div>
          <p className="eyebrow">Enterprise web production</p>
          <h3>
            Marketing Website
            <br />
            Production Analyst
          </h3>
          <p>
            Supporting the website through Optimizely CMS production, content
            publishing, component configuration, maintenance, and collaboration
            across teams.
          </p>
          <div className="service-disclosures">
            {services.map((s) => (
              <details key={s.title}>
                <summary>
                  {s.title}
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
        <p>
          A practical approach to moving from an idea to an experience that is
          ready to use and straightforward to maintain.
        </p>
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
            My work connects frontend development with the practical discipline
            of keeping real websites useful, accessible, and up to date.
          </p>
          <p>
            Personal applications give me room to explore product ideas.
            Enterprise web production brings a different kind of rigor: clear
            structure, careful publishing, and attention to the details people
            rely on.
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

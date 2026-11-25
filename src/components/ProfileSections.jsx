import { expertise } from "../data/profile";
import SiteLink from "./SiteLink";

export function Expertise() {
  return (
    <section
      className="expertise section"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="section-heading">
        <h2 id="expertise-title">Expertise</h2>
      </div>
      <div className="expertise-grid">
        {expertise.map(({ title, text, tools, href, label }) => (
          <article key={title}>
            <h3>{title}</h3>
            <div>
              <p>{text}</p>
              <p className="tool-line">{tools}</p>
            </div>
            <SiteLink className="text-link" href={href}>
              {label}
            </SiteLink>
          </article>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="about-band" id="about" aria-labelledby="about-title">
      <div className="about section">
        <div className="about-intro">
          <p className="eyebrow">About</p>
          <h2 id="about-title">Bojan Golic</h2>
          <p>
            I came to web production through economics and software development.
            I’m drawn to sites with a lot of information to organize. The way
            content is structured shapes what people can find and how easily a
            team can keep it current.
          </p>
          <a className="text-link" href="/resume-en.html">
            View résumé
          </a>
        </div>
        <div className="about-detail">
          <section id="experience">
            <h3 className="eyebrow">Experience</h3>
            <p className="profile-role">Marketing Website Production Analyst</p>
            <p className="tool-line">
              National Association of Corporate Directors · 2023–present
            </p>
            <p>
              I build and maintain pages in Optimizely and work with marketing,
              design, and technical teams on publishing, SEO, accessibility, and
              quality assurance.
            </p>
          </section>
          <section id="process">
            <h3 className="eyebrow">Approach</h3>
            <p>
              I start with the visitor’s main task, build the content and
              components around it, then check the result with a keyboard and
              across screen sizes.
            </p>
          </section>
          <section>
            <h3 className="eyebrow">Education</h3>
            <ul>
              <li>
                Full Stack Web Development Certificate, George Washington
                University Boot Camp
              </li>
              <li>Software Developer, IT Academy Serbia</li>
              <li>
                Bachelor of Economics, University for Applied and Legal Sciences
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

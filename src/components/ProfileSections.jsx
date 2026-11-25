import { expertise } from "../data/profile";
import { useLocale } from "../i18n/context";
import SiteLink from "./SiteLink";

export function Expertise() {
  const { t } = useLocale();
  return (
    <section
      className="expertise section"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="section-heading">
        <h2 id="expertise-title">{t("Expertise")}</h2>
      </div>
      <div className="expertise-grid">
        {expertise.map(({ title, text, tools, links }) => (
          <article key={title}>
            <h3>{t(title)}</h3>
            <div>
              <p>{t(text)}</p>
              <p className="tool-line">{t(tools)}</p>
            </div>
            <ul className="expertise-links">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <SiteLink className="text-link" href={href}>
                    {t(label)}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const { t, path } = useLocale();
  return (
    <section className="about-band" id="about" aria-labelledby="about-title">
      <div className="about section">
        <div className="about-intro">
          <p className="eyebrow">{t("About")}</p>
          <h2 id="about-title">Bojan Golic</h2>
          <p>
            {t(
              "My background combines economics, software development, and web production. I like figuring out how things work and where they could work better. Building my own apps gives me a place to try those ideas.",
            )}
          </p>
          <a className="text-link" href={path("/resume-en.html")}>
            {t("View résumé")}
          </a>
        </div>
        <div className="about-detail">
          <section id="experience">
            <h3 className="eyebrow">{t("Experience")}</h3>
            <p className="profile-role">
              {t("Marketing Website Production Analyst")}
            </p>
            <p className="tool-line">
              {t("National Association of Corporate Directors · 2023–present")}
            </p>
            <p>
              {t(
                "At NACD, I coordinate site updates with marketing, design, and technical teams. I handle publishing in Optimizely and check the live pages after release.",
              )}
            </p>
          </section>
          <section id="process">
            <h3 className="eyebrow">{t("Approach")}</h3>
            <p>
              {t(
                "When I work on a site, I start with what people came to find or do. Then I check whether they can get there on a phone, on a larger screen, or with just a keyboard.",
              )}
            </p>
          </section>
          <section>
            <h3 className="eyebrow">{t("Education")}</h3>
            <ul>
              <li>
                {t(
                  "Full Stack Web Development Certificate, George Washington University Boot Camp",
                )}
              </li>
              <li>{t("Software Developer, IT Academy Serbia")}</li>
              <li>
                {t(
                  "Bachelor of Economics, University for Applied and Legal Sciences",
                )}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}

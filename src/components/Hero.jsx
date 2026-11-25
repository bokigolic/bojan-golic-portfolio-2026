import SiteLink from "./SiteLink";
import { useLocale } from "../i18n/context";

export default function Hero() {
  const { t } = useLocale();
  return (
    <section className="hero section" id="intro" aria-labelledby="hero-title">
      <h1 id="hero-title">
        <span>{t("Web production meets")}</span>{" "}
        <span>{t("frontend development.")}</span>
      </h1>
      <p className="hero-summary">
        {t(
          "I work on enterprise websites and build web applications of my own. From managing content in Optimizely to developing with React, I focus on making websites useful, reliable, and easy to navigate.",
        )}
      </p>
      <div className="hero-actions">
        <SiteLink className="button button-dark" href="/work">
          {t("Explore my work")}
        </SiteLink>
        <SiteLink className="text-link" href="#about">
          {t("About me")}
        </SiteLink>
      </div>
    </section>
  );
}

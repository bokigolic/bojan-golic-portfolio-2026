import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";
import WorkPage from "./components/WorkPage";
import ProjectCaseStudy from "./components/ProjectCaseStudy";
import ContactSection from "./components/ContactSection";
import CookieConsent from "./components/CookieConsent";
import SiteLink from "./components/SiteLink";
import CommandPalette from "./components/CommandPalette";
import { Expertise, About } from "./components/ProfileSections";
import { projects } from "./data/projects";
import { useLocation } from "./hooks/usePathname";
import useMetadata from "./hooks/useMetadata";
import { LocaleContext } from "./i18n/context";
import { english, localizeProject } from "./i18n/locale";
import { routeForPath } from "./i18n/routes";

const ContactModal = lazy(() => import("./components/ContactModal"));

export default function App({ initialPath = "/", locale = english }) {
  const { pathname, search, hash } = useLocation(initialPath);
  const route = routeForPath(pathname);
  const home = route === "/";
  const work = route === "/work";
  const slug = route.match(/^\/projects\/([^/]+)$/)?.[1];
  const collection = useMemo(
    () => projects.map((project) => localizeProject(project, locale)),
    [locale],
  );
  const project = slug ? collection.find((item) => item.slug === slug) : null;
  const known = home || work || Boolean(project);
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const { t, path } = locale;
  useMetadata(project, route, locale);

  return (
    <LocaleContext.Provider value={locale}>
      <a className="skip-link" href="#main-content">
        {t("Skip to content")}
      </a>
      <Header
        pathname={route}
        switchRoute={known ? route : "/"}
        suffix={known ? search + hash : ""}
      />
      <main id="main-content" tabIndex={-1}>
        {home ? (
          <>
            <Hero />
            <FeaturedProjects
              projects={collection.filter((item) => item.featured)}
              home
            />
            <Expertise />
            <About />
          </>
        ) : work ? (
          <WorkPage projects={collection} />
        ) : project ? (
          <ProjectCaseStudy project={project} projects={collection} />
        ) : (
          <section className="not-found section">
            <p className="eyebrow">{t("Error 404")}</p>
            <h1>{t("Page not found.")}</h1>
            <p>
              {t("Explore the project collection or return to the homepage.")}
            </p>
            <SiteLink className="button button-dark" href="/work">
              {t("Explore the projects")}
            </SiteLink>
          </section>
        )}
        <ContactSection onOpenContact={openContact} />
      </main>
      <footer className="site-footer section">
        <SiteLink className="brand" href="/#top">
          Bojan Golic
        </SiteLink>
        <nav aria-label={t("Footer")}>
          <a href={path("/resume-en.html")}>{t("Résumé")}</a>
          <a href="https://github.com/bokigolic">GitHub</a>
          {import.meta.env.VITE_GA_MEASUREMENT_ID && (
            <button
              onClick={(event) =>
                window.dispatchEvent(
                  new CustomEvent("cookie-preferences", {
                    detail: event.currentTarget,
                  }),
                )
              }
            >
              {t("Cookie preferences")}
            </button>
          )}
        </nav>
      </footer>
      <CookieConsent />
      <Suspense
        fallback={
          <div className="loading-notice" role="status">
            {t("Opening contact form…")}
          </div>
        }
      >
        {contactOpen && <ContactModal open onClose={closeContact} />}
      </Suspense>
      <CommandPalette onOpenContact={openContact} />
    </LocaleContext.Provider>
  );
}

import { lazy, Suspense, useCallback, useState } from "react";
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
import { projects, featuredProjects, getProjectBySlug } from "./data/projects";
import { usePathname } from "./hooks/usePathname";
import useMetadata from "./hooks/useMetadata";

const ContactModal = lazy(() => import("./components/ContactModal"));

export default function App({ initialPath = "/" }) {
  const pathname = usePathname(initialPath);
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const slug = pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const project = slug ? getProjectBySlug(slug) : null;
  const home = pathname === "/";
  const work = /^\/work\/?$/.test(pathname);
  useMetadata(project, pathname);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header pathname={pathname} />
      <main id="main-content" tabIndex={-1}>
        {home ? (
          <>
            <Hero />
            <FeaturedProjects projects={featuredProjects} home />
            <Expertise />
            <About />
          </>
        ) : work ? (
          <WorkPage />
        ) : project ? (
          <ProjectCaseStudy project={project} projects={projects} />
        ) : (
          <section className="not-found section">
            <p className="eyebrow">Error 404</p>
            <h1>Page not found.</h1>
            <p>Explore the project collection or return to the homepage.</p>
            <SiteLink className="button button-dark" href="/work">
              Explore the projects
            </SiteLink>
          </section>
        )}
        <ContactSection onOpenContact={openContact} />
      </main>
      <footer className="site-footer section">
        <SiteLink className="brand" href="/#top">
          Bojan Golic
        </SiteLink>
        <nav aria-label="Footer">
          <a href="/resume-en.html">Résumé</a>
          <a href="https://github.com/bokigolic">GitHub</a>
          {import.meta.env.VITE_GA_MEASUREMENT_ID && (
            <button
              onClick={() =>
                window.dispatchEvent(new Event("cookie-preferences"))
              }
            >
              Cookie preferences
            </button>
          )}
        </nav>
      </footer>
      <CookieConsent />
      <Suspense
        fallback={
          <div className="loading-notice" role="status">
            Opening contact form…
          </div>
        }
      >
        {contactOpen && <ContactModal open onClose={closeContact} />}
      </Suspense>
      <CommandPalette onOpenContact={openContact} />
    </>
  );
}

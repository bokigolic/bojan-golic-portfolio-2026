import { lazy, Suspense, useCallback, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HeroIllustration from "./components/HeroIllustration";
import FeaturedProjects from "./components/FeaturedProjects";
import ProjectCaseStudy from "./components/ProjectCaseStudy";
import ContactSection from "./components/ContactSection";
import CookieConsent from "./components/CookieConsent";
import SiteLink from "./components/SiteLink";
import CommandPalette from "./components/CommandPalette";
import {
  Expertise,
  Experience,
  Process,
  About,
} from "./components/ProfileSections";
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
  useMetadata(project, home ? "/" : pathname);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header pathname={pathname} onOpenContact={openContact} />
      <main id="main-content" tabIndex={-1}>
        {home ? (
          <>
            <Hero onOpenContact={openContact} />
            <HeroIllustration />
            <FeaturedProjects projects={featuredProjects} />
            <Expertise />
            <Experience />
            <Process />
            <About />
          </>
        ) : project ? (
          <ProjectCaseStudy project={project} projects={projects} />
        ) : (
          <section className="not-found section">
            <p className="eyebrow">404 / Page not found</p>
            <h1>
              A turn off
              <br />
              <em>the usual path.</em>
            </h1>
            <p>
              This page isn't part of the portfolio. Let's get you back to the
              work.
            </p>
            <SiteLink className="button button-dark" href="/#work">
              Explore the projects <span aria-hidden="true">&#8599;</span>
            </SiteLink>
          </section>
        )}
        <ContactSection onOpenContact={openContact} />
      </main>
      <footer className="site-footer section">
        <div>
          <SiteLink className="footer-signature" href="/#top">
            Bojan Golic<span aria-hidden="true">.</span>
          </SiteLink>
          <p>Web Developer &amp; Digital Experience Specialist</p>
        </div>
        <nav aria-label="Footer">
          <SiteLink href="/#work">Work</SiteLink>
          <SiteLink href="/#about">About</SiteLink>
          <a href="/resume-en.html" target="_blank" rel="noopener noreferrer">
            Resume &#8599;
          </a>
          <a
            href="https://github.com/bokigolic"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub &#8599;
          </a>
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
        <p className="footer-colophon">
          Designed &amp; built with care.{" "}
          <span>&copy; {new Date().getFullYear()}</span>
        </p>
      </footer>
      <CookieConsent />
      <Suspense
        fallback={
          contactOpen ? (
            <div className="loading-notice" role="status">
              Opening contact form...
            </div>
          ) : null
        }
      >
        {contactOpen && (
          <ContactModal key="contact" open onClose={closeContact} />
        )}
        <CommandPalette onOpenContact={openContact} />
      </Suspense>
    </>
  );
}

import { useState, useEffect } from "react";
import CookieConsent from "./components/CookieConsent";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import Services from "./components/Services";
import ContactModal from "./components/ContactModal";
import ContactSection from "./components/ContactSection";
import CommandPalette from "./components/CommandPalette";
import { getStoredLocale, setStoredLocale, t } from "./i18n/locale";
import { trackEvent } from "./utils/analytics";

const projects = [
  {
    id: "01",
    eyebrow: "Enterprise CMS · Migration support",
    title: "Content migration & remediation",
    summary:
      "Supported migration initiatives involving hundreds of pages, mapping legacy content into reusable CMS structures while protecting accuracy, metadata, URLs, and search visibility.",
    result: "Hundreds",
    resultLabel: "of pages supported through migration work",
    tags: ["CMS migration", "SEO", "Content modeling", "QA"],
    details: [
      "Inventory and prepare legacy content for migration",
      "Map content into reusable templates and components",
      "Clean markup and standardize metadata and assets",
      "Review migrated pages, redirects, URLs, and SEO signals",
    ],
  },
  {
    id: "02",
    eyebrow: "Website publishing · Release lifecycle",
    title: "Enterprise website publishing",
    summary:
      "Day-to-day production across landing pages, events, profiles, campaigns, forms, media, and time-sensitive releases for a large enterprise web environment.",
    result: "End-to-end",
    resultLabel: "publishing lifecycle ownership",
    tags: ["Publishing", "Scheduling", "Stakeholders", "Release QA"],
    details: [
      "Page and component authoring for enterprise publishing workflows",
      "Review, scheduling, and publication of content",
      "Coordination with cross-functional stakeholders",
      "Verification and resolution of post-publish issues",
    ],
  },
  {
    id: "03",
    eyebrow: "Platform health · Ongoing maintenance",
    title: "Website quality & maintenance",
    summary:
      "Supported web quality across a 3,000+ page enterprise platform, addressing accessibility, links, assets, metadata, search visibility, content accuracy, and component markup.",
    result: "3,000+",
    resultLabel: "pages across an enterprise website supported",
    tags: ["Siteimprove", "WCAG", "Performance", "Governance"],
    details: [
      "Image resizing and performance optimization",
      "Broken-link, duplicate, and outdated-content cleanup",
      "Accessibility, SEO, and metadata review",
      "HTML, component, form, and layout remediation",
    ],
  },
  {
    id: "04",
    eyebrow: "Web production · Intake & delivery",
    title: "From request to verified release",
    summary:
      "Coordinating website requests from clarification and prioritization through production, stakeholder review, QA, publishing, and follow-up.",
    result: "One flow",
    resultLabel: "from request to verified release",
    tags: ["Intake", "Triage", "Project coordination", "Governance"],
    details: [
      "Review and clarify incoming requests",
      "Assess scope, dependencies, risks, and deadlines",
      "Plan tasks and communicate with stakeholders",
      "Track delivery, documentation, and improve processes",
    ],
  },
];

const workflow = [
  ["01", "Intake", "Clarify scope and deadline."],
  ["02", "Build", "Create with reusable CMS components."],
  [
    "03",
    "Quality check",
    "Review content, accessibility and responsive behavior.",
  ],
  ["04", "Publish", "Coordinate approval and verify release."],
];

const toolkit = [
  ["CMS", "Optimizely CMS v11/v12, WordPress, Elementor, Optimizely CMP"],
  [
    "Front-end",
    "HTML, CSS, JavaScript, responsive implementation, foundational React",
  ],
  [
    "Web quality",
    "Content QA, WCAG principles, SEO, Siteimprove, Search Console",
  ],
  ["Production tools", "Jira, Figma, Canva, Photoshop, spreadsheets"],
];

const experience = [
  [
    "2023 — Present",
    "Marketing Website Production Analyst / Web Producer",
    "Enterprise web team",
    "Enterprise CMS production, migration, publishing, QA, project coordination, governance, and web quality across a 3,000+ page platform.",
  ],
  [
    "2021 — 2023",
    "Front-End Web Developer",
    "Independent client work",
    "Responsive, SEO-friendly WordPress and Elementor sites—from build and testing through launch and maintenance.",
  ],
  [
    "2015 — 2021",
    "Founder / Web Developer",
    "Web development studio",
    "Founded and ran a web studio delivering client websites, coordinating requirements, timelines, assets, production, and delivery.",
  ],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [locale, setLocale] = useState(getStoredLocale());
  useEffect(() => {
    return () => {
      try {
        document.body.classList.remove("no-scroll");
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    try {
      setStoredLocale(locale);
    } catch (e) {}
  }, [locale]);
  return (
    <main id="top" role="main">
      <CookieConsent />
      <CommandPalette onOpenContact={() => setContactOpen(true)} />
      <a className="skip-link" href="#work">
        Skip to content
      </a>
      <Header />

      <Hero
        onPrimaryClick={() => {
          document
            .getElementById("work")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        onSecondaryClick={() => {
          document
            .getElementById("capabilities")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <Services />

      <section className="work-modern section" id="work">
        <div className="section-head">
          <div>
            <p className="section-kicker">02 / Work in practice</p>
            <h2>
              Selected web
              <br />
              <em>production work.</em>
            </h2>
          </div>
          <p>
            Anonymized examples of enterprise website production, migration
            support, publishing, and quality assurance. Company and project
            details are withheld where work is confidential.
          </p>
        </div>

        <div className="case-grid">
          {projects.map((project, i) => (
            <ProjectCard project={project} key={project.id} index={i} />
          ))}
        </div>
      </section>

      <section className="ownership section" id="capabilities">
        <div className="section-head">
          <div>
            <p className="section-kicker">03 / What I own</p>
            <h2>
              End-to-end
              <br />
              <em>website delivery.</em>
            </h2>
          </div>
          <p>
            I take websites from content and CMS setup through front-end
            production, testing, launch, and ongoing improvement.
          </p>
        </div>
        <div className="responsibility-grid">
          <article>
            <span>01 / STRUCTURE</span>
            <h3>Reusable CMS pages</h3>
            <p>
              Build and maintain templates, components, and content models in
              Optimizely and WordPress.
            </p>
          </article>
          <article>
            <span>02 / DELIVERY</span>
            <h3>Publishing that holds up</h3>
            <p>
              Coordinate intake, reviews, schedules, releases, and post-publish
              checks with stakeholders.
            </p>
          </article>
          <article>
            <span>03 / QUALITY</span>
            <h3>Details before launch</h3>
            <p>
              Check responsive behavior, accessibility, metadata, links, forms,
              content, and assets.
            </p>
          </article>
          <article>
            <span>04 / FRONT-END</span>
            <h3>Practical implementation</h3>
            <p>
              Use HTML, CSS, and JavaScript to support page structure, CMS
              components, and responsive layouts.
            </p>
          </article>
        </div>
      </section>

      <section className="process section" id="process">
        <div className="section-head process-head">
          <div>
            <p className="section-kicker">04 / Delivery method</p>
            <h2>
              From brief
              <br />
              to <em>live page.</em>
            </h2>
          </div>
          <p>
            A practical sequence: clarify the request, build in the CMS, check
            the details, and verify the published page.
          </p>
        </div>
        <div className="workflow" aria-label="Website production workflow">
          {workflow.map(([num, title, text], index) => (
            <article key={title}>
              <div className="node">
                <span>{num}</span>
                {index < workflow.length - 1 && <i />}
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="toolkit-modern section" id="toolkit">
        <div className="section-head">
          <div>
            <p className="section-kicker">05 / Toolkit</p>
            <h2>
              Tools for
              <br />
              <em>the work.</em>
            </h2>
          </div>
          <p>
            Platforms and technologies used in enterprise production and
            independent client website work.
          </p>
        </div>
        <div className="tool-grid">
          {toolkit.map(([label, items], index) => (
            <article key={label}>
              <span>0{index + 1}</span>
              <h3>{label}</h3>
              <p>{items}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-modern section" id="experience">
        <div className="section-head">
          <div>
            <p className="section-kicker">06 / Experience</p>
            <h2>
              Web production.
              <br />
              <em>Enterprise scale.</em>
            </h2>
          </div>
          <p>
            More than a decade in web-related roles, including 4+ years focused
            on enterprise web production, CMS publishing, migration, and QA.
          </p>
        </div>
        <div className="experience-list">
          {experience.map(([years, role, company, text]) => (
            <article key={role}>
              <p className="years">{years}</p>
              <div>
                <h3>{role}</h3>
                <p className="company-name">{company}</p>
              </div>
              <p className="experience-copy">{text}</p>
            </article>
          ))}
        </div>
        <div className="education-band">
          <p>Education</p>
          <div>
            <span>Full Stack Web Development Certificate</span>
            <small>George Washington University Boot Camp</small>
          </div>
          <div>
            <span>Software Developer</span>
            <small>IT Academy Serbia</small>
          </div>
          <div>
            <span>Bachelor of Economics</span>
            <small>University for Applied and Legal Sciences</small>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <h2 className="footer-hero reveal reveal--delay-2">
              HAVE A WEB
              <br />
              PROJECT IN MIND?
            </h2>
            <p className="footer-lead reveal reveal--delay-3">
              Let’s talk about your website, CMS or production workflow.
            </p>

            <div className="footer-ctas reveal reveal--delay-4">
              <button
                className="button primary"
                onClick={() => {
                  trackEvent("contact_click");
                  setContactOpen(true);
                }}
                aria-label="Get in touch"
              >
                Get in touch <span className="cta-arrow">→</span>
              </button>
              <a
                className="button ghost"
                href="/resume-en.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("resume_download")}
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="footer-right">
            <nav
              className="footer-nav reveal reveal--delay-5"
              aria-label="Footer navigation"
            >
              <a href="#work">Work</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#process">Process</a>
              <a href="#toolkit">Toolkit</a>
              <a href="#experience">Experience</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="footer-social reveal reveal--delay-6">
              <a
                href="https://www.linkedin.com/in/bojan-golic"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("linkedin_click")}
              >
                LinkedIn
              </a>
              <button
                type="button"
                className="link"
                onClick={() => {
                  trackEvent("contact_click");
                  setContactOpen(true);
                }}
              >
                Email
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom reveal reveal--delay-7">
          <div className="footer-wordmark">BOJAN GOLIC</div>
          <div className="footer-meta">
            <div>Web Producer &amp; Front-End Developer</div>
            <div>© {new Date().getFullYear()} Bojan Golic</div>
            <small>
              {t(locale, "footer.designed") ||
                "Designed & built by Bojan Golic"}
            </small>
          </div>
        </div>

        <ContactSection onOpenContact={() => setContactOpen(true)} />

        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </footer>
    </main>
  );
}

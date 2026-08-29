import { useState, useEffect } from "react";
import CookieConsent from "./components/CookieConsent";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import ContactModal from "./components/ContactModal";
import LanguageSelector from "./components/LanguageSelector";
import ThemeToggle from "./components/ThemeToggle";
import { getStoredLocale, setStoredLocale, t } from "./i18n/locale";

const projects = [
  {
    id: "01",
    eyebrow: "Enterprise CMS · Content migration",
    title: "Large-scale content migration",
    summary:
      "A structured migration and production program covering page templates, reusable components, metadata, imagery, redirects, content cleanup, and responsive QA.",
    result: "100+ pages",
    resultLabel: "pages standardized and migrated",
    tags: ["CMS migration", "SEO", "Content modeling", "QA"],
    details: [
      "Content inventory and migration planning",
      "Reusable page and component structure",
      "Metadata, redirects, imagery, and URL review",
      "Cross-device QA and stakeholder approval",
    ],
  },
  {
    id: "02",
    eyebrow: "Web operations · Publishing lifecycle",
    title: "Continuous website publishing",
    summary:
      "High-volume production across landing pages, events, profiles, campaigns, forms, media, scheduled updates, and time-sensitive releases.",
    result: "End-to-end",
    resultLabel: "publishing lifecycle ownership",
    tags: ["Publishing", "Scheduling", "Stakeholders", "Release QA"],
    details: [
      "Page production and component authoring",
      "Review, scheduling, and publication",
      "Cross-functional stakeholder coordination",
      "Post-publish verification and issue resolution",
    ],
  },
  {
    id: "03",
    eyebrow: "Platform health · Ongoing maintenance",
    title: "Website quality & maintenance",
    summary:
      "Ongoing platform care across accessibility, performance, links, duplicate assets, metadata, search visibility, content accuracy, and component markup.",
    result: "3,000+",
    resultLabel: "page enterprise platform supported",
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
    eyebrow: "Project delivery · Intake & triage",
    title: "Web request operations",
    summary:
      "Turning incoming requests into clear, prioritized work—from requirements and scope through assignment, production, testing, approval, and delivery.",
    result: "One flow",
    resultLabel: "from request to verified release",
    tags: ["Intake", "Triage", "Project coordination", "Governance"],
    details: [
      "Request review, clarification, and prioritization",
      "Scope, dependencies, risk, and deadline assessment",
      "Task planning and stakeholder communication",
      "Delivery tracking, documentation, and process improvement",
    ],
  },
];

const responsibilities = [
  [
    "CMS Production",
    "Build and maintain pages with reusable components and structured content.",
  ],
  [
    "Content Migration",
    "Move, map, clean, and validate content across templates and platforms.",
  ],
  [
    "Intake & Triage",
    "Clarify requests, assess urgency, dependencies, scope, and next steps.",
  ],
  [
    "Project Coordination",
    "Own timelines, handoffs, reviews, approvals, and delivery visibility.",
  ],
  [
    "QA & Testing",
    "Test content, layouts, links, forms, metadata, devices, and browsers.",
  ],
  [
    "Publishing",
    "Manage scheduling, approvals, releases, and post-publish verification.",
  ],
  [
    "Website Maintenance",
    "Resolve outdated content, broken links, formatting, and platform issues.",
  ],
  [
    "SEO",
    "Maintain titles, descriptions, URLs, indexation signals, and search readiness.",
  ],
  [
    "Accessibility",
    "Apply WCAG-minded structure, alt text, headings, labels, and content patterns.",
  ],
  [
    "Asset Optimization",
    "Resize, compress, organize, name, and deduplicate digital assets.",
  ],
  [
    "Content Governance",
    "Promote standards, reusable patterns, documentation, and consistency.",
  ],
  [
    "Process Improvement",
    "Reduce friction through clearer workflows, templates, and automation.",
  ],
];

const workflow = [
  ["01", "Intake", "Clarify the request, audience, inputs, and deadline."],
  [
    "02",
    "Build",
    "Create the page with reusable CMS components and clean markup.",
  ],
  [
    "03",
    "QA",
    "Verify content, links, metadata, imagery, accessibility, and responsive behavior.",
  ],
  [
    "04",
    "Publish",
    "Coordinate approval, scheduling, release, and final verification.",
  ],
  [
    "05",
    "Improve",
    "Track issues, remediate content, and make the next release smoother.",
  ],
];

const toolkit = [
  ["CMS", "Optimizely CMS v11/v12, WordPress, Elementor, Optimizely CMP"],
  ["Front end", "HTML, CSS, JavaScript, React (Basic), Responsive Design"],
  ["Quality", "SEO, WCAG Accessibility, Siteimprove, Google Search Console"],
  ["Creative & ops", "Figma, Canva, Adobe Photoshop, Jira, Excel"],
];

const experience = [
  [
    "2023 — Present",
    "Marketing Website Production Analyst / Web Producer",
    "Enterprise organization (confidential)",
    "Enterprise CMS production, migration, publishing, QA, project coordination, governance, and web quality across a 3,000+ page platform.",
  ],
  [
    "2021 — 2023",
    "Front-End Web Developer",
    "Freelance",
    "Responsive, SEO-friendly WordPress and Elementor sites—from build and testing through launch and maintenance.",
  ],
  [
    "2015 — 2021",
    "Founder / Web Developer",
    "Private studio",
    "Client web development and digital content projects with end-to-end ownership of requirements, timelines, assets, and delivery.",
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
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [locale, setLocale] = useState(getStoredLocale());
  useEffect(() => {
    // lock body scroll when mobile nav is open
    try {
      document.body.classList.toggle("no-scroll", navOpen);
    } catch (e) {}
    return () => {
      try {
        document.body.classList.remove("no-scroll");
      } catch (e) {}
    };
  }, [navOpen]);

  useEffect(() => {
    try {
      setStoredLocale(locale);
    } catch (e) {}
  }, [locale]);
  return (
    <main id="top" role="main">
      <CookieConsent />
      <a className="skip-link" href="#work">
        Skip to content
      </a>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Home">
          <span>BG</span>
          <i />
        </a>
        <div className="header-controls">
          <LanguageSelector onChange={(l) => setLocale(l)} />
          <ThemeToggle />
        </div>
        {/* nav-toggle removed to avoid hamburger overlap on small screens */}
        <nav
          id="main-navigation"
          className={navOpen ? "main-nav open" : "main-nav"}
          aria-label="Main navigation"
          aria-hidden={!navOpen}
        >
          <a href="#work" onClick={() => setNavOpen(false)}>
            {t(locale, "nav.work") || "Work"}
          </a>
          <a href="#services" onClick={() => setNavOpen(false)}>
            {t(locale, "nav.services") || "Services"}
          </a>
          <a href="#process" onClick={() => setNavOpen(false)}>
            {t(locale, "nav.process") || "Process"}
          </a>
          <a href="#experience" onClick={() => setNavOpen(false)}>
            {t(locale, "nav.experience") || "Experience"}
          </a>
          <a href="#work" onClick={() => setNavOpen(false)}>
            {t(locale, "nav.contact") || "Contact"}
          </a>
        </nav>
      </header>

      <Hero
        onPrimaryClick={() => {
          document
            .getElementById("work")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        leadText={t(locale, "hero.lead")}
        primaryLabel={t(locale, "hero.explore")}
        secondaryLabel={t(locale, "hero.contact")}
      />

      <section className="logo-strip" aria-label="Core strengths">
        <span>Enterprise CMS</span>
        <i />
        <span>Content Migration</span>
        <i />
        <span>Web Operations</span>
        <i />
        <span>QA & Testing</span>
        <i />
        <span>Accessibility</span>
        <i />
        <span>Project Delivery</span>
      </section>

      <section className="services section" id="services">
        <div className="section-head">
          <div>
            <p className="section-kicker">02A / Services</p>
            <h2>
              Practical
              <br />
              <em>services I offer.</em>
            </h2>
          </div>
          <p>
            Anonymized summary of professional offerings tailored for clients
            and recruiters—focused on enterprise-ready delivery, ongoing
            operations, and measurable quality.
          </p>
        </div>
        <div className="services-grid">
          <article>
            <h3>Enterprise CMS Production</h3>
            <p>
              Page builds, reusable components, templates, content modeling, and
              production-ready authoring patterns.
            </p>
            <ul>
              <li>Component-based templates and content fragments</li>
              <li>Authoring patterns and editor training</li>
              <li>Release-ready builds with staging verifications</li>
            </ul>
          </article>
          <article>
            <h3>Content Migration & Remediation</h3>
            <p>
              Inventory, mapping, redirects, metadata standardization, and mass
              content cleanup for large platforms.
            </p>
            <ul>
              <li>Content audits and inventory exports</li>
              <li>URL & redirect strategy with SEO preservation</li>
              <li>Automated hygiene scripts and manual verification</li>
            </ul>
          </article>
          <article>
            <h3>Publishing Operations</h3>
            <p>
              Scheduling, approvals, release coordination, and post-publish
              verification to keep sites accurate and timely.
            </p>
            <ul>
              <li>Editorial workflows and scheduled publishing</li>
              <li>Rollback & emergency procedures</li>
              <li>Publish checklists and stakeholder notifications</li>
            </ul>
          </article>
          <article>
            <h3>QA, Accessibility & Performance</h3>
            <p>
              Accessibility audits (WCAG), link and asset QA, and performance
              tuning for faster, more accessible experiences.
            </p>
            <ul>
              <li>WCAG audits and remediation plans</li>
              <li>Automated and manual cross-device testing</li>
              <li>Image, font and asset optimization</li>
            </ul>
          </article>
          <article>
            <h3>Project Intake & Coordination</h3>
            <p>
              Request triage, scoping, stakeholder communication, and delivery
              tracking for reliable releases.
            </p>
            <ul>
              <li>Clear intake forms and prioritization criteria</li>
              <li>Kickoffs, milestones, and stakeholder sign-offs</li>
              <li>Transparent delivery tracking and documentation</li>
            </ul>
          </article>
          <article>
            <h3>Front-end Support & Tooling</h3>
            <p>
              HTML/CSS/JS support, lightweight React work, and integration
              support for CMS templates and components.
            </p>
            <ul>
              <li>Component markup and style guidance</li>
              <li>Build tooling and asset pipelines</li>
              <li>Integration and deployment support</li>
            </ul>
          </article>
        </div>
        <div className="services-cta">
          <p>
            Available for contract, freelance, and permanent roles—open to
            discussions that focus on delivery, quality, and long-term
            maintainability.
          </p>
          <a className="button primary" href="#work">
            Explore services
          </a>
        </div>
      </section>

      <section className="work-modern section" id="work">
        <div className="section-head">
          <div>
            <p className="section-kicker">01 / Selected work</p>
            <h2>
              Proof in the
              <br />
              <em>production.</em>
            </h2>
          </div>
          <p>
            Representative case studies showing how I structure, deliver,
            maintain, and improve digital work—not just which platforms I use.
          </p>
        </div>

        <div className="case-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <section className="ownership section">
        <div className="section-head">
          <div>
            <p className="section-kicker">02 / What I own</p>
            <h2>
              Full-spectrum
              <br />
              <em>web operations.</em>
            </h2>
          </div>
          <p>
            My role sits between technology, content, design, and
            delivery—covering the work required to keep an enterprise website
            accurate, accessible, performant, and moving forward.
          </p>
        </div>
        <div className="responsibility-grid">
          {responsibilities.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="process section" id="process">
        <div className="section-head process-head">
          <div>
            <p className="section-kicker">03 / How I work</p>
            <h2>
              From request
              <br />
              to <em>reliable release.</em>
            </h2>
          </div>
          <p>
            A clear production workflow keeps complex work moving while
            protecting quality, communication, and accountability at every
            handoff.
          </p>
        </div>
        <div className="workflow" aria-label="Web production workflow">
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
        <div className="capability-map">
          <div className="map-copy">
            <p className="section-kicker">Connected capabilities</p>
            <h3>
              One producer.
              <br />
              Multiple perspectives.
            </h3>
            <p>
              I work at the intersection of content accuracy, system structure,
              visual quality, and business deadlines.
            </p>
          </div>
          <div
            className="map-visual"
            role="img"
            aria-label="Capability map connecting CMS production with quality assurance, content operations, front-end support, and optimization"
          >
            <div className="map-core">
              CMS
              <br />
              <strong>Production</strong>
            </div>
            <span className="map-item item-one">Quality assurance</span>
            <span className="map-item item-two">Content operations</span>
            <span className="map-item item-three">Front-end support</span>
            <span className="map-item item-four">Optimization</span>
            <svg viewBox="0 0 600 400" aria-hidden="true">
              <path d="M300 200L125 80M300 200L485 88M300 200L120 320M300 200L486 315" />
            </svg>
          </div>
        </div>
      </section>

      <section className="toolkit-modern section">
        <div className="section-head">
          <div>
            <p className="section-kicker">04 / Toolkit</p>
            <h2>
              Built to work
              <br />
              <em>across the stack.</em>
            </h2>
          </div>
          <p>
            Hands-on production skills supported by the tools needed to scope,
            build, review, test, optimize, publish, and maintain.
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
            <p className="section-kicker">05 / Experience</p>
            <h2>
              Independent roots.
              <br />
              <em>Enterprise scale.</em>
            </h2>
          </div>
          <p>
            A progression from owning complete client builds to supporting
            complex publishing systems, platform operations, and
            cross-functional teams.
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
            <span>Full Stack Web Developer</span>
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

      <footer id="contact">
        <div className="footer-top">
          <p>
            Have a website that needs
            <br />a steady production partner?
          </p>

          {/* Hidden Netlify form for static detection (kept for Netlify deployments) */}
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            style={{ display: "none" }}
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" value="" />
          </form>
        </div>
        <div className="footer-meta footer-top-grid">
          <div className="footer-about">
            <h3>Digital Experience &amp; Web Producer</h3>
            <p>Available for contract and freelance work — reach out via the site.</p>
          </div>
          <div className="footer-actions">
            <a className="button ghost" href="/resume-en.html" target="_blank" rel="noopener noreferrer">
              Download anonymized CV (EN)
            </a>
            <a className="back-top" href="#top">Back to top ↑</a>
          </div>
        </div>
        <div className="footer-bottom">
          <small>{t(locale, "footer.designed") || "Designed & built"}</small>
        </div>
        <ContactModal
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </footer>
    </main>
  );
}

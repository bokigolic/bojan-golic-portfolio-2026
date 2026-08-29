import ServiceCard from "./ServiceCard";

const SERVICES = [
  {
    id: "svc-01",
    number: "01",
    title: "Enterprise CMS Production",
    short:
      "Structured page production, reusable components, templates, and production workflows.",
    pill: "CMS / Components / Production",
    summary:
      "Enterprise-scale page production using structured CMS architecture, reusable components, templates, and content models.",
    capabilities: [
      "Page creation and maintenance",
      "Reusable components & templates",
      "Editorial authoring patterns",
      "Forms & component configuration",
    ],
    proof:
      "Thousands of pages, components, and updates produced or maintained.",
    tools: ["Optimizely v11/v12", "WordPress", "HTML", "CSS", "JS"],
  },
  {
    id: "svc-02",
    number: "02",
    title: "Content Migration & Remediation",
    short:
      "Large-scale migration, URL protection, metadata standardization, and QA.",
    pill: "Inventory / Redirects / QA",
    summary:
      "Structured migration of large content libraries while protecting URLs, search visibility, content quality, assets, and user experience.",
    capabilities: [
      "Content inventory & mapping",
      "Template & component conversion",
      "Redirect planning & URL governance",
      "Post-migration QA",
    ],
    proof: "2,000+ pages migrated or supported through migration initiatives.",
    tools: ["CSV mapping", "Scripts", "Search Console", "Manual QA"],
  },
  {
    id: "svc-03",
    number: "03",
    title: "Publishing Operations",
    short:
      "High-volume publishing, scheduling, approvals, and release verification.",
    pill: "Scheduling / Releases",
    summary:
      "End-to-end publishing operations for high-volume, deadline-driven enterprise web environments.",
    capabilities: [
      "Landing pages",
      "Scheduled publishing",
      "Approval coordination",
      "Post-publish verification",
    ],
    proof: "End-to-end publishing lifecycle ownership.",
    tools: ["CMS scheduling", "Calendars", "Checklists"],
  },
  {
    id: "svc-04",
    number: "04",
    title: "QA, Accessibility & SEO",
    short:
      "Production-quality QA across accessibility, search, metadata, and performance.",
    pill: "Search + Quality + Accessibility",
    summary:
      "Production quality across content, search, accessibility, responsive behavior, performance, metadata, assets, and technical page structure.",
    capabilities: [
      "SEO title & meta review",
      "WCAG-minded production",
      "Broken-link remediation",
      "Performance checks",
    ],
    proof: "Deep hands-on production SEO and accessibility remediation.",
    tools: ["Siteimprove", "GSC", "Lighthouse"],
  },
  {
    id: "svc-05",
    number: "05",
    title: "Project Intake & Delivery",
    short:
      "Triage, scope, prioritization, and delivery tracking for reliable releases.",
    pill: "Intake / Triage / Delivery",
    summary:
      "Turning incoming digital requests into scoped, prioritized, trackable production work.",
    capabilities: [
      "Request intake",
      "Triage & prioritization",
      "Stakeholder communication",
      "Delivery tracking",
    ],
    proof: "Process-driven request-to-release ownership.",
    tools: ["Jira", "Docs", "Spreadsheets"],
  },
  {
    id: "svc-06",
    number: "06",
    title: "Front-end & Platform Support",
    short:
      "HTML/CSS/JS support, responsive layouts, and CMS template integration.",
    pill: "HTML / CSS / JS",
    summary:
      "Front-end production support for CMS-driven experiences, responsive layouts, reusable patterns, and content-heavy digital platforms.",
    capabilities: [
      "Component markup",
      "Responsive layout",
      "Accessibility-conscious structure",
      "Build/deploy support",
    ],
    proof: "Ongoing front-end and platform maintenance support.",
    tools: ["Git", "Netlify", "Build tools"],
  },
];

export default function Services() {
  return (
    <section className="services section" id="services" aria-label="Services">
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
          Enterprise-ready web production support across CMS operations,
          migrations, publishing, quality, optimization, and delivery.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} data={s} />
        ))}
      </div>
    </section>
  );
}

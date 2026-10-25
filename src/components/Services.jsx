import { useEffect, useRef, useState } from "react";
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
      "Builds and maintains structured pages, reusable components, and content patterns in enterprise CMS platforms.",
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
    proof:
      "Supported migration and remediation work involving hundreds of pages.",
    tools: ["CSV mapping", "Scripts", "Search Console", "Manual QA"],
  },
  {
    id: "svc-03",
    number: "03",
    title: "Publishing Operations",
    short:
      "Enterprise publishing, scheduling, approvals, and release verification.",
    pill: "Scheduling / Releases",
    summary:
      "Publishing operations for deadline-driven enterprise websites, from request intake through scheduling and post-publish verification.",
    capabilities: [
      "Landing pages",
      "Scheduled publishing",
      "Approval coordination",
      "Post-publish verification",
    ],
    proof:
      "Coordinates reviews, approvals, scheduled releases, and post-publish checks.",
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
    proof:
      "Checks accessibility, metadata, links, responsive layouts, and content quality before release.",
    tools: ["Siteimprove", "Google Search Console", "Google Analytics"],
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
    title: "Front-End Website Development",
    short: "Responsive front ends, clean markup, and seamless CMS integration.",
    pill: "HTML / CSS / JS",
    summary:
      "Front-end implementation for responsive websites, reusable page patterns, and CMS-driven content.",
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
  const [activeService, setActiveService] = useState(null);
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const detailsId = "service-details-dialog";
  const isDialogOpen = Boolean(activeService);

  useEffect(() => {
    if (!isDialogOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDialogOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    function handleDialogKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDetails();
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    dialog.addEventListener("keydown", handleDialogKeyDown);
    return () => dialog.removeEventListener("keydown", handleDialogKeyDown);
  }, [activeService]);

  const activeData = SERVICES.find((service) => service.id === activeService);

  function closeDetails() {
    setActiveService(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <section className="services section" id="services" aria-label="Services">
      <div className="section-head">
        <div>
          <p className="section-kicker">01 / Web services</p>
          <h2>
            Website work
            <br />
            <em>I do best.</em>
          </h2>
        </div>
        <p>
          My strongest work is enterprise website production: structured CMS
          pages, migration support, publishing, QA, and responsive front-end
          implementation.
        </p>
      </div>

      <div className="services-grid">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            data={service}
            open={activeService === service.id}
            detailsId={detailsId}
            onToggle={(trigger) => {
              if (activeService === service.id) {
                closeDetails();
                return;
              }
              triggerRef.current = trigger;
              setActiveService(service.id);
            }}
          />
        ))}
      </div>

      {activeData && (
        <div className="service-detail-backdrop" onMouseDown={closeDetails}>
          <section
            ref={dialogRef}
            id={detailsId}
            className="service-detail-panel is-open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-dialog-title"
            tabIndex={-1}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {activeData && (
              <>
                <div className="service-detail-heading">
                  <div>
                    <p className="section-kicker">Service details</p>
                    <h3 id="service-dialog-title">{activeData.title}</h3>
                  </div>
                  <button
                    ref={closeButtonRef}
                    className="service-detail-close"
                    type="button"
                    onClick={closeDetails}
                    aria-label="Close service details"
                  >
                    Close <span aria-hidden="true">×</span>
                  </button>
                </div>
                <p className="service-detail-summary">{activeData.summary}</p>
                <div className="service-detail-content">
                  <div>
                    <h4>What I handle</h4>
                    <ul>
                      {activeData.capabilities.map((capability) => (
                        <li key={capability}>{capability}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Relevant experience</h4>
                    <p>{activeData.proof}</p>
                    <p className="service-detail-tools">
                      {activeData.tools.join(" · ")}
                    </p>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </section>
  );
}

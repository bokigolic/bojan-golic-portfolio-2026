import { useRef, useState } from "react";
import { featuredProjects } from "../data/projects";
import ProjectMedia from "./ProjectMedia";
import ProjectActions from "./ProjectActions";

export default function HeroIllustration() {
  const [active, setActive] = useState(0);
  const [device, setDevice] = useState("desktop");
  const tabRefs = useRef([]);
  const project = featuredProjects[active];
  function move(event, index) {
    let next;
    if (event.key === "ArrowRight")
      next = (index + 1) % featuredProjects.length;
    else if (event.key === "ArrowLeft")
      next = (index + featuredProjects.length - 1) % featuredProjects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = featuredProjects.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }
  return (
    <section
      className="workbench section"
      id="workbench"
      aria-labelledby="workbench-heading"
    >
      <div className="workbench-top">
        <div>
          <h2 id="workbench-heading">Inspect the work across screens.</h2>
          <p>
            Choose a project. Switch the viewport. Explore the real interface.
          </p>
        </div>
        <span>INTERACTIVE SCREENSHOT WORKBENCH</span>
      </div>
      <div className="workbench-shell">
        <div className="workbench-controls">
          <div
            className="project-tabs"
            role="tablist"
            aria-label="Choose a project"
          >
            {featuredProjects.map((p, i) => (
              <button
                key={p.slug}
                id={`tab-${p.slug}`}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                role="tab"
                aria-selected={active === i}
                aria-controls="workbench-panel"
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(event) => move(event, i)}
                onClick={() => setActive(i)}
              >
                {String(i + 1).padStart(2, "0")}{" "}
                <span>
                  {p.slug === "english-learning"
                    ? "Be Fluent"
                    : p.slug === "bokigym"
                      ? "BokiGym"
                      : p.name}
                </span>
              </button>
            ))}
          </div>
          <div
            className="device-controls"
            role="group"
            aria-label="Screenshot viewport"
          >
            {["desktop", "mobile"].map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={device === d}
                onClick={() => setDevice(d)}
              >
                {d === "desktop" ? "Desktop" : "Mobile"}
              </button>
            ))}
          </div>
        </div>
        <div
          id="workbench-panel"
          role="tabpanel"
          aria-labelledby={`tab-${project.slug}`}
          tabIndex={0}
          className={`workbench-panel theme-${project.tone}`}
        >
          <div className="workbench-info" key={project.slug}>
            <p className="eyebrow">
              {device} capture / {project.group}
            </p>
            <h3>{project.name}</h3>
            <p>{project.previewFocus}</p>
            <p className="workbench-caption">
              Static screenshot. Open the live demo to interact with the
              product.
            </p>
            <ProjectActions project={project} details />
          </div>
          <div className={`workbench-preview preview-${device}`}>
            <ProjectMedia
              key={`${project.slug}-${device}`}
              project={project}
              device={device}
              priority={active === 0}
              sizes="(max-width: 640px) calc(100vw - 80px), 390px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

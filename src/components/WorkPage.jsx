import { useState } from "react";
import {
  projects,
  featuredProjects,
  additionalProjects,
} from "../data/projects";
import FeaturedProjects from "./FeaturedProjects";

const categories = [
  "All work",
  ...new Set(projects.map((project) => project.group)),
];

export default function WorkPage() {
  const [category, setCategory] = useState("All work");
  const matches = (project) =>
    category === "All work" || project.group === category;
  const featured = featuredProjects.filter(matches);
  const additional = additionalProjects.filter(matches);
  const count = featured.length + additional.length;
  return (
    <div className="work-page">
      <header className="work-intro section">
        <p className="eyebrow">Independent projects / Selected case studies</p>
        <div className="work-intro-layout">
          <h1>
            Selected <em>Work</em>
          </h1>
          <p>
            Real websites and interactive web applications, built around local
            discovery, fitness, learning, and everyday business needs. Explore
            the interfaces and the implementation behind each project.
          </p>
        </div>
        <div className="work-intro-note">
          <span>Three featured projects. Four further explorations.</span>
          <span>Source, interface, and context.</span>
        </div>
      </header>
      <section
        className="work-filters section"
        id="project-filters"
        aria-labelledby="filter-heading"
      >
        <h2 id="filter-heading" className="filter-heading">
          Explore by category
        </h2>
        <div
          className="category-filters"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((label) => (
            <button
              key={label}
              type="button"
              aria-pressed={category === label}
              aria-controls="project-collection"
              onClick={() => setCategory(label)}
            >
              {label}{" "}
              <span aria-hidden="true">
                {label === "All work"
                  ? projects.length
                  : projects.filter((project) => project.group === label)
                      .length}
              </span>
            </button>
          ))}
        </div>
        <p
          className="filter-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {count} of {projects.length} projects
          {category === "All work" ? "" : ` · ${category}`}
        </p>
      </section>
      <FeaturedProjects
        key={category}
        projects={featured}
        additional={additional}
        showHeading={false}
      />
    </div>
  );
}

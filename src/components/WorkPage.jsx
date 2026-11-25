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
  return (
    <div className="work-page">
      <header className="work-intro section">
        <p className="eyebrow">Independent projects</p>
        <h1>Selected work</h1>
        <p>
          Websites and applications I’ve built for local discovery, fitness,
          language learning, and small-business tasks.
        </p>
      </header>
      <section
        className="work-filters section"
        id="project-filters"
        aria-labelledby="filter-heading"
      >
        <h2 id="filter-heading" className="eyebrow">
          Filter by category
        </h2>
        <div
          className="category-filters"
          role="group"
          aria-labelledby="filter-heading"
        >
          {categories.map((label) => (
            <button
              key={label}
              type="button"
              aria-pressed={category === label}
              aria-controls="project-collection"
              onClick={() => setCategory(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="filter-status" role="status">
          Showing {featured.length + additional.length} of {projects.length}{" "}
          projects
        </p>
      </section>
      <FeaturedProjects projects={featured} additional={additional} />
    </div>
  );
}

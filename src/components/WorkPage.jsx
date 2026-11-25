import { useState } from "react";
import FeaturedProjects from "./FeaturedProjects";
import { useLocale } from "../i18n/context";

export default function WorkPage({ projects }) {
  const { t } = useLocale();
  const [category, setCategory] = useState("All work");
  const categories = [
    "All work",
    ...new Set(projects.map((project) => project.group)),
  ];
  const matching = projects.filter(
    (project) => category === "All work" || project.group === category,
  );
  const featured = matching.filter((project) => project.featured);
  const additional = matching.filter((project) => !project.featured);
  return (
    <div className="work-page">
      <header className="work-intro section">
        <p className="eyebrow">{t("Independent projects")}</p>
        <h1>{t("Selected work")}</h1>
        <p>
          {t(
            "I build sites and apps for everyday tasks, from finding a local business and planning a workout to learning English.",
          )}
        </p>
      </header>
      <section
        className="work-filters section"
        id="project-filters"
        aria-labelledby="filter-heading"
      >
        <h2 id="filter-heading" className="eyebrow">
          {t("Filter by category")}
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
              {t(label)}
            </button>
          ))}
        </div>
        <p className="filter-status" role="status">
          {t("Showing {shown} of {total} projects", {
            shown: matching.length,
            total: projects.length,
          })}
        </p>
      </section>
      <FeaturedProjects projects={featured} additional={additional} />
    </div>
  );
}

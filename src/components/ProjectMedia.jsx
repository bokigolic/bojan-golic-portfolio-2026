import { useState } from "react";

export default function ProjectMedia({
  project,
  device = "desktop",
  priority = false,
  sizes = "(max-width: 640px) calc(100vw - 80px), 50vw",
}) {
  const [failed, setFailed] = useState(false);
  const src = project.media?.[device];
  return (
    <figure className={`project-media media-${project.tone} device-${device}`}>
      <div className="media-browser" aria-hidden="true">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>{project.name}</span>
        <span>{device === "mobile" ? "Mobile" : "Desktop"}</span>
      </div>
      {src && !failed ? (
        <img
          src={src}
          srcSet={
            device === "desktop" && project.media.desktopSmall
              ? `${project.media.desktopSmall} 640w, ${src} 1280w`
              : undefined
          }
          sizes={device === "desktop" ? sizes : undefined}
          alt={`${project.media.alt} — ${device} view`}
          width={device === "mobile" ? 390 : 1280}
          height={device === "mobile" ? 844 : 800}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="media-placeholder">
          <span className="placeholder-mark">
            {project.shortName || project.name}
          </span>
          <strong>Project screenshots to be added</strong>
          <p>
            {project.name} / {project.category}
          </p>
        </div>
      )}
      <figcaption>
        {src && !failed
          ? project.media.caption
          : "Media placeholder. No application screen is simulated."}
      </figcaption>
    </figure>
  );
}

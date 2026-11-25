export default function ProjectMedia({
  project,
  device = "desktop",
  priority = false,
  caption = false,
  sizes = "90vw",
}) {
  const { media } = project;
  return (
    <figure className={`project-media device-${device}`}>
      <img
        src={media[device]}
        srcSet={
          device === "desktop"
            ? `${media.desktopSmall} 640w, ${media.desktop} 1280w`
            : undefined
        }
        sizes={device === "desktop" ? sizes : undefined}
        alt={`${media.alt}, ${device} view`}
        width={device === "mobile" ? 390 : 1280}
        height={device === "mobile" ? 844 : 800}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
      {caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}

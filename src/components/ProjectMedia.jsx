import { useLocale } from "../i18n/context";
export default function ProjectMedia({
  project,
  device = "desktop",
  detail = false,
  priority = false,
  caption = false,
  sizes = "90vw",
}) {
  const { t } = useLocale();
  const media = detail ? project.media.detail : project.media;
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
        alt={`${media.alt} ${t(device === "mobile" ? "(mobile view)" : "(desktop view)")}`}
        width={device === "mobile" ? 390 : 1280}
        height={device === "mobile" ? 844 : (media.height ?? 800)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
      {caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}

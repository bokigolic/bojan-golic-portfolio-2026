import { navigate } from "../hooks/usePathname";
import { useLocale } from "../i18n/context";

export default function SiteLink({ href, onClick, children, ...props }) {
  const { path } = useLocale();
  const destination = path(href);
  return (
    <a
      href={destination}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target
        )
          return;
        if (!href.startsWith("/") && !href.startsWith("#")) return;
        event.preventDefault();
        navigate(destination);
      }}
    >
      {children}
    </a>
  );
}

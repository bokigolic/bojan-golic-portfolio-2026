import { useEffect, useState } from "react";

export function focusLocation(hash) {
  let id;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    id = hash.slice(1);
  }
  const target = hash
    ? document.getElementById(id)
    : document.getElementById("main-content");
  if (!target) return;
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
  if (hash) target.scrollIntoView({ behavior });
  else window.scrollTo({ top: 0, behavior: "instant" });
  const focusTarget = hash
    ? target.matches("h1,h2,h3")
      ? target
      : target.querySelector("h1,h2,h3") || target
    : target;
  if (!focusTarget.hasAttribute("tabindex")) {
    focusTarget.setAttribute("tabindex", "-1");
    focusTarget.addEventListener(
      "blur",
      () => focusTarget.removeAttribute("tabindex"),
      { once: true },
    );
  }
  focusTarget.focus({ preventScroll: true });
}

export function useLocation(initialPath) {
  const [location, setLocation] = useState(() => ({
    pathname: initialPath,
    search: "",
    hash: "",
    revision: 0,
  }));
  useEffect(() => {
    const sync = () => {
      const { pathname, search, hash } = window.location;
      setLocation((previous) => ({
        pathname,
        search,
        hash,
        revision: previous.revision + 1,
      }));
    };
    if (window.location.search || window.location.hash) sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [initialPath]);
  useEffect(() => {
    // Run after React commits the destination, including same-page hash changes.
    if (!location.revision && !location.hash) return;
    const frame = requestAnimationFrame(() => focusLocation(location.hash));
    return () => cancelAnimationFrame(frame);
  }, [location]);
  return location;
}

export function navigate(href) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

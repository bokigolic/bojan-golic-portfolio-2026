import { useEffect } from "react";

export default function useParallax(selectors = [".orb-one", ".orb-two", ".hero-dashboard", ".hero-illo [data-depth]"], strength = 0.08) {
  useEffect(() => {
    // collect elements for parallax. allow NodeList for selector groups
    const nodes = selectors
      .map((s) => Array.from(document.querySelectorAll(s)))
      .flat()
      .filter(Boolean);
    const els = nodes;
    if (!els.length) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sc = window.scrollY || window.pageYOffset;
          els.forEach((el, i) => {
            // per-element depth override via data-depth attribute (e.g. 0.04)
            const attr = el.getAttribute("data-depth");
            const depth = attr ? parseFloat(attr) : (i + 1) * strength;
            const y = Math.round(sc * depth);
            const x = Math.round((sc * depth * 0.08));
            const rot = ((sc * depth) % 360) * 0.02;
            el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [selectors, strength]);
}

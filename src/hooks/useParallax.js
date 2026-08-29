import { useEffect } from "react";

export default function useParallax(selectors = [".orb-one", ".orb-two", ".hero-dashboard"], strength = 0.12) {
  useEffect(() => {
    const els = selectors.map((s) => document.querySelector(s)).filter(Boolean);
    if (!els.length) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sc = window.scrollY || window.pageYOffset;
          els.forEach((el, i) => {
            const depth = (i + 1) * strength;
            const y = Math.round(sc * depth);
            el.style.transform = `translate3d(0, ${y}px, 0) rotate(${(sc * depth) % 360}deg)`;
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

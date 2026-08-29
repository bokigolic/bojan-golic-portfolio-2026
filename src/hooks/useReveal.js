import { useEffect } from "react";

export default function useReveal(selector = ".reveal", options = {}) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("revealed");
            if (reduceMotion) {
              io.unobserve(entry.target);
              return;
            }
            // animate any numeric counters inside
            const counters = el.querySelectorAll("[data-count]");
            counters.forEach((c) => {
              const to = parseInt(c.getAttribute("data-count"), 10) || 0;
              const original = c.textContent || "";
              const suffix = original.replace(/^[\d,]+/, "");
              const formatter = new Intl.NumberFormat("en-US");
              const duration = 900;
              const start = performance.now();
              const from = 0;
              function tick(now) {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                c.textContent =
                  formatter.format(Math.floor(from + (to - from) * eased)) +
                  suffix;
                if (t < 1) requestAnimationFrame(tick);
                else c.textContent = formatter.format(to) + suffix;
              }
              requestAnimationFrame(tick);
            });
            // if we don't want to observe again
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...options }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [selector]);
}

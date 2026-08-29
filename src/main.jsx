import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import "./portfolio.css";
import "./professional.css";
import "./authoritative.css";
import useReveal from "./hooks/useReveal";
import useParallax from "./hooks/useParallax";

document.documentElement.classList.add("js");

// initialize small UX hooks (non-React side-effect) early
function InitHooks() {
  useReveal();
  useParallax();
  // header compact-on-scroll
  useEffect(() => {
    const el = document.querySelector(".nav-shell");
    if (!el) return;
    function onScroll() {
      if (window.scrollY > 28) el.classList.add("nav--scrolled");
      else el.classList.remove("nav--scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InitHooks />
    <App />
  </StrictMode>,
);

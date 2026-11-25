import { useEffect, useState } from "react";
import Modal from "./Modal";
import SiteLink from "./SiteLink";

const items = [
  ["work", "Work", "/work"],
  ["expertise", "Expertise", "/#expertise"],
  ["about", "About", "/#about"],
  ["contact", "Contact", "/#contact"],
];

function Navigation({ label, current, onNavigate }) {
  return (
    <nav
      className={label === "Primary" ? "desktop-nav" : "mobile-nav"}
      aria-label={label}
    >
      {items.map(([id, text, href]) => (
        <SiteLink
          key={id}
          href={href}
          onClick={onNavigate}
          aria-current={
            current === id ? (id === "work" ? "page" : "location") : undefined
          }
        >
          {text}
        </SiteLink>
      ))}
    </nav>
  );
}

export default function Header({ pathname }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(min-width: 701px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        setActive((current) => {
          if (visible) return visible.target.id;
          return entries.some((entry) => entry.target.id === current)
            ? ""
            : current;
        });
      },
      { rootMargin: "-10% 0px -55% 0px" },
    );
    for (const id of ["expertise", "about", "contact"]) {
      observer.observe(document.getElementById(id));
    }
    return () => observer.disconnect();
  }, [pathname]);

  const current = /^\/(work\/?$|projects\/)/.test(pathname)
    ? "work"
    : pathname === "/"
      ? active
      : "";
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner section">
        <SiteLink className="brand" href="/" aria-label="Bojan Golic home">
          Bojan Golic<span aria-hidden="true">.</span>
        </SiteLink>
        <Navigation label="Primary" current={current} />
        <button
          className="menu-toggle text-link"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>
      {open && (
        <Modal
          className="mobile-dialog"
          titleId="mobile-menu-title"
          onClose={close}
        >
          <div className="dialog-heading">
            <h2 id="mobile-menu-title">Navigation</h2>
            <button
              type="button"
              className="icon-button"
              onClick={close}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <Navigation
            label="Mobile navigation"
            current={current}
            onNavigate={close}
          />
        </Modal>
      )}
    </header>
  );
}

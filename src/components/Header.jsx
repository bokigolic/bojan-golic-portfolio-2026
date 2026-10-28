import { useEffect, useState } from "react";
import Modal from "./Modal";
import SiteLink from "./SiteLink";
const items = [
  ["home", "Home", "/"],
  ["work", "Work", "/work"],
  ["expertise", "Expertise", "/#expertise"],
  ["about", "About", "/#about"],
  ["contact", "Contact", "/#contact"],
];
export default function Header({ pathname, onOpenContact }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 20);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    const media = window.matchMedia("(min-width: 850px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    return () => {
      window.removeEventListener("scroll", sync);
      media.removeEventListener("change", resize);
    };
  }, []);
  useEffect(() => {
    setActive("home");
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length)
          setActive(
            visible[0].target.id === "intro" ? "home" : visible[0].target.id,
          );
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    ["intro", "expertise", "about", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);
  const close = () => setOpen(false);
  const currentId =
    pathname.startsWith("/projects/") || /^\/work\/?$/.test(pathname)
      ? "work"
      : pathname === "/"
        ? active
        : "";
  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <SiteLink className="brand" href="/" aria-label="Bojan Golic home">
          <span className="brand-symbol" aria-hidden="true">
            b<span>g</span>.
          </span>
          <span>Bojan Golic</span>
        </SiteLink>
        <nav className="desktop-nav" aria-label="Primary">
          {items.map(([id, label, href]) => (
            <SiteLink
              key={id}
              href={href}
              aria-current={
                currentId === id
                  ? ["home", "work"].includes(id)
                    ? "page"
                    : "location"
                  : undefined
              }
            >
              {label}
            </SiteLink>
          ))}
        </nav>
        <div className="header-actions">
          <button className="header-contact" onClick={onOpenContact}>
            Let's talk <span aria-hidden="true">&#8599;</span>
          </button>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            Menu <span aria-hidden="true">+</span>
          </button>
        </div>
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
              autoFocus
              className="icon-button"
              onClick={close}
              aria-label="Close menu"
            >
              &#215;
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {items.map(([id, label, href], i) => (
              <SiteLink
                key={id}
                href={href}
                onClick={close}
                aria-current={
                  currentId === id
                    ? ["home", "work"].includes(id)
                      ? "page"
                      : "location"
                    : undefined
                }
              >
                <span>0{i + 1}</span>
                {label}
                <span aria-hidden="true">&#8599;</span>
              </SiteLink>
            ))}
            <button
              onClick={() => {
                close();
                onOpenContact();
              }}
            >
              Get in touch <span aria-hidden="true">&#8599;</span>
            </button>
          </nav>
          <p>Web Developer &amp; Digital Experience Specialist</p>
        </Modal>
      )}
    </header>
  );
}

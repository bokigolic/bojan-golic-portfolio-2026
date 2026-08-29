import { useEffect, useState } from "react";

const navItems = [
  ["about", "About"],
  ["services", "Services"],
  ["work", "Work"],
  ["contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    try {
      document.body.classList.toggle("no-scroll", open);
    } catch (e) {}
    return () => {
      try {
        document.body.classList.remove("no-scroll");
      } catch (e) {}
    };
  }, [open]);

  useEffect(() => {
    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);
    const contact = document.getElementById("contact");

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-32% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));

    function onScroll() {
      if (
        contact &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 12
      ) {
        setActive("contact");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="nav-shell" role="banner">
      <a className="brand" href="#top" aria-label="Bojan Golic home">
        <i aria-hidden="true" />
        <div className="wordmark">BOJAN GOLIC</div>
      </a>

      <nav id="main-navigation" className="main-nav" aria-label="Primary">
        {navItems.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "page" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="header-controls">
        <span className="kbd-hint" aria-hidden="true">
          Ctrl K
        </span>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={"mobile-menu" + (open ? " open" : "")}
        aria-hidden={!open}
      >
        <nav>
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

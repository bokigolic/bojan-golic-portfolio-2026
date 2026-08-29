import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

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

  return (
    <header className="nav-shell" role="banner">
      <div className="brand">
        <div className="wordmark">BOJAN GOLIC</div>
      </div>

      <nav id="main-navigation" className="main-nav" aria-label="Primary">
        <a href="#work">01 Work</a>
        <a href="#services">02 Services</a>
        <a href="#capabilities">03 Capabilities</a>
        <a href="#process">04 Process</a>
        <a href="#toolkit">05 Toolkit</a>
        <a href="#experience">06 Experience</a>
        <a href="#contact">07 Contact</a>
      </nav>

      <div className="header-controls">
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
          <a href="#work" onClick={() => setOpen(false)}>
            01 Work
          </a>
          <a href="#services" onClick={() => setOpen(false)}>
            02 Services
          </a>
          <a href="#capabilities" onClick={() => setOpen(false)}>
            03 Capabilities
          </a>
          <a href="#process" onClick={() => setOpen(false)}>
            04 Process
          </a>
          <a href="#toolkit" onClick={() => setOpen(false)}>
            05 Toolkit
          </a>
          <a href="#experience" onClick={() => setOpen(false)}>
            06 Experience
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            07 Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

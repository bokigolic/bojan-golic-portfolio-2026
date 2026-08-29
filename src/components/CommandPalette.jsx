import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "../utils/analytics";

const actions = [
  { id: "about", label: "About", type: "section", target: "about" },
  { id: "services", label: "Services", type: "section", target: "services" },
  { id: "work", label: "Work", type: "section", target: "work" },
  { id: "contact", label: "Contact", type: "contact" },
  {
    id: "linkedin",
    label: "LinkedIn",
    type: "external",
    target: "https://www.linkedin.com/in/bojan-golic",
  },
  {
    id: "resume",
    label: "Download Resume",
    type: "external",
    target: "/resume-en.html",
  },
];

function isTypingTarget(target) {
  const tag = target?.tagName?.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    target?.isContentEditable
  );
}

export default function CommandPalette({ onOpenContact }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const filteredActions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return actions;
    return actions.filter((action) =>
      action.label.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        if (isTypingTarget(event.target)) return;
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      return;
    }
    const previous = document.activeElement;
    window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => previous?.focus?.();
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function runAction(action) {
    if (!action) return;
    setOpen(false);

    if (action.type === "section") {
      document
        .getElementById(action.target)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (action.type === "contact") {
      trackEvent("contact_click", { source: "command_palette" });
      onOpenContact?.();
      return;
    }

    if (action.id === "linkedin") trackEvent("linkedin_click");
    if (action.id === "resume") trackEvent("resume_download");
    window.open(action.target, "_blank", "noopener,noreferrer");
  }

  function onPaletteKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        Math.min(index + 1, filteredActions.length - 1),
      );
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      runAction(filteredActions[activeIndex]);
    }
  }

  if (!open) return null;

  return (
    <div
      className="command-backdrop"
      role="presentation"
      onMouseDown={() => setOpen(false)}
    >
      <div
        ref={panelRef}
        className="command-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={onPaletteKeyDown}
      >
        <div className="command-search">
          <span aria-hidden="true">Ctrl K</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search navigation"
            aria-label="Search navigation"
          />
          <kbd>Esc</kbd>
        </div>
        <div className="command-list" role="listbox" aria-label="Actions">
          {filteredActions.length ? (
            filteredActions.map((action, index) => (
              <button
                key={action.id}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => runAction(action)}
              >
                <span>{action.label}</span>
                <small>{action.type === "section" ? "Jump" : "Open"}</small>
              </button>
            ))
          ) : (
            <p className="command-empty">No matching actions.</p>
          )}
        </div>
      </div>
    </div>
  );
}

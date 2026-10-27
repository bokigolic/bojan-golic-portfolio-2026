import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { navigate } from "../hooks/usePathname";
const actions = [
  ["Featured work", "/#work"],
  ["Project workbench", "/#workbench"],
  ["Technical expertise", "/#expertise"],
  ["Experience", "/#experience"],
  ["Development process", "/#process"],
  ["About", "/#about"],
];
export default function CommandPalette({ onOpenContact }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const listRef = useRef(null);
  function navigateActions(event) {
    const buttons = [...(listRef.current?.querySelectorAll("button") || [])];
    if (!buttons.length) return;
    const index = buttons.indexOf(document.activeElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        index < 0
          ? event.key === "ArrowDown"
            ? 0
            : buttons.length - 1
          : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) %
            buttons.length;
      buttons[next].focus();
    } else if (event.key === "Enter" && event.target.tagName === "INPUT") {
      event.preventDefault();
      buttons[0].click();
    }
  }
  useEffect(() => {
    const key = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName) &&
        !e.target.isContentEditable
      ) {
        e.preventDefault();
        setQuery("");
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return open ? (
    <Modal
      titleId="command-title"
      className="command-dialog"
      onClose={() => setOpen(false)}
    >
      <div className="dialog-heading">
        <h2 id="command-title">Quick navigation</h2>
        <button
          className="icon-button"
          onClick={() => setOpen(false)}
          aria-label="Close quick navigation"
        >
          &#215;
        </button>
      </div>
      <input
        data-autofocus="true"
        aria-label="Search navigation"
        placeholder="Where would you like to go?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={navigateActions}
      />
      <div className="command-list" ref={listRef} onKeyDown={navigateActions}>
        {actions
          .filter(([label]) =>
            label.toLowerCase().includes(query.toLowerCase()),
          )
          .map(([label, href]) => (
            <button
              key={href}
              onClick={() => {
                setOpen(false);
                navigate(href);
              }}
            >
              {label}
              <span aria-hidden="true">&#8599;</span>
            </button>
          ))}
        {!query && (
          <button
            onClick={() => {
              setOpen(false);
              onOpenContact();
            }}
          >
            Get in touch<span aria-hidden="true">&#8599;</span>
          </button>
        )}
        {!actions.some(([label]) =>
          label.toLowerCase().includes(query.toLowerCase()),
        ) && <p>No matching sections.</p>}
      </div>
      <p className="command-hint">
        Tab or arrow keys to move. Enter to select. Escape to close.
      </p>
    </Modal>
  ) : null;
}

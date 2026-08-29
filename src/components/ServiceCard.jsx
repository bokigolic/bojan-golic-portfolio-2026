import { useState, useEffect, useRef } from "react";

export default function ServiceCard({ data }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const backCloseRef = useRef(null);
  const detailsId = `${data.id}-details`;

  // close when reduced-motion preference set (avoid flipping)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // no-op
    }
  }, []);

  // Close on Escape and restore focus to the toggle button
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <article
      className={"service-card reveal" + (open ? " is-open" : "")}
      aria-expanded={open}
    >
      <div className="card-inner" aria-hidden={false}>
        <div className="card-face card-face--front" aria-hidden={open}>
          <div className="card-head">
            <div className="card-number">{data.number}</div>
            <h3>{data.title}</h3>
          </div>
          <p className="card-lead">{data.short}</p>
          <div className="card-footer">
            <span className="card-pill">{data.pill}</span>
            <button
              ref={btnRef}
              className="card-explore"
              aria-expanded={open}
              aria-controls={detailsId}
              onClick={() => setOpen((s) => !s)}
            >
              {open ? "Close" : "Explore +"}
            </button>
          </div>
        </div>

        <div
          id={detailsId}
          className="card-face card-face--back"
          aria-hidden={!open}
          tabIndex={open ? 0 : -1}
        >
          <button
            ref={backCloseRef}
            className="card-close"
            onClick={() => {
              setOpen(false);
              btnRef.current?.focus();
            }}
            aria-label={`Close details for ${data.title}`}
          >
            Close
          </button>
          <h4>Overview</h4>
          <p>{data.summary}</p>
          <h5>Capabilities</h5>
          <ul>
            {data.capabilities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="card-back-footer">
            <div className="proof">{data.proof}</div>
            <div className="tools">{data.tools.join(" · ")}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

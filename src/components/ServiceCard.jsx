import { useState, useEffect, useRef } from "react";

export default function ServiceCard({ data }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  // close when reduced-motion preference set (avoid flipping)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // no-op
    }
  }, []);

  return (
    <article
      className={"service-card" + (open ? " is-open" : "")}
      aria-expanded={open}
    >
      <div className="card-face card-face--front">
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
            onClick={() => setOpen((s) => !s)}
          >
            {open ? "Close" : "Explore +"}
          </button>
        </div>
      </div>

      <div className="card-face card-face--back" aria-hidden={!open}>
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
    </article>
  );
}

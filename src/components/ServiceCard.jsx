import { useEffect, useRef, useState } from "react";

export default function ServiceCard({ data }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const detailsId = `${data.id}-details`;

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
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close -" : "Explore +"}
        </button>
      </div>

      <div
        id={detailsId}
        className="card-details"
        aria-hidden={!open}
        inert={!open}
      >
        <h4>Overview</h4>
        <p>{data.summary}</p>
        <h5>Capabilities</h5>
        <ul>
          {data.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
        <div className="card-back-footer">
          <div className="proof">{data.proof}</div>
          <div className="tools">{data.tools.join(" / ")}</div>
        </div>
      </div>
    </article>
  );
}

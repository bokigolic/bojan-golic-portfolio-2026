export default function ServiceCard({ data, open, onToggle, detailsId }) {
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
          className="card-explore"
          aria-expanded={open}
          aria-controls={open ? detailsId : undefined}
          onClick={(event) => onToggle(event.currentTarget)}
        >
          {open ? "Hide details −" : "Explore details +"}
        </button>
      </div>
    </article>
  );
}

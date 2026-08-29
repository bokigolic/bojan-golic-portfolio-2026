export default function ContactSection({ onOpenContact }) {
  const email = "hello@bojangolic.com";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      const el = document.createElement("div");
      el.textContent = "Copied.";
      el.setAttribute("role", "status");
      el.style.position = "fixed";
      el.style.bottom = "18px";
      el.style.left = "18px";
      el.style.background = "#071129";
      el.style.color = "white";
      el.style.padding = "8px 12px";
      el.style.borderRadius = "8px";
      document.body.appendChild(el);
      setTimeout(() => document.body.removeChild(el), 1200);
    } catch (e) {}
  }

  return (
    <section
      className="contact-section section"
      id="contact"
      aria-label="Contact"
    >
      <div className="section-head">
        <div>
          <p className="section-kicker">06 / Contact</p>
          <h2>
            LET'S MAKE
            <br />
            THE WEB WORK
            <br />
            <em>BETTER.</em>
          </h2>
        </div>
        <p>
          Open to discussing enterprise web production, migrations, QA, SEO, and
          ongoing platform work.
        </p>
      </div>

      <div className="contact-grid">
        <article>
          <h3>01 / SEND A MESSAGE</h3>
          <p>Tell me about the project, role, or website challenge.</p>
          <button className="button primary" onClick={onOpenContact}>
            Get in touch →
          </button>
        </article>

        <article>
          <h3>02 / EMAIL</h3>
          <p>{email}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <a className="button" href={`mailto:${email}`}>
              Email me →
            </a>
            <button className="button" onClick={copyEmail}>
              Copy email
            </button>
          </div>
        </article>

        <article>
          <h3>03 / LINKEDIN</h3>
          <p>Connect or send a message on LinkedIn.</p>
          <a
            className="button primary"
            href="https://www.linkedin.com/in/bojan-golic"
            target="_blank"
            rel="noopener noreferrer"
          >
            View LinkedIn →
          </a>
        </article>
      </div>
    </section>
  );
}

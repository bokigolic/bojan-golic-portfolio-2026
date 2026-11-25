import { useState } from "react";

export default function ContactSection({ onOpenContact }) {
  const [copy, setCopy] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("hello@bojangolic.com");
      setCopy("Email copied.");
    } catch {
      setCopy("Copy unavailable. Use the email link instead.");
    }
  }
  return (
    <section
      className="contact section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div>
        <h2 id="contact-title">Get in touch.</h2>
        <p>Have a project or a role in mind? I’d like to hear about it.</p>
        <button className="button button-dark" onClick={onOpenContact}>
          Get in touch
        </button>
      </div>
      <div className="contact-links">
        <div className="email-line">
          <a href="mailto:hello@bojangolic.com">hello@bojangolic.com</a>
          <button type="button" className="text-link" onClick={copyEmail}>
            Copy email
          </button>
        </div>
        <p className="copy-status" role="status">
          {copy}
        </p>
        <a className="text-link" href="https://www.linkedin.com/in/bojan-golic">
          LinkedIn
        </a>
      </div>
    </section>
  );
}

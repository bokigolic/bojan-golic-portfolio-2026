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
      <div className="contact-top">
        <p className="eyebrow">06 / Get in touch</p>
        <span>GOOD WORK STARTS WITH A CONVERSATION.</span>
      </div>
      <div className="contact-layout">
        <div>
          <h2 id="contact-title">
            Have something
            <br />
            <em>in mind?</em>
          </h2>
          <p>
            A website, a web application, or an opportunity to build something
            useful. I'd like to hear about it.
          </p>
          <button className="button button-light" onClick={onOpenContact}>
            Let's talk <span aria-hidden="true">&#8599;</span>
          </button>
        </div>
        <div className="contact-links">
          <a href="mailto:hello@bojangolic.com">
            <span>Email</span>
            <strong>hello@bojangolic.com</strong>
            <span aria-hidden="true">&#8599;</span>
          </a>
          <button onClick={copyEmail}>
            <span>Keep it handy</span>
            <strong>Copy email address</strong>
            <span aria-hidden="true">+</span>
          </button>
          <a
            href="https://www.linkedin.com/in/bojan-golic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Connect</span>
            <strong>LinkedIn</strong>
            <span aria-hidden="true">&#8599;</span>
          </a>
          <p className="copy-status" role="status">
            {copy}
          </p>
        </div>
      </div>
    </section>
  );
}

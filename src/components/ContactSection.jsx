import { useLocale } from "../i18n/context";
import { useState } from "react";

export default function ContactSection({ onOpenContact }) {
  const { t } = useLocale();
  const [copy, setCopy] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("hello@bojangolic.com");
      setCopy(t("Email copied."));
    } catch {
      setCopy(
        t("Couldn’t copy the address. You can still open the email link."),
      );
    }
  }
  return (
    <section
      className="contact section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div>
        <h2 id="contact-title">{t("Let’s talk.")}</h2>
        <p>
          {t(
            "If your team needs help with web production or frontend development, I’d be glad to hear what you’re working on.",
          )}
        </p>
        <button className="button button-dark" onClick={onOpenContact}>
          {t("Get in touch")}
        </button>
      </div>
      <div className="contact-links">
        <div className="email-line">
          <a href="mailto:hello@bojangolic.com">hello@bojangolic.com</a>
          <button type="button" className="text-link" onClick={copyEmail}>
            {t("Copy email")}
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

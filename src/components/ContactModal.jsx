import { useLocale } from "../i18n/context";
import { useState } from "react";
import Modal from "./Modal";
import { trackEvent } from "../utils/analytics";
const options = [
  "Web development",
  "Web application",
  "CMS & web production",
  "Accessibility & QA",
  "Project or role",
  "Other",
];
export default function ContactModal({ open, onClose }) {
  const { t } = useLocale();
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  if (!open) return null;
  async function submit(event) {
    event.preventDefault();
    if (status === "loading") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = {};
    if (!String(data.get("name")).trim()) next.name = t("Enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email"))))
      next.email = t("Enter a valid email address.");
    if (!String(data.get("message")).trim()) next.message = t("Add a message.");
    setErrors(next);
    if (Object.keys(next).length) {
      form.elements[Object.keys(next)[0]].focus();
      return;
    }
    const endpoint = window.FORM_ENDPOINT || "/";
    if (
      endpoint === "/" &&
      ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)
    ) {
      setStatus("local");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!response.ok) throw new Error("Delivery failed");
      setStatus("success");
      form.reset();
      trackEvent("contact_submit");
    } catch {
      setStatus("error");
    }
  }
  return (
    <Modal
      onClose={onClose}
      titleId="contact-heading"
      className="contact-dialog"
    >
      <div className="dialog-heading">
        <p className="eyebrow">{t("Contact")}</p>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label={t("Close contact form")}
        >
          &#215;
        </button>
      </div>
      <h2 id="contact-heading">{t("Send a message")}</h2>
      <p>
        {t("A few lines about your project or team are enough to get started.")}
      </p>
      {status === "success" ? (
        <div className="form-success" role="status">
          <h3>{t("Message submitted.")}</h3>
          <p>{t("Thanks for getting in touch. I’ll get back to you.")}</p>
          <button className="button button-dark" onClick={onClose}>
            {t("Close")}
          </button>
        </div>
      ) : (
        <form name="contact" method="POST" onSubmit={submit} noValidate>
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <label>
              {t("Leave this empty")}
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="contact-name">
              {t("Name")} <span>{t("(required)")}</span>
              <input
                data-autofocus="true"
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span className="field-error" id="name-error">
                  {errors.name}
                </span>
              )}
            </label>
            <label htmlFor="contact-email">
              {t("Email")} <span>{t("(required)")}</span>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span className="field-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </label>
          </div>
          <label htmlFor="contact-company">
            {t("Company / organization")} <span>{t("(optional)")}</span>
            <input
              id="contact-company"
              name="company"
              autoComplete="organization"
              maxLength={200}
            />
          </label>
          <label htmlFor="contact-service">
            {t("What can I help with?")}
            <select id="contact-service" name="service">
              {options.map((o) => (
                <option key={o} value={o}>
                  {t(o)}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="contact-message">
            {t("Message")} <span>{t("(required)")}</span>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              maxLength={5000}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span className="field-error" id="message-error">
                {errors.message}
              </span>
            )}
          </label>
          {["error", "local"].includes(status) && (
            <p className="form-error" role="alert">
              {status === "local"
                ? t("Form delivery is available on the hosted site.")
                : t("Your message could not be sent. Please try again.")}{" "}
              <a href="mailto:hello@bojangolic.com">
                {t("Email me directly.")}
              </a>
            </p>
          )}
          <div className="form-actions">
            <button
              className="button button-dark"
              type="submit"
              disabled={status === "loading"}
            >
              {t(status === "loading" ? "Sending..." : "Send message")}
            </button>
            <button className="text-link" type="button" onClick={onClose}>
              {t("Cancel")}
            </button>
          </div>
          <p className="form-privacy">{t("I’ll use your details to reply.")}</p>
        </form>
      )}
    </Modal>
  );
}

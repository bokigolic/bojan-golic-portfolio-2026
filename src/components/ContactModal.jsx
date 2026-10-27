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
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  if (!open) return null;
  async function submit(event) {
    event.preventDefault();
    if (status === "loading") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = {};
    if (!String(data.get("name")).trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email"))))
      next.email = "Please enter a valid email address.";
    if (!String(data.get("message")).trim())
      next.message = "Please add a message.";
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
        <p className="eyebrow">Start a conversation</p>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close contact form"
        >
          &#215;
        </button>
      </div>
      <h2 id="contact-heading">
        What are you
        <br />
        <em>working on?</em>
      </h2>
      <p>
        Tell me about your project, your team, or the problem you want to solve.
      </p>
      {status === "success" ? (
        <div className="form-success" role="status">
          <h3>Message sent.</h3>
          <p>Thanks for getting in touch. I'll get back to you.</p>
          <button className="button button-dark" onClick={onClose}>
            Close
          </button>
        </div>
      ) : (
        <form name="contact" method="POST" onSubmit={submit} noValidate>
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <label>
              Leave this empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="contact-name">
              Name <span>(required)</span>
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
              Email <span>(required)</span>
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
            Company / organization <span>(optional)</span>
            <input
              id="contact-company"
              name="company"
              autoComplete="organization"
              maxLength={200}
            />
          </label>
          <label htmlFor="contact-service">
            What can I help with?
            <select id="contact-service" name="service">
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
          <label htmlFor="contact-message">
            Message <span>(required)</span>
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
                ? "Form delivery is available on the hosted site."
                : "Your message could not be sent. Please try again."}{" "}
              You can also{" "}
              <a href="mailto:hello@bojangolic.com">email me directly</a>.
            </p>
          )}
          <div className="form-actions">
            <button
              className="button button-dark"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send message"}
              <span aria-hidden="true">&#8599;</span>
            </button>
            <button className="text-link" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
          <p className="form-privacy">
            Your details are used to reply to your message.
          </p>
        </form>
      )}
    </Modal>
  );
}

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../utils/analytics";

const serviceOptions = [
  "Website production",
  "CMS support",
  "Content migration",
  "QA / accessibility",
  "SEO / optimization",
  "Publishing support",
  "Ongoing website maintenance",
  "Project / contract opportunity",
  "Permanent role",
  "Other",
];

export default function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [service, setService] = useState(serviceOptions[0]);
  const formRef = useRef(null);
  const firstRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) {
      setStatus("idle");
      setErrors({});
      setService(serviceOptions[0]);
      document.addEventListener("keydown", onKey);
      try {
        document.body.classList.add("no-scroll");
      } catch (e) {}
      setTimeout(() => firstRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      try {
        document.body.classList.remove("no-scroll");
      } catch (e) {}
    };
  }, [open, onClose]);

  function validate(values) {
    const e = {};
    if (!values.name) e.name = "Please enter your name.";
    if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email)) {
      e.email = "Please enter a valid email.";
    }
    if (!values.message) e.message = "Please enter a message.";
    return e;
  }

  function resizeTextarea(event) {
    const field = event.currentTarget;
    field.style.height = "auto";
    field.style.height = `${Math.min(field.scrollHeight, 260)}px`;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (status === "loading") return;

    setStatus("idle");
    setErrors({});
    const form = formRef.current;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const e = validate(values);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setStatus("loading");

    try {
      formData.set("form-name", "contact");

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (res.ok) {
        form.reset();
        setStatus("success");
        try {
          trackEvent("contact_submit", { method: "netlify" });
        } catch (e) {}
        setTimeout(() => {
          try {
            closeRef.current?.focus();
          } catch (e) {}
        }, 80);
      } else {
        setStatus("error");
        try {
          trackEvent("contact_error", { status: res.status });
        } catch (e) {}
      }
    } catch (err) {
      setStatus("error");
      try {
        trackEvent("contact_error", { error: "network" });
      } catch (e) {}
    }
  }

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={() => onClose?.()}
    >
      <div
        className="modal"
        role="document"
        aria-labelledby="contact-heading"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close contact form"
        >
          x
        </button>

        <p className="modal-kicker">Contact</p>
        <h2 id="contact-heading">Start a conversation</h2>
        <p>Tell me what you're working on and I'll get back to you.</p>

        {status === "success" ? (
          <div
            className="modal-message success"
            role="status"
            aria-live="polite"
          >
            <span className="success-check" aria-hidden="true">
              ✓
            </span>
            <strong>Message sent.</strong>
            <div>Thanks - your message has been sent. I'll get back to you soon.</div>
            <div className="modal-actions">
              <button className="button" onClick={onClose}>
                Close
              </button>
              <a
                className="button primary"
                href="https://www.linkedin.com/in/bojan-golic"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("linkedin_click")}
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        ) : (
          <form
            ref={formRef}
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="modal-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <label className="visually-hidden" aria-hidden="true">
              <span>Do not fill this out if you're human</span>
              <input name="bot-field" tabIndex="-1" autoComplete="off" />
            </label>

            <label>
              <span>Name *</span>
              <input ref={firstRef} name="name" type="text" required />
              {errors.name && (
                <div className="field-error" role="alert">
                  {errors.name}
                </div>
              )}
            </label>

            <label>
              <span>Email *</span>
              <input name="email" type="email" required />
              {errors.email && (
                <div className="field-error" role="alert">
                  {errors.email}
                </div>
              )}
            </label>

            <label>
              <span>Company / Organization</span>
              <input name="company" type="text" />
            </label>

            <label>
              <span>What can I help with?</span>
              <select
                className="native-service-select"
                name="service"
                value={service}
                onChange={(event) => setService(event.target.value)}
                aria-hidden="true"
                tabIndex="-1"
              >
                {serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <div
                className="service-chip-group"
                role="group"
                aria-label="What can I help with?"
              >
                {serviceOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={service === option}
                    className={service === option ? "is-selected" : ""}
                    onClick={() => setService(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </label>

            <label>
              <span>Message *</span>
              <textarea
                name="message"
                rows="5"
                required
                onInput={resizeTextarea}
              />
              {errors.message && (
                <div className="field-error" role="alert">
                  {errors.message}
                </div>
              )}
            </label>

            {status === "error" && (
              <div className="modal-message error" role="alert">
                Something went wrong while sending your message. Please try
                again, or{" "}
                <a href="mailto:hello@bojangolic.com">email me directly</a>{" "}
                instead.
              </div>
            )}

            <div className="modal-actions">
              <button
                className="button primary"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
              <button type="button" className="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

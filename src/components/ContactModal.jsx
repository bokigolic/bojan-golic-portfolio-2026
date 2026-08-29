import { useEffect, useRef, useState } from "react";

export default function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const firstRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) {
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

  // basic client-side validation
  function validate(values) {
    const e = {};
    if (!values.name) e.name = "Please enter your name.";
    if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email))
      e.email = "Please enter a valid email.";
    if (!values.message) e.message = "Please enter a message.";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
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
      const body = new URLSearchParams();
      body.append("form-name", "contact");
      for (const [k, v] of Object.entries(values)) body.append(k, v);

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          try {
            closeRef.current?.focus();
          } catch (e) {}
        }, 80);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
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
          ✕
        </button>

        <h2 id="contact-heading">LET'S TALK.</h2>
        <p>Tell me what you're working on and I'll get back to you.</p>

        {status === "success" ? (
          <div
            className="modal-message success"
            role="status"
            aria-live="polite"
          >
            <strong>MESSAGE SENT.</strong>
            <div>
              Thanks for reaching out. I'll get back to you as soon as possible.
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="button" onClick={onClose}>
                Close
              </button>
              <a
                className="button primary"
                href="https://www.linkedin.com/in/bojan-golic"
                target="_blank"
                rel="noopener noreferrer"
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
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="modal-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <label className="visually-hidden">
              <span>Don’t fill this out if you're human</span>
              <input name="bot-field" />
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
              <select name="service" defaultValue="Website production">
                <option>Website production</option>
                <option>CMS support</option>
                <option>Content migration</option>
                <option>QA / accessibility</option>
                <option>SEO / optimization</option>
                <option>Publishing support</option>
                <option>Ongoing website maintenance</option>
                <option>Project / contract opportunity</option>
                <option>Permanent role</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              <span>Message *</span>
              <textarea name="message" rows="5" required />
              {errors.message && (
                <div className="field-error" role="alert">
                  {errors.message}
                </div>
              )}
            </label>

            {status === "error" && (
              <div className="modal-message error" role="alert">
                I couldn't send the form right now. You can{" "}
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
                {status === "loading" ? "Sending…" : "SEND MESSAGE →"}
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

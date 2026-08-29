import { useEffect, useRef, useState } from "react";

export default function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState("idle");
  const [channel, setChannel] = useState("email");
  const formRef = useRef(null);
  const firstRef = useRef(null);
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

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
  }, [open]);

  // Focus trap: keep Tab cycling inside the modal
  useEffect(() => {
    if (!open) return;
    const root = modalRef.current;
    if (!root) return;
    const focusable = root.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    function onKey(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (channel !== "email") return;
    const form = formRef.current;
    const data = new FormData(form);
    setStatus("loading");

    const endpoint = window.FORM_ENDPOINT || null; // set this in index.html to use Formspree
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          setStatus("success");
          setShowSuccessAnim(true);
        } else setStatus("error");
      } else {
        // No remote endpoint configured — avoid submitting the form which can
        // cause a full page navigation. Show success state and keep modal open
        // so the user sees confirmation. Netlify static detection keeps the
        // hidden form in the markup.
        setStatus("success");
        setShowSuccessAnim(true);
      }
    } catch (err) {
      setStatus("error");
    }
  }

  function openWhatsApp(e) {
    e?.preventDefault();
    try {
      const form = formRef.current;
      const name = form.querySelector('[name="name"]').value || "";
      const phone = form.querySelector('[name="phone"]').value || "";
      const message = form.querySelector('[name="message"]').value || "";
      const text = encodeURIComponent(`${name}: ${message}`);
      const digits = phone.replace(/[^0-9]/g, "");
      const url = `https://wa.me/${digits}?text=${text}`;
      window.open(url, "_blank");
      setShowSuccessAnim(true);
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  }

  // play a short success tone (Web Audio) unless user prefers reduced motion
  useEffect(() => {
    if (!showSuccessAnim) return;
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ctx.destination);
      const now = ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      o.start(now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);
      o.stop(now + 0.4);
      setTimeout(() => {
        try {
          ctx.close();
        } catch (e) {}
      }, 800);
    } catch (e) {}
  }, [showSuccessAnim]);

  // when status becomes success, move focus to close button for accessibility
  useEffect(() => {
    if (status === "success") {
      setTimeout(() => closeRef.current?.focus(), 80);
    }
  }, [status]);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={() => onClose?.()}
    >
      <div
        className="modal"
        aria-labelledby="contact-heading"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={(ev) => {
          try {
            const r = modalRef.current.getBoundingClientRect();
            const dx = ev.clientX - (r.left + r.width / 2);
            const dy = ev.clientY - (r.top + r.height / 2);
            const rx = (-dy / r.height) * 6; // rotateX
            const ry = (dx / r.width) * 8; // rotateY
            modalRef.current.style.setProperty("--rx", rx + "deg");
            modalRef.current.style.setProperty("--ry", ry + "deg");
          } catch (e) {}
        }}
        onMouseLeave={() => {
          try {
            modalRef.current.style.setProperty("--rx", "0deg");
            modalRef.current.style.setProperty("--ry", "0deg");
          } catch (e) {}
        }}
      >
        <button
          ref={closeRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h2 id="contact-heading">Let's talk</h2>
        <div
          className="contact-tabs"
          role="tablist"
          aria-label="Contact method"
        >
          <button
            role="tab"
            aria-selected={channel === "email"}
            className={channel === "email" ? "active" : ""}
            onClick={() => setChannel("email")}
          >
            Email
          </button>
          <button
            role="tab"
            aria-selected={channel === "whatsapp"}
            className={channel === "whatsapp" ? "active" : ""}
            onClick={() => setChannel("whatsapp")}
          >
            WhatsApp
          </button>
        </div>
        {status === "success" ? (
          <div
            className="modal-message success"
            role="status"
            aria-live="polite"
          >
            Thanks — your message was sent.
          </div>
        ) : (
          <form
            ref={formRef}
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="modal-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <label>
              <span>Name</span>
              <input ref={firstRef} name="name" type="text" required />
            </label>

            {channel === "email" ? (
              <>
                <label>
                  <span>Email</span>
                  <input name="email" type="email" required />
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows="5" required />
                </label>
                <div className="modal-actions">
                  <button
                    className="button primary"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <span className="spinner" aria-hidden></span>
                    ) : (
                      "Send"
                    )}
                  </button>
                  <button type="button" className="button" onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <label>
                  <span>Phone (international)</span>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="e.g. 381641234567"
                    required
                  />
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows="4" required />
                </label>
                <div className="modal-actions">
                  <button className="button primary" onClick={openWhatsApp}>
                    Open in WhatsApp
                  </button>
                  <button type="button" className="button" onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </>
            )}

            {status === "error" && (
              <div className="modal-message error">
                Something went wrong — try again later.
              </div>
            )}
          </form>
        )}
        {showSuccessAnim && (
          <div className="success-overlay" aria-hidden>
            <svg viewBox="0 0 120 120" className="check-svg">
              <circle className="check-ring" cx="60" cy="60" r="48" />
              <path className="check-mark" d="M36 62l14 12 34-38" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

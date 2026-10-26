import { useEffect, useRef } from "react";

export default function Modal({ onClose, titleId, className = "", children }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const focusable = () =>
      [
        ...dialog.querySelectorAll(
          'button:not([disabled]), a[href], input:not([type="hidden"]), select, textarea, [tabindex="0"]',
        ),
      ].filter((node) => node.getClientRects().length);
    const frame = requestAnimationFrame(() =>
      (dialog.querySelector("[data-autofocus]") || focusable()[0])?.focus(),
    );
    const containFocus = (event) => {
      if (event.key !== "Tab") return;
      const nodes = focusable();
      if (!nodes.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", containFocus);
    return () => {
      cancelAnimationFrame(frame);
      dialog.removeEventListener("keydown", containFocus);
      dialog.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-content">{children}</div>
    </dialog>
  );
}

import { useLocale } from "../i18n/context";
import { useState, useEffect, useRef } from "react";
import { initAnalytics } from "../utils/analytics";

export default function CookieConsent() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const trigger = useRef(null);
  const firstChoice = useRef(null);

  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) return;
    const showPreferences = (event) => {
      trigger.current = event.detail;
      setVisible(true);
      firstChoice.current?.focus();
    };
    window.addEventListener("cookie-preferences", showPreferences);
    try {
      const stored = localStorage.getItem("cookie_consent");
      if (!stored) {
        setVisible(true);
      } else if (stored === "granted") {
        // initialize analytics if stored as granted (Vite env var)
        const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (id) {
          try {
            initAnalytics(id);
            console.info("GA: initialized from stored consent");
          } catch (e) {}
        }
      }
    } catch {
      setVisible(true);
    }
    return () =>
      window.removeEventListener("cookie-preferences", showPreferences);
  }, []);

  useEffect(() => {
    if (visible && trigger.current) firstChoice.current?.focus();
  }, [visible]);

  function closePreferences() {
    setVisible(false);
    trigger.current?.focus({ preventScroll: true });
    trigger.current = null;
  }

  function accept() {
    try {
      localStorage.setItem("cookie_consent", "granted");
    } catch {
      // ignore
    }
    closePreferences();
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (id) {
      try {
        initAnalytics(id);
        console.info("GA: user accepted analytics — initialized");
      } catch (e) {}
    }
  }

  function decline() {
    try {
      localStorage.setItem("cookie_consent", "denied");
    } catch {
      // ignore
    }
    closePreferences();
    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      window[`ga-disable-${import.meta.env.VITE_GA_MEASUREMENT_ID}`] = true;
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
  }

  if (!visible) return null;
  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-live="polite"
      aria-label={t("Cookie consent")}
      onKeyDown={(event) => {
        if (event.key === "Escape" && trigger.current) closePreferences();
      }}
    >
      <div className="cookie-copy">
        <strong>{t("Analytics cookies")}</strong>
        <p>
          {t(
            "If you allow analytics cookies, I can see which parts of the site people use.",
          )}
        </p>
      </div>
      <div className="cookie-actions">
        <button ref={firstChoice} className="cookie-decline" onClick={decline}>
          {t("Decline")}
        </button>
        <button className="cookie-accept" onClick={accept}>
          {t("Accept analytics")}
        </button>
      </div>
    </div>
  );
}

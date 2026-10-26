import { useState, useEffect } from "react";
import { initAnalytics } from "../utils/analytics";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) return;
    const showPreferences = () => setVisible(true);
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
    return () => window.removeEventListener("cookie-preferences", showPreferences);
  }, []);

  function accept() {
    try {
      localStorage.setItem("cookie_consent", "granted");
    } catch {
      // ignore
    }
    setVisible(false);
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
    setVisible(false);
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
      aria-label="Cookie consent"
    >
      <div className="cookie-copy">
        <strong>We use cookies</strong>
        <p>
          To improve site experience and measure usage. Accept analytics to help
          improve the portfolio.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-decline" onClick={decline}>
          Decline
        </button>
        <button className="cookie-accept" onClick={accept}>
          Accept analytics
        </button>
      </div>
    </div>
  );
}

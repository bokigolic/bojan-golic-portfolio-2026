let _initialized = false;
let _measurementId = null;

export function initAnalytics(measurementId) {
  if (!measurementId || _initialized) return;
  _measurementId = measurementId;

  // inject gtag script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Initialize without auto page_view so we can control it
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false, anonymize_ip: true });

  // send an explicit initial page_view
  window.gtag("event", "page_view", { page_path: location.pathname });

  _initialized = true;
}

export function trackEvent(name, params = {}) {
  if (!_initialized || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, params);
  } catch (e) {
    // fail silently
  }
}

export function isInitialized() {
  return _initialized;
}

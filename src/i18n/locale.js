import en from "./en.json";
import sr from "./sr.json";

const LOCALE_KEY = "site_locale";
const AVAILABLE = { en, sr };

export function getStoredLocale() {
  try {
    const v = localStorage.getItem(LOCALE_KEY);
    if (v && AVAILABLE[v]) return v;
  } catch (e) {}
  return "en";
}

export function setStoredLocale(locale) {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch (e) {}
}

export function t(locale, path) {
  const parts = path.split(".");
  let obj = AVAILABLE[locale] || AVAILABLE.en;
  for (const p of parts) {
    if (!obj || typeof obj !== "object") return "";
    obj = obj[p];
  }
  return typeof obj === "string" ? obj : "";
}

export function getAvailableLocales() {
  return Object.keys(AVAILABLE);
}

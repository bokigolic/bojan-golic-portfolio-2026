import { useState, useEffect } from "react";
import {
  getStoredLocale,
  setStoredLocale,
  getAvailableLocales,
} from "../i18n/locale";

export default function LanguageSelector({ onChange }) {
  const [locale, setLocale] = useState(getStoredLocale());
  useEffect(() => {
    setStoredLocale(locale);
    onChange?.(locale);
  }, [locale]);

  const locales = getAvailableLocales();
  return (
    <div className="lang-select" role="toolbar" aria-label="Language selector">
      {locales.map((l) => (
        <button
          key={l}
          className={"lang-btn" + (l === locale ? " active" : "")}
          aria-pressed={l === locale}
          onClick={() => setLocale(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

import { useState, useEffect } from "react";

const THEME_KEY = "site_theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "dark";
    } catch (e) {
      return "dark";
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      aria-pressed={theme === "dark"}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { createLocale, english } from "./i18n/locale";
import { languageForPath, routeForPath } from "./i18n/routes";
import "./styles/portfolio.css";

async function start() {
  const { pathname } = window.location;
  const root = document.getElementById("root");
  const language = languageForPath(pathname);
  const locale =
    language === "en"
      ? english
      : createLocale("sr", (await import("./i18n/sr")).default);
  const element = (
    <StrictMode>
      <ErrorBoundary locale={locale}>
        <App initialPath={pathname} locale={locale} />
      </ErrorBoundary>
    </StrictMode>
  );
  if (
    root.hasChildNodes() &&
    root.dataset.path &&
    languageForPath(root.dataset.path) === language &&
    routeForPath(root.dataset.path) === routeForPath(pathname)
  ) {
    hydrateRoot(root, element);
  } else {
    createRoot(root).render(element);
  }
}

start();

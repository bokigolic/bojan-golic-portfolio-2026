import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/portfolio.css";
const element = (
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
const root = document.getElementById("root");
const normalizePath = (path) => path.replace(/\/$/, "") || "/";
if (
  root.hasChildNodes() &&
  root.dataset.path &&
  normalizePath(root.dataset.path) === normalizePath(window.location.pathname)
)
  hydrateRoot(root, element);
else createRoot(root).render(element);

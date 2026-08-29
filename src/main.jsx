import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import "./portfolio.css";
import "./professional.css";
import useReveal from "./hooks/useReveal";
import useParallax from "./hooks/useParallax";

// initialize small UX hooks (non-React side-effect) early
function InitHooks() {
  useReveal();
  useParallax();
  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InitHooks />
    <App />
  </StrictMode>,
);

import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    const { t } = this.props.locale;
    return (
      <main className="not-found section">
        <h1>{t("The page couldn’t finish loading.")}</h1>
        <p>{t("Reload the page or contact me directly.")}</p>
        <div className="project-actions">
          <a className="button button-dark" href={window.location.href}>
            {t("Reload page")}
          </a>
          <a className="text-link" href="mailto:hello@bojangolic.com">
            {t("Email me")}
          </a>
        </div>
      </main>
    );
  }
}

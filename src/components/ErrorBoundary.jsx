import { Component } from "react";
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main className="error-state section">
          <p className="eyebrow">Something went wrong</p>
          <h1>Let's try that again.</h1>
          <p>
            The page could not finish loading. Reload it or contact me directly.
          </p>
          <a className="button button-dark" href="/">
            Reload portfolio
          </a>
          <a className="text-link" href="mailto:hello@bojangolic.com">
            Email me
          </a>
        </main>
      );
    return this.props.children;
  }
}

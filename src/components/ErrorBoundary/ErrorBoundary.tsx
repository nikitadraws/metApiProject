import React, { Component, ErrorInfo, ReactNode } from "react";
import "./ErrorBoundary.scss"

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="ErrorBoundary">
            <h1>Sorry.. there was an error</h1>
            <h3>We're trying to fix it!</h3>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

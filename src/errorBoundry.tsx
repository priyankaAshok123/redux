/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.

    return { hasError: true, error: error };
  }

  public componentDidCatch() {
    // Do Nothing. 
    // TODO: See if any other form of logging  can be used here.
  }

  public render() {
    if (this.state.hasError) {
      // return global.window?.location.href = `${BASE_URL}/500`;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

"use client";

import { Component, type ReactNode } from "react";

/**
 * Se a cena WebGL falhar (GPU fraca, contexto perdido, etc.),
 * cai para o fallback estático sem quebrar a página.
 */
export default class SceneBoundary extends Component<
  { children: ReactNode; onError?: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

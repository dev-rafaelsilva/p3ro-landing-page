"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      style={{
        position: "fixed",
        bottom: 88,
        right: 16,
        zIndex: 9980,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "var(--color-card)",
        border: "1px solid var(--color-line)",
        color: "var(--color-acc)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)",
        pointerEvents: visible ? "auto" : "none",
        boxShadow: "0 4px 16px rgba(0,0,0,.45)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

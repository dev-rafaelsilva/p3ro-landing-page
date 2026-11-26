"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const INTERACTIVE = "a, button, input, select, textarea, summary, .gtilt-wrap, .ig-tile, [data-cursor]";

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    // Apenas ponteiro fino (mouse/trackpad).
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const dot = ref.current;
    const label = labelRef.current;
    if (!dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      const photo = target?.closest<HTMLElement>("[data-cursor-photo]");
      const hit = target?.closest(INTERACTIVE);
      if (labelled) {
        dot.dataset.label = "true";
        dot.dataset.hover = "false";
        dot.dataset.photo = "false";
        if (label) label.textContent = labelled.dataset.cursorLabel ?? "";
      } else if (photo && !hit) {
        dot.dataset.label = "false";
        dot.dataset.photo = "true";
        dot.dataset.hover = "false";
      } else {
        dot.dataset.label = "false";
        dot.dataset.photo = "false";
        dot.dataset.hover = hit ? "true" : "false";
      }
    };
    const leave = () => {
      dot.style.opacity = "0";
    };
    const enter = () => {
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [reduce]);

  if (reduce || !enabled) return null;
  return (
    <div ref={ref} className="cursor-dot" aria-hidden="true">
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}

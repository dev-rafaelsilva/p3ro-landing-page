"use client";

import { useRef, useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useMagnetic<T extends HTMLElement>(
  threshold = 80
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < threshold) {
        const strength = 1 - dist / threshold;
        gsap.to(el, {
          x: dx * strength * 0.45,
          y: dy * strength * 0.45,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)", overwrite: "auto" });
      }
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.35)", overwrite: "auto" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [threshold]);

  return ref;
}

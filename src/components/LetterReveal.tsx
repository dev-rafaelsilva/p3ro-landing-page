"use client";
import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";

export default function LetterReveal({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const letters = ref.current.querySelectorAll<HTMLElement>("[data-l]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        letters,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.028,
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reduce, delay]);

  return (
    <span ref={ref} className={className} aria-label={children}>
      {children.split("").map((ch, i) => (
        <span
          key={i}
          data-l
          aria-hidden="true"
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : undefined }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

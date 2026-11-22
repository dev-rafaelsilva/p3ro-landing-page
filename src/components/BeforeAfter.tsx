"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useReveal } from "./anim";

const IMG = "/opt/galeria-1.webp";
const IMG_ALT = "Bomba de chocolate com calda";

export default function BeforeAfter() {
  const reveal = useReveal();
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePct = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPct(Math.round((x / rect.width) * 100));
  }, []);

  const onMouseDown = () => setDragging(true);
  const onMouseMove = useCallback(
    (e: MouseEvent) => { if (dragging) updatePct(e.clientX); },
    [dragging, updatePct]
  );
  const onMouseUp = () => setDragging(false);

  const onTouchStart = () => setDragging(true);
  const onTouchMove = useCallback(
    (e: TouchEvent) => { if (dragging) updatePct(e.touches[0].clientX); },
    [dragging, updatePct]
  );
  const onTouchEnd = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onTouchMove]);

  return (
    <section
      aria-labelledby="ba-title"
      style={{
        paddingBlock: "clamp(52px, 8vw, 96px)",
        borderTop: "1px solid var(--color-lineSoft)",
        position: "relative",
      }}
    >
      <div className="container">
        <motion.div
          {...reveal}
          style={{ marginBottom: "clamp(28px, 4vw, 48px)", maxWidth: "42ch" }}
        >
          <p className="eyebrow">Direção de arte</p>
          <h2 id="ba-title" className="title-lg" style={{ marginTop: "clamp(10px, 1.5vw, 16px)" }}>
            A diferença está nos detalhes
          </h2>
          <p className="lead" style={{ marginTop: 12 }}>
            Arraste o divisor para ver o impacto da direção de arte e da luz profissional.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          {...reveal}
          ref={containerRef}
          aria-label="Comparação antes e depois"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 860,
            margin: "0 auto",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            borderRadius: 4,
            border: "1px solid var(--color-line)",
            cursor: dragging ? "grabbing" : "ew-resize",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          {/* Lado "antes" — grayscale + baixa saturação */}
          <div style={{ position: "absolute", inset: 0 }}>
            <Image
              src={IMG}
              alt={`Antes: ${IMG_ALT}`}
              fill
              sizes="(max-width: 860px) 100vw, 860px"
              className="object-cover"
              style={{
                filter: "grayscale(0.85) brightness(0.68) contrast(0.82) saturate(0.3)",
                transition: reduce ? "none" : "filter 0.1s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "auto 0 0 0",
                background: "linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 50%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 14,
                left: 16,
                fontFamily: "var(--font-sora)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(240,232,219,.7)",
              }}
            >
              Sem direção
            </span>
          </div>

          {/* Lado "depois" — foto original */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(0 ${100 - pct}% 0 0)`,
            }}
          >
            <Image
              src={IMG}
              alt={`Depois: ${IMG_ALT}`}
              fill
              sizes="(max-width: 860px) 100vw, 860px"
              className="object-cover"
            />
            <div
              style={{
                position: "absolute",
                inset: "auto 0 0 0",
                background: "linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 50%)",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 14,
                right: 16,
                fontFamily: "var(--font-sora)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-acc)",
              }}
            >
              Com direção P3ro
            </span>
          </div>

          {/* Handle */}
          <div
            className="ba-handle"
            style={{ left: `${pct}%` }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <div className="ba-knob" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="8 4 4 12 8 20" />
                <polyline points="16 4 20 12 16 20" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

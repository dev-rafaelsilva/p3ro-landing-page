"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const DURATION = 2400; // ms que a barra leva para encher
const EXIT_DELAY = 320; // ms de pausa após a barra completar antes de sair

export default function SplashScreen() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0); // 0–1
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Trava scroll durante o splash
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (reduce) {
      setVisible(false);
      document.body.style.overflow = prev;
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / DURATION);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = prev;
        }, EXIT_DELAY);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = prev;
    };
  }, [reduce]);

  // Easing suave para a barra: começa rápido, acelera no fim
  const eased = progress < 0.5
    ? 2 * progress * progress
    : -1 + (4 - 2 * progress) * progress;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "#09060A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {/* Wordmark central */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
            style={{ textAlign: "center" }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(72px, 14vw, 140px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#F0E8DB",
              }}
            >
              {site.studio}
            </span>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{
                display: "block",
                marginTop: "clamp(10px, 1.5vw, 18px)",
                fontFamily: "var(--font-sora), system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "#8A7B6E",
              }}
            >
              Fotografia gastronômica
            </motion.span>
          </motion.div>

          {/* Barra de progresso */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              position: "absolute",
              bottom: "clamp(32px, 6vh, 60px)",
              left: "clamp(24px, 5vw, 60px)",
              right: "clamp(24px, 5vw, 60px)",
            }}
          >
            {/* Track */}
            <div
              style={{
                width: "100%",
                height: 1,
                background: "rgba(240, 232, 219, 0.1)",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              {/* Fill */}
              <div
                style={{
                  height: "100%",
                  width: `${eased * 100}%`,
                  background: "linear-gradient(90deg, #8A6830, #C8A96E, #DFC08A)",
                  borderRadius: 999,
                  transformOrigin: "left",
                  transition: "width 0.05s linear",
                }}
              />
            </div>

            {/* Percentual */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sora), system-ui, sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(138, 123, 110, 0.5)",
                }}
              >
                {site.city}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sora), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  color: "rgba(200, 169, 110, 0.7)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {Math.round(eased * 100)}
              </span>
            </div>
          </motion.div>

          {/* Linha decorativa central sutil */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              marginTop: "clamp(60px, 10vw, 100px)",
              width: "clamp(40px, 6vw, 70px)",
              height: 1,
              background: "rgba(200, 169, 110, 0.3)",
              transformOrigin: "center",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

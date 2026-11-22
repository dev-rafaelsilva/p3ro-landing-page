"use client";

import { motion, useReducedMotion } from "framer-motion";
import Counter from "./Counter";
import { useReveal } from "./anim";

const STATS = [
  { value: 3, suffix: "+", label: "Anos de experiência" },
  { value: 60, suffix: "+", label: "Sessões realizadas" },
  { value: 20, suffix: "+", label: "Marcas atendidas" },
  { value: 100, suffix: "%", label: "Clientes satisfeitos" },
];

export default function Stats() {
  const reveal = useReveal();
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Números"
      style={{
        paddingBlock: "clamp(56px, 8vw, 96px)",
        borderTop: "1px solid var(--color-lineSoft)",
        position: "relative",
      }}
    >
      <div className="container">
        <motion.div
          {...reveal}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(24px, 4vw, 48px)",
          }}
          className="max-[640px]:!grid-cols-2"
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(40px, 6vw, 72px)",
                  lineHeight: 1,
                  color: "var(--color-acc)",
                  letterSpacing: "-0.02em",
                }}
              >
                {reduce ? (
                  <>{s.value}{s.suffix}</>
                ) : (
                  <Counter value={s.value} suffix={s.suffix} duration={1800} />
                )}
              </p>
              <p
                style={{
                  marginTop: "clamp(6px, 1vw, 10px)",
                  fontFamily: "var(--font-sora)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-mut)",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

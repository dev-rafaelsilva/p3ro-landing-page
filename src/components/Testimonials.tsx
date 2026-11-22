"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useReveal } from "./anim";

/* ─── ESBOÇO — substituir pelos depoimentos reais do Gustavo ─── */
const PLACEHOLDER = [
  {
    name: "Ana Carolina M.",
    role: "Proprietária · Restaurante [Nome]",
    text: "As fotos transformaram completamente o nosso cardápio. Os clientes perguntam muito mais sobre os pratos depois que trocamos as imagens. O retorno foi imediato.",
    rating: 5,
    initials: "AC",
  },
  {
    name: "Marcos Oliveira",
    role: "Chef · [Nome do estabelecimento]",
    text: "Gustavo entendeu perfeitamente a identidade do nosso restaurante. As fotos têm aquela luz especial que a gente não conseguia com celular — faz toda a diferença no iFood.",
    rating: 5,
    initials: "MO",
  },
  {
    name: "Juliana Ferreira",
    role: "Gestora · [Nome da confeitaria]",
    text: "Profissional, pontual e com um olhar único para alimentos. Nossas vendas online aumentaram muito depois do ensaio. Recomendo sem hesitar.",
    rating: 5,
    initials: "JF",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span aria-label={`${count} de 5 estrelas`} style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "var(--color-acc)" : "none"}
          stroke="var(--color-acc)"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const reveal = useReveal();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = PLACEHOLDER.length;

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!reduce) {
      timerRef.current = setInterval(() => {
        setActive((i) => (i + 1) % count);
      }, 5000);
    }
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const goTo = (i: number) => {
    setActive(i);
    startTimer();
  };

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      style={{
        paddingBlock: "clamp(52px, 8vw, 96px)",
        borderTop: "1px solid var(--color-lineSoft)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Nota de esboço visível só em dev — remover antes de publicar */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            padding: "4px 10px",
            background: "rgba(200,169,110,0.15)",
            border: "1px solid rgba(200,169,110,0.3)",
            borderRadius: 4,
            fontFamily: "var(--font-sora)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-acc)",
            zIndex: 10,
          }}
        >
          Esboço — aguardando depoimentos reais
        </div>
      )}

      <div className="container">
        <motion.div
          {...reveal}
          style={{ marginBottom: "clamp(32px, 5vw, 56px)", textAlign: "center" }}
        >
          <p className="eyebrow justify-center">Depoimentos</p>
          <h2
            id="depoimentos-title"
            className="title-lg"
            style={{ marginTop: "clamp(10px, 1.5vw, 16px)", maxWidth: "28ch", margin: "clamp(10px,1.5vw,16px) auto 0" }}
          >
            O que dizem os clientes
          </h2>
        </motion.div>

        {/* Carrossel */}
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-line)",
                borderRadius: 4,
                padding: "clamp(24px, 4vw, 44px)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Quote mark */}
              <span
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontSize: 64,
                  lineHeight: 0.6,
                  color: "var(--color-acc)",
                  opacity: 0.35,
                  display: "block",
                  marginBottom: 4,
                }}
              >
                "
              </span>

              <Stars count={PLACEHOLDER[active].rating} />

              <p
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(16px, 2vw, 22px)",
                  lineHeight: 1.55,
                  color: "var(--color-cream)",
                  letterSpacing: "-0.01em",
                }}
              >
                "{PLACEHOLDER[active].text}"
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 8, borderTop: "1px solid var(--color-lineSoft)" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--color-brand), var(--color-acc))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-sora)",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#130A06",
                    flexShrink: 0,
                  }}
                >
                  {PLACEHOLDER[active].initials}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 14, color: "var(--color-cream)" }}>
                    {PLACEHOLDER[active].name}
                  </p>
                  <p style={{ fontFamily: "var(--font-sora)", fontSize: 12, color: "var(--color-mut)", marginTop: 2 }}>
                    {PLACEHOLDER[active].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginTop: 24,
            }}
          >
            {PLACEHOLDER.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Depoimento ${i + 1}`}
                aria-current={i === active}
                style={{
                  width: i === active ? 24 : 7,
                  height: 7,
                  borderRadius: 999,
                  border: "none",
                  background: i === active ? "var(--color-acc)" : "var(--color-line)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

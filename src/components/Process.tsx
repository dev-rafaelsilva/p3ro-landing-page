"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useReveal } from "./anim";
import LineReveal from "./LineReveal";

const STEPS = [
  {
    num: "01",
    title: "Briefing",
    text: "Conversa sobre o cardápio, o público e onde as fotos serão usadas. Definimos juntos o estilo e a direção de arte.",
  },
  {
    num: "02",
    title: "Produção",
    text: "Sessão no seu espaço ou em estúdio. Cuido da luz, composição, louças de apoio e direção de arte.",
  },
  {
    num: "03",
    title: "Edição",
    text: "Tratamento profissional de cada imagem: cor, contraste, nitidez e retoque para despertar apetite.",
  },
  {
    num: "04",
    title: "Entrega",
    text: "Arquivos prontos para cardápio, delivery, redes sociais e mídia. Prazo de 5 a 7 dias úteis.",
  },
];

export default function Process() {
  const reveal = useReveal();
  const reduce = useReducedMotion();
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !stepsRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Linha de progresso cresce da esquerda
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 0.8,
          },
        }
      );

      // Cada step entra com stagger
      const steps = gsap.utils.toArray<HTMLElement>(".proc-step", stepsRef.current!);
      gsap.fromTo(
        steps,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: stepsRef.current, start: "top 78%" },
        }
      );
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      aria-labelledby="process-title"
      style={{
        paddingBlock: "clamp(52px, 8vw, 96px)",
        borderTop: "1px solid var(--color-lineSoft)",
        position: "relative",
      }}
    >
      <div className="container">
        <motion.div {...reveal} style={{ marginBottom: "clamp(36px, 5vw, 60px)" }}>
          <p className="eyebrow">Como funciona</p>
          <LineReveal as="h2" id="process-title" className="title-lg" style={{ marginTop: "clamp(10px, 1.5vw, 16px)", maxWidth: "22ch" }}>
            Do briefing à entrega
          </LineReveal>
        </motion.div>

        {/* Steps container */}
        <div ref={stepsRef} style={{ position: "relative" }}>
          {/* Linha de progresso (desktop) */}
          <div
            className="max-[768px]:hidden"
            style={{
              position: "absolute",
              top: 24,
              left: "12.5%",
              right: "12.5%",
              height: 1,
              background: "var(--color-lineSoft)",
              zIndex: 0,
            }}
          >
            <div
              ref={lineRef}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, var(--color-brand), var(--color-acc))",
                transformOrigin: "left center",
                transform: "scaleX(0)",
              }}
            />
          </div>

          {/* Grid de steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "clamp(20px, 3vw, 32px)",
            }}
            className="max-[768px]:!grid-cols-1 max-[768px]:gap-0"
          >
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="proc-step max-[768px]:flex max-[768px]:gap-5 max-[768px]:border-l max-[768px]:border-lineSoft max-[768px]:pl-5 max-[768px]:pb-8 max-[768px]:ml-6"
                style={{ position: "relative", textAlign: "center" }}
              >
                {/* Círculo numerado */}
                <div
                  className="max-[768px]:shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--color-bg2)",
                    border: "1px solid var(--color-line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto clamp(16px,2vw,24px)",
                    position: "relative",
                    zIndex: 1,
                    fontFamily: "var(--font-fraunces)",
                    fontSize: 18,
                    color: "var(--color-acc)",
                    fontWeight: 300,
                  }}
                >
                  {step.num}
                </div>

                <div className="max-[768px]:text-left">
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontWeight: 400,
                      fontSize: "clamp(16px, 2vw, 22px)",
                      letterSpacing: "-0.01em",
                      color: "var(--color-cream)",
                      marginBottom: 10,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--color-mut)",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

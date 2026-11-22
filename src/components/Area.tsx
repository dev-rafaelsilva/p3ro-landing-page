"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "./anim";

const CITIES = [
  { name: "Ribeirão Preto", primary: true },
  { name: "Franca", primary: false },
  { name: "São Carlos", primary: false },
  { name: "Araraquara", primary: false },
  { name: "Bauru", primary: false },
  { name: "Interior SP", primary: false },
];

const PIN_ICON = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function Area() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="area"
      className="section"
      aria-labelledby="area-title"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "clamp(32px, 5vw, 80px)",
            alignItems: "center",
          }}
          className="max-[800px]:!flex max-[800px]:flex-col max-[800px]:gap-10"
        >
          {/* Coluna esquerda — headline */}
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
            >
              Área de atuação
            </motion.p>

            <motion.h2
              id="area-title"
              className="title-lg mt-4"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              Ribeirão Preto e{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-acc)", fontWeight: 300 }}>
                região
              </em>
            </motion.h2>

            <motion.p
              className="lead mt-5"
              style={{ maxWidth: "32ch" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            >
              Atendo presencialmente no interior paulista. Para projetos especiais, estou disponível para viagens.
            </motion.p>
          </div>

          {/* Coluna direita — pills de cidades */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(10px, 1.5vw, 14px)",
              }}
            >
              {CITIES.map((city, i) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.55,
                    ease: EASE,
                    delay: 0.3 + i * 0.07,
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    paddingInline: city.primary ? "clamp(16px,2vw,22px)" : "clamp(14px,1.8vw,20px)",
                    paddingBlock: city.primary ? 12 : 10,
                    borderRadius: 999,
                    border: city.primary
                      ? "1px solid var(--color-acc)"
                      : "1px solid var(--color-line)",
                    background: city.primary
                      ? "color-mix(in srgb, var(--color-acc) 10%, transparent)"
                      : "transparent",
                    color: city.primary ? "var(--color-acc)" : "var(--color-cream)",
                    fontFamily: "var(--font-sora), system-ui, sans-serif",
                    fontSize: city.primary ? 14 : 13,
                    fontWeight: city.primary ? 600 : 400,
                    letterSpacing: "0.03em",
                    transition: "border-color 0.25s ease, background 0.25s ease",
                  }}
                >
                  <span
                    style={{
                      color: city.primary ? "var(--color-acc)" : "var(--color-mut)",
                      flexShrink: 0,
                    }}
                  >
                    {PIN_ICON}
                  </span>
                  {city.name}
                  {city.primary && (
                    <span
                      style={{
                        marginLeft: 4,
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--color-brand)",
                      }}
                    >
                      Base
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Nota de viagem */}
            <p
              style={{
                marginTop: "clamp(20px, 3vh, 32px)",
                fontSize: 13,
                color: "var(--color-mut)",
                fontFamily: "var(--font-sora), system-ui, sans-serif",
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 32,
                  height: 1,
                  background: "var(--color-line)",
                  flexShrink: 0,
                }}
              />
              Consulte disponibilidade para outras localidades
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

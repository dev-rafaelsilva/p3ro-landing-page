"use client";

import { motion } from "framer-motion";
import { pricing } from "@/data/site";
import { useReveal } from "./anim";

export default function Pricing() {
  const reveal = useReveal();

  return (
    <section id="precos" aria-labelledby="precos-title" className="section-light">
      <div className="container">
        <motion.div {...reveal} style={{ maxWidth: "52ch", marginBottom: "clamp(48px, 7vw, 88px)" }}>
          <p className="eyebrow">{pricing.eyebrow}</p>
          <h2
            id="precos-title"
            className="title-lg"
            style={{ marginTop: "clamp(14px, 2vw, 20px)", color: "var(--color-light-ink)" }}
          >
            {pricing.title}
          </h2>
        </motion.div>

        {/* Layout: 3 cards editoriais — sem simetria forçada */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(16px, 2.5vw, 32px)",
          }}
          className="max-[800px]:!grid-cols-1"
        >
          {pricing.packages.map((pkg) => (
            <PriceCard key={pkg.name} item={pkg} />
          ))}
        </div>

        <motion.p
          {...reveal}
          style={{
            marginTop: 24,
            fontSize: 13,
            color: "var(--color-light-mut)",
            fontFamily: "var(--font-sora)",
            letterSpacing: "0.06em",
          }}
        >
          {pricing.note}
        </motion.p>
      </div>
    </section>
  );
}

function PriceCard({ item }: { item: (typeof pricing.packages)[number] }) {
  const reveal = useReveal();
  const hi = item.highlight;

  return (
    <motion.div
      {...reveal}
      className={`price-card${hi ? " highlight" : ""}`}
      style={{ color: "var(--color-light-ink)" }}
    >
      {hi && (
        <span
          style={{
            display: "inline-block",
            marginBottom: 20,
            fontFamily: "var(--font-sora)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-light-acc)",
            padding: "5px 12px",
            border: "1px solid var(--color-light-acc)",
            borderRadius: 999,
          }}
        >
          Mais escolhido
        </span>
      )}

      {/* Duração */}
      <p
        style={{
          fontFamily: "var(--font-sora)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--color-light-mut)",
          marginBottom: 10,
        }}
      >
        {item.duration}
      </p>

      {/* Nome + preço em linha */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <h3
          style={{
            fontFamily: "var(--font-fraunces)",
            fontWeight: 400,
            fontSize: "clamp(26px, 3.2vw, 40px)",
            letterSpacing: "-0.02em",
            color: "var(--color-light-ink)",
          }}
        >
          {item.name}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-sora)",
            fontWeight: 600,
            fontSize: "clamp(22px, 2.6vw, 32px)",
            color: hi ? "var(--color-light-acc)" : "var(--color-light-ink)",
            whiteSpace: "nowrap",
          }}
        >
          {item.price}
        </span>
      </div>

      {/* Divisor */}
      <div
        style={{
          height: 1,
          background: "var(--color-light-line)",
          margin: "20px 0",
        }}
      />

      <p
        style={{
          fontSize: 15,
          color: "var(--color-light-mut)",
          lineHeight: 1.6,
          marginBottom: 24,
        }}
      >
        {item.description}
      </p>

      <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {item.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 14,
              color: "var(--color-light-mut)",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 16,
                height: 16,
                marginTop: 2,
                borderRadius: "50%",
                border: `1px solid ${hi ? "var(--color-light-acc)" : "var(--color-light-line)"}`,
                display: "grid",
                placeItems: "center",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: hi ? "var(--color-light-acc)" : "var(--color-light-mut)",
                }}
              />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#contato"
        className="btn"
        style={{
          width: "100%",
          background: hi ? "var(--color-light-ink)" : "transparent",
          color: hi ? "var(--color-cream)" : "var(--color-light-ink)",
          border: `1px solid ${hi ? "var(--color-light-ink)" : "var(--color-light-line)"}`,
        }}
        data-cursor
      >
        Quero este
      </a>
    </motion.div>
  );
}

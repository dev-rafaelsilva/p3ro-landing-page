"use client";

import { motion } from "framer-motion";
import { services } from "@/data/site";
import { useReveal } from "./anim";

export default function Services() {
  const reveal = useReveal();

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="section-light"
    >
      <div className="container">
        <motion.div {...reveal} style={{ maxWidth: "52ch", marginBottom: "clamp(48px, 7vw, 88px)" }}>
          <p className="eyebrow">{services.eyebrow}</p>
          <h2
            id="servicos-title"
            className="title-lg"
            style={{ marginTop: "clamp(14px, 2vw, 20px)" }}
          >
            {services.title}
          </h2>
        </motion.div>

        <div>
          {services.list.map((item) => (
            <ServiceRow key={item.num} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ item }: { item: (typeof services.list)[number] }) {
  const reveal = useReveal();
  return (
    <motion.div
      {...reveal}
      className="svc-row"
      style={{ color: "var(--color-light-ink)" }}
    >
      <span
        className="svc-num"
        style={{
          fontFamily: "var(--font-sora)",
          fontWeight: 500,
          fontSize: "clamp(32px, 4vw, 48px)",
          lineHeight: 1,
          color: "var(--color-light-acc)",
          opacity: 0.5,
        }}
      >
        {item.num}
      </span>

      <h3
        className="svc-title"
        style={{
          fontFamily: "var(--font-fraunces)",
          fontWeight: 400,
          fontSize: "clamp(22px, 2.8vw, 34px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.08,
          color: "var(--color-light-ink)",
        }}
      >
        {item.title}
      </h3>

      <p
        className="svc-desc"
        style={{ fontSize: 16, color: "var(--color-light-mut)", lineHeight: 1.7 }}
      >
        {item.text}
      </p>
    </motion.div>
  );
}

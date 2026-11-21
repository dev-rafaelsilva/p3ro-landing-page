"use client";

import { motion } from "framer-motion";
import { services } from "@/data/site";
import { useReveal } from "./anim";

const LINE = "#d3bfa6";
const INK = "#1A0F0A";
const NUM = "#B85A1E";
const SECONDARY = "#4d3a2d";

function ServiceRow({ item }: { item: (typeof services.list)[number] }) {
  const reveal = useReveal();
  return (
    <motion.div {...reveal} className="svc-row">
      <span
        className="svc-num"
        style={{ fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 44, lineHeight: 1, color: NUM }}
      >
        {item.num}
      </span>
      <h3
        className="svc-title"
        style={{
          fontFamily: "var(--font-sora)",
          fontWeight: 600,
          fontSize: "clamp(22px,3vw,30px)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: INK,
        }}
      >
        {item.title}
      </h3>
      <p className="svc-desc" style={{ fontSize: 17, color: SECONDARY }}>
        {item.text}
      </p>
    </motion.div>
  );
}

export default function Services() {
  const reveal = useReveal();

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="section-plain"
      style={{ background: "#F5E9DA", color: INK }}
    >
      <div className="container">
        <motion.div {...reveal}>
          <p className="eyebrow" style={{ color: "#A5501A" }}>
            {services.eyebrow}
          </p>
          <h2 id="servicos-title" className="title-lg mt-4" style={{ color: INK }}>
            {services.title}
          </h2>
        </motion.div>

        <div className="mt-10" style={{ borderColor: LINE }}>
          {services.list.map((item) => (
            <ServiceRow key={item.num} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { pricing } from "@/data/site";
import { useReveal } from "./anim";

const CARD = "#FFFBF4";
const INK = "#1A0F0A";
const LINE = "#d3bfa6";
const SECONDARY = "#4d3a2d";

function Package({ item }: { item: (typeof pricing.packages)[number] }) {
  const reveal = useReveal();
  const hi = item.highlight;
  return (
    <motion.div
      {...reveal}
      className="flex flex-col rounded-2xl border p-8"
      style={{
        background: hi ? "var(--color-acc)" : CARD,
        borderColor: hi ? "var(--color-acc)" : LINE,
        color: INK,
      }}
    >
      {hi && (
        <span className="mb-4 inline-flex w-fit rounded-full bg-[#1A0F0A] px-3 py-1 text-[12px] font-semibold text-cream">
          Mais escolhido
        </span>
      )}
      <h3 style={{ fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 24 }}>{item.name}</h3>
      <p className="mt-2 text-[15px]" style={{ color: hi ? "rgba(26,15,10,.8)" : SECONDARY }}>
        {item.description}
      </p>
      <p className="mt-5" style={{ fontFamily: "var(--font-sora)", fontWeight: 700, fontSize: 32 }}>
        {item.price}
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {item.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[15px]" style={{ color: hi ? INK : SECONDARY }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-none" aria-hidden="true">
              <path d="M5 12l4.5 4.5L19 7" stroke={hi ? "#1A0F0A" : "var(--color-acc)"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <a
        href="#contato"
        className="btn mt-8 w-full"
        style={
          hi
            ? { background: "#1A0F0A", color: "var(--color-cream)", border: "1px solid #1A0F0A" }
            : { background: "var(--color-acc)", color: "#1A0F0A", border: "1px solid var(--color-acc)" }
        }
      >
        Quero este
      </a>
    </motion.div>
  );
}

export default function Pricing() {
  const reveal = useReveal();

  return (
    <section id="precos" aria-labelledby="precos-title" className="section-light">
      <div className="container">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="eyebrow">{pricing.eyebrow}</p>
          <h2 id="precos-title" className="title-lg mt-4">
            {pricing.title}
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {pricing.packages.map((item) => (
            <Package key={item.name} item={item} />
          ))}
        </div>

        <p className="mt-6 text-[14px]" style={{ color: SECONDARY }}>
          {pricing.note}
        </p>
      </div>
    </section>
  );
}

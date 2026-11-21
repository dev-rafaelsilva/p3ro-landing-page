"use client";

import { motion } from "framer-motion";
import { trust } from "@/data/site";
import { useReveal } from "./anim";

export default function Trust() {
  const reveal = useReveal();

  return (
    <motion.section
      {...reveal}
      aria-label={trust.label}
      className="border-y border-lineSoft"
    >
      <div className="container flex flex-wrap items-center gap-x-6 gap-y-2 py-7">
        <span
          className="text-mut"
          style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em" }}
        >
          {trust.label}
        </span>
        <span
          className="text-cream"
          style={{ fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em" }}
        >
          {trust.name}
        </span>
      </div>
    </motion.section>
  );
}

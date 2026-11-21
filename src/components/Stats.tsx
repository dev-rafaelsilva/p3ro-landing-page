"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/site";
import { useReveal } from "./anim";
import Counter from "./Counter";

export default function Stats() {
  const reveal = useReveal();

  return (
    <motion.section {...reveal} aria-label="Números" className="border-b border-lineSoft">
      <div className="container grid grid-cols-4 gap-6 py-12 max-[620px]:grid-cols-2 max-[620px]:gap-8">
        {stats.items.map((s) => (
          <div key={s.label} className="text-center">
            <p
              className="text-acc"
              style={{ fontFamily: "var(--font-sora)", fontWeight: 700, fontSize: "clamp(34px,5vw,52px)", lineHeight: 1 }}
            >
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-[14px] text-mut">{s.label}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

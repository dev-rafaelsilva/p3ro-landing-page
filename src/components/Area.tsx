"use client";

import { motion } from "framer-motion";
import { area } from "@/data/site";
import { useReveal } from "./anim";

export default function Area() {
  const reveal = useReveal();

  return (
    <section aria-labelledby="area-title" className="section-plain">
      <div className="container grid grid-cols-2 items-center gap-10 max-[900px]:grid-cols-1">
        <motion.div {...reveal}>
          <p className="eyebrow">{area.eyebrow}</p>
          <h2 id="area-title" className="title-lg mt-4">
            {area.title}
          </h2>
          <p className="lead mt-5 max-w-[520px]">{area.text}</p>
        </motion.div>

        <motion.div {...reveal} className="overflow-hidden rounded-2xl border border-line">
          <iframe
            src={area.mapSrc}
            title="Mapa de Ribeirão Preto"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full"
            style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

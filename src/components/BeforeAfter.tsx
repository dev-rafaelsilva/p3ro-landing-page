"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { beforeAfter } from "@/data/site";
import { useReveal } from "./anim";

export default function BeforeAfter() {
  const reveal = useReveal();
  const [pos, setPos] = useState(50);

  return (
    <section aria-labelledby="ba-title" className="section-plain">
      <div className="container">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="eyebrow">{beforeAfter.eyebrow}</p>
          <h2 id="ba-title" className="title-lg mt-4">
            {beforeAfter.title}
          </h2>
          <p className="lead mt-5">{beforeAfter.text}</p>
        </motion.div>

        <motion.div
          {...reveal}
          className="relative mt-10 select-none overflow-hidden rounded-2xl border border-line"
          style={{ aspectRatio: "16 / 10" }}
        >
          <Image
            src={beforeAfter.after.src}
            alt={beforeAfter.after.alt}
            fill
            sizes="(max-width: 900px) 100vw, 1100px"
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image
              src={beforeAfter.before.src}
              alt={beforeAfter.before.alt}
              fill
              sizes="(max-width: 900px) 100vw, 1100px"
              className="object-cover"
            />
          </div>

          <span className="absolute left-3 top-3 rounded-full bg-[rgba(26,15,10,.7)] px-3 py-1 text-[12px] font-semibold text-cream">
            {beforeAfter.labelBefore}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-[rgba(26,15,10,.7)] px-3 py-1 text-[12px] font-semibold text-cream">
            {beforeAfter.labelAfter}
          </span>

          <div className="ba-handle" style={{ left: `${pos}%` }}>
            <span className="ba-knob" aria-hidden="true">
              ⇆
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Comparar antes e depois do tratamento da foto"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </motion.div>
      </div>
    </section>
  );
}

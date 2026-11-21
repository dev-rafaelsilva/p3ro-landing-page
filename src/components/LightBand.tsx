"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { lightBand } from "@/data/site";

export default function LightBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="luz-title"
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "clamp(380px,60vw,620px)" }}
    >
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y }}
        className="absolute inset-[-10%]"
      >
        <Image
          src={lightBand.image.src}
          alt={lightBand.image.alt}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(rgba(26,15,10,.6), rgba(26,15,10,.8))" }}
      />

      <div className="container relative z-10">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="eyebrow">{lightBand.eyebrow}</p>
          <h2
            id="luz-title"
            className="mt-4 text-cream"
            style={{
              fontFamily: "var(--font-sora)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              fontSize: "clamp(32px,5.6vw,62px)",
            }}
          >
            {lightBand.title}
          </h2>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { polaroid } from "@/data/site";
import { useReveal } from "./anim";

const ROTATIONS = [-5, 3, -2.5, 6, -4, 2];
const OFFSETS_Y = [0, 14, -8, 6, -12, 10];

export default function PolaroidGallery() {
  const reveal = useReveal();
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="polaroid-title" className="section-plain overflow-hidden">
      <div className="container">
        <motion.div {...reveal}>
          <p className="eyebrow">{polaroid.eyebrow}</p>
          <h2 id="polaroid-title" className="title-lg mt-4">
            {polaroid.title}
          </h2>
        </motion.div>

        <div
          className="mt-14 flex flex-wrap items-center justify-center"
          style={{ gap: "clamp(12px, 2vw, 24px)", paddingBlock: "20px 40px" }}
        >
          {polaroid.items.map((item, i) => {
            const rotation = reduce ? 0 : ROTATIONS[i % ROTATIONS.length];
            const offsetY = reduce ? 0 : OFFSETS_Y[i % OFFSETS_Y.length];
            return (
              <motion.div
                key={item.src}
                initial={reduce ? false : { opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: offsetY, rotate: rotation }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={
                  reduce
                    ? undefined
                    : { y: offsetY - 16, rotate: rotation * 0.25, scale: 1.08, zIndex: 20 }
                }
                className="relative select-none"
                style={{
                  background: "#F0EBE3",
                  padding: "10px 10px 48px",
                  boxShadow:
                    "0 4px 16px rgba(0,0,0,.5), 0 18px 48px rgba(0,0,0,.3)",
                  width: "clamp(136px, 17vw, 196px)",
                  flexShrink: 0,
                  cursor: "default",
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "1 / 1", background: "#1A0F0A" }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 620px) 136px, 196px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-caveat)",
                    fontSize: "clamp(14px, 1.5vw, 18px)",
                    color: "#2a1a0e",
                    textAlign: "center",
                    marginTop: "10px",
                    lineHeight: 1.3,
                  }}
                >
                  {item.caption}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

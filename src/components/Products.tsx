"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/site";
import { useReveal } from "./anim";
import { BLUR_AMBER } from "@/lib/blur";

export default function Products() {
  const reveal = useReveal();

  return (
    <section id="produtos" aria-labelledby="produtos-title" className="section-light">
      <div className="container">
        <motion.div {...reveal} className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">{products.eyebrow}</p>
            <h2 id="produtos-title" className="title-lg mt-4">
              {products.title}
            </h2>
          </div>
          <span className="text-[14px]" style={{ color: "#4d3a2d" }}>
            Arraste para o lado →
          </span>
        </motion.div>

        <motion.div {...reveal} className="carousel mt-10">
          {products.items.map((item) => (
            <article key={item.src} className="zoomwrap">
              <div className="overflow-hidden rounded-xl border" style={{ aspectRatio: "3 / 4", borderColor: "#d3bfa6" }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1029}
                  height={1400}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_AMBER}
                  sizes="(max-width: 620px) 60vw, 300px"
                  className="zoomimg h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-[15px] font-medium" style={{ color: "#1A0F0A" }}>
                {item.name}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

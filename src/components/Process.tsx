"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { howItWorks as proc } from "@/data/site";
import { useReveal } from "./anim";

export default function Process() {
  const reveal = useReveal();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="processo" aria-labelledby="processo-title" className="section-plain relative overflow-hidden">
      <div className="container relative">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="eyebrow">{proc.eyebrow}</p>
          <h2 id="processo-title" className="title-lg mt-4">
            {proc.title}
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-0">
          {/* Imagem fixa (desktop) */}
          <div className="max-[900px]:hidden">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-2xl border border-line" style={{ aspectRatio: "4 / 5" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={proc.steps[active].image.src}
                      alt={proc.steps[active].image.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <span className="watermark" style={{ right: 20, bottom: -10, fontSize: 180 }}>
                  {proc.steps[active].num}
                </span>
              </div>
            </div>
          </div>

          {/* Passos */}
          <div>
            {proc.steps.map((step, i) => (
              <div
                key={step.num}
                data-index={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="flex min-h-[60vh] flex-col justify-center border-t border-lineSoft py-10 first:border-t-0 max-[900px]:min-h-0"
              >
                <span
                  className="text-acc"
                  style={{ fontFamily: "var(--font-sora)", fontWeight: 700, fontSize: 44, lineHeight: 1, opacity: active === i ? 1 : 0.4 }}
                >
                  {step.num}
                </span>
                <h3 className="mt-3" style={{ fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: "clamp(22px,3vw,32px)", color: "var(--color-cream)" }}>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[460px] text-mut">{step.text}</p>

                {/* Imagem inline (mobile) */}
                <div className="mt-6 hidden overflow-hidden rounded-2xl border border-line max-[900px]:block" style={{ aspectRatio: "4 / 5" }}>
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    sizes="100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

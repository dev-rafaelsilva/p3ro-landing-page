"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { lightBand } from "@/data/site";
import { gsap } from "@/lib/gsap";

export default function Manifesto() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const words = lightBand.title.split(" ");

  useEffect(() => {
    if (reduce || !root.current) return;
    const el = root.current;

    const ctx = gsap.context(() => {
      // Parallax da foto de fundo (sem pin — robusto).
      gsap.fromTo(
        imgRef.current,
        { yPercent: -14, scale: 1.16 },
        {
          yPercent: 14,
          scale: 1.22,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // Revelação palavra a palavra, amarrada ao scroll.
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".mf-word", el),
        { opacity: 0.22, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: { trigger: el, start: "top 78%", end: "center 55%", scrub: 0.6 },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={root}
      aria-label={lightBand.eyebrow}
      className="relative flex min-h-[86svh] items-center overflow-hidden"
    >
      <div ref={imgRef} className="absolute inset-0" aria-hidden="true">
        <Image
          src={lightBand.image.src}
          alt={lightBand.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(130% 110% at 50% 45%, rgba(11,7,6,.26), rgba(11,7,6,.68) 80%)",
        }}
      />

      <div className="container relative z-10 text-center">
        <p className="eyebrow justify-center">{lightBand.eyebrow}</p>
        <h2 className="title-xl mx-auto mt-8" style={{ maxWidth: "16ch", lineHeight: 1.08 }}>
          {words.map((w, i) => (
            <span key={i} className="mf-word inline-block" style={{ marginRight: "0.28em" }}>
              {w}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}

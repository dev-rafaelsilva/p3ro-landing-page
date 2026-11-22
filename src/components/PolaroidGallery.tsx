"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BLUR_DARK } from "@/lib/blur";

const PHOTOS = [
  { src: "/opt/galeria-1.webp", alt: "Bomba de chocolate com calda", rot: -6 },
  { src: "/opt/galeria-2.webp", alt: "Bombas vistas de cima", rot: 3.5 },
  { src: "/opt/galeria-3.webp", alt: "Bomba em close lateral", rot: -2 },
  { src: "/opt/galeria-4.webp", alt: "Conjunto de bombas", rot: 5 },
  { src: "/opt/galeria-5.webp", alt: "Bomba partida com recheio", rot: -4.5 },
  { src: "/opt/faixa-luz.webp", alt: "Bombas sob luz dramática", rot: 2 },
];

export default function PolaroidGallery() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pol-card", wrapRef.current!);

      cards.forEach((card, i) => {
        const rot = PHOTOS[i % PHOTOS.length].rot;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: -80,
            rotate: rot * 2.5,
            scale: 0.82,
          },
          {
            opacity: 1,
            y: 0,
            rotate: rot,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.3)",
            delay: i * 0.09,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      aria-label="Galeria polaroid"
      style={{
        paddingBlock: "clamp(72px, 10vw, 120px)",
        borderTop: "1px solid var(--color-lineSoft)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Watermark */}
      <span
        aria-hidden="true"
        className="watermark"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(100px, 20vw, 240px)",
          whiteSpace: "nowrap",
        }}
      >
        P3ro
      </span>

      <div className="container">
        <div style={{ marginBottom: "clamp(40px, 6vw, 72px)", maxWidth: "36ch" }}>
          <p className="eyebrow">Momentos reais</p>
          <h2 className="title-lg" style={{ marginTop: "clamp(12px, 1.6vw, 18px)" }}>
            Do estúdio para o feed
          </h2>
        </div>

        {/* Grade de polaroids */}
        <div
          ref={wrapRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(20px, 3vw, 40px)",
          }}
          className="max-[640px]:!grid-cols-2"
        >
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className="pol-card"
              style={{
                transform: `rotate(${photo.rot}deg)`,
                cursor: "pointer",
                transformOrigin: "center bottom",
                transition: "transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.35s ease",
                willChange: "transform",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "rotate(0deg) translateY(-10px) scale(1.04)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 32px 64px rgba(0,0,0,.7)";
                (e.currentTarget as HTMLElement).style.zIndex = "10";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = `rotate(${photo.rot}deg)`;
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.zIndex = "";
              }}
            >
              {/* Frame polaroid: branco/creme */}
              <div
                style={{
                  background: "#F5F0E8",
                  padding: "10px 10px 36px",
                  boxShadow: "0 8px 32px rgba(0,0,0,.55), 0 2px 6px rgba(0,0,0,.35)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    overflow: "hidden",
                    background: "#ddd",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DARK}
                    sizes="(max-width: 640px) 45vw, 30vw"
                    className="object-cover"
                    style={{ transition: "transform 0.5s ease" }}
                  />
                </div>

                {/* Caption manuscrita */}
                <p
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    fontFamily: "var(--font-fraunces)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(10px, 1.4vw, 13px)",
                    color: "#6B5B4E",
                    letterSpacing: "0.02em",
                    userSelect: "none",
                  }}
                >
                  {["P3ro · RP", "by.p3ro", "food ✦", "p3ro studio", "gastro 📸", "RP · 2026"][i % 6]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

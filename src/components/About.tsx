"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { about } from "@/data/site";
import { useReveal } from "./anim";
import { gsap } from "@/lib/gsap";
import { BLUR_DARK } from "@/lib/blur";

export default function About() {
  const reveal = useReveal();
  const reduce = useReducedMotion();
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !photoWrapRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: photoWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section">
      <div
        className="container grid max-[800px]:!grid-cols-1"
        style={{
          gridTemplateColumns: "1fr 1.4fr",
          gap: "clamp(32px, 6vw, 88px)",
          alignItems: "start",
        }}
      >
        {/* Coluna esquerda — header + foto */}
        <motion.div {...reveal}>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2
            id="sobre-title"
            className="title-lg"
            style={{ marginTop: "clamp(14px, 2vw, 20px)", marginBottom: "clamp(28px, 4vw, 48px)" }}
          >
            {about.title}
          </h2>

          <div
            ref={photoWrapRef}
            style={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid var(--color-line)",
            }}
          >
            {/* Wrapper interno que move no scroll */}
            <div
              ref={imgRef}
              style={{
                position: "relative",
                top: "-6%",
                height: "112%",
                willChange: "transform",
              }}
            >
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                width={about.photo.width}
                height={about.photo.height}
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_DARK}
                sizes="(max-width: 800px) 90vw, 42vw"
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Tag flutuante */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                padding: "10px 16px",
                background: "rgba(9,6,10,0.82)",
                backdropFilter: "blur(8px)",
                border: "1px solid var(--color-line)",
                borderRadius: 2,
                zIndex: 2,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sora)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "var(--color-acc)",
                }}
              >
                Gustavo · P3ro
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sora)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-mut)",
                  marginTop: 3,
                }}
              >
                Ribeirão Preto, SP
              </p>
            </div>
          </div>
        </motion.div>

        {/* Coluna direita — texto */}
        <motion.div
          {...reveal}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(20px, 3vw, 32px)",
            paddingTop: "clamp(48px, 8vw, 96px)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(80px, 12vw, 160px)",
              lineHeight: 0.8,
              color: "var(--color-cream)",
              opacity: 0.04,
              userSelect: "none",
              display: "block",
              marginBottom: -16,
            }}
          >
            P3ro
          </span>

          {about.paragraphs.map((p, i) => (
            <p key={i} className="lead" style={{ fontSize: "clamp(16px, 1.6vw, 18px)" }}>
              {p}
            </p>
          ))}

          <div
            style={{
              marginTop: "clamp(12px, 2vw, 24px)",
              paddingTop: "clamp(20px, 3vw, 32px)",
              borderTop: "1px solid var(--color-lineSoft)",
              display: "flex",
              gap: 24,
              alignItems: "center",
            }}
          >
            <a href="#contato" className="btn btn-outline" data-cursor>
              Fale comigo
            </a>
            <a
              href="https://instagram.com/by.p3ro"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-sora)",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-mut)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              data-cursor
            >
              @by.p3ro
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

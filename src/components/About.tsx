"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { about } from "@/data/site";
import { useReveal } from "./anim";
import { gsap } from "@/lib/gsap";
import { BLUR_DARK } from "@/lib/blur";
import LineReveal from "./LineReveal";
import LetterReveal from "./LetterReveal";

export default function About() {
  const reveal = useReveal();
  const reduce = useReducedMotion();
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const wordRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;

    // Word-by-word highlight nos parágrafos
    if (wordRevealRef.current) {
      const words = wordRevealRef.current.querySelectorAll("[data-word]");
      if (words.length) {
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.018,
            ease: "none",
            scrollTrigger: {
              trigger: wordRevealRef.current,
              start: "top 78%",
              end: "bottom 55%",
              scrub: 0.6,
            },
          }
        );
      }
    }

    const ctx = gsap.context(() => {
      if (photo1Ref.current && img1Ref.current) {
        gsap.fromTo(img1Ref.current, { yPercent: -6 }, {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: photo1Ref.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      }
      if (photo2Ref.current && img2Ref.current) {
        gsap.fromTo(img2Ref.current, { yPercent: -4 }, {
          yPercent: 4, ease: "none",
          scrollTrigger: { trigger: photo2Ref.current, start: "top bottom", end: "bottom top", scrub: 1.4 },
        });
      }
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section">
      <div className="container">
        <motion.div {...reveal} style={{ marginBottom: "clamp(32px, 5vw, 60px)" }}>
          <p className="eyebrow"><LetterReveal>{about.eyebrow}</LetterReveal></p>
          <LineReveal
            as="h2"
            id="sobre-title"
            className="title-lg"
            style={{ marginTop: "clamp(14px, 2vw, 20px)", maxWidth: "20ch" }}
          >
            {about.title}
          </LineReveal>
        </motion.div>

        {/* Duas fotos lado a lado */}
        <motion.div
          {...reveal}
          className="max-[640px]:!grid-cols-1"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(12px, 2vw, 24px)",
            marginBottom: "clamp(32px, 5vw, 60px)",
          }}
        >
          {/* Foto Gustavo */}
          <div
            ref={photo1Ref}
            data-cursor-photo
            style={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid var(--color-line)",
              aspectRatio: "3 / 4",
            }}
          >
            <div
              ref={img1Ref}
              style={{ position: "relative", top: "-6%", height: "112%", willChange: "transform" }}
            >
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                width={about.photo.width}
                height={about.photo.height}
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_DARK}
                sizes="(max-width: 640px) 90vw, 45vw"
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "absolute", bottom: 16, left: 16,
                padding: "8px 14px",
                background: "rgba(9,6,10,0.82)",
                backdropFilter: "blur(8px)",
                border: "1px solid var(--color-line)",
                borderRadius: 2, zIndex: 2,
              }}
            >
              <p style={{ fontFamily: "var(--font-sora)", fontSize: 10, fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-acc)" }}>
                Gustavo · P3ro
              </p>
              <p style={{ fontFamily: "var(--font-sora)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-mut)", marginTop: 3 }}>
                Ribeirão Preto, SP
              </p>
            </div>
          </div>

          {/* Foto da sócia */}
          <div
            ref={photo2Ref}
            data-cursor-photo
            style={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid var(--color-line)",
              aspectRatio: "3 / 4",
            }}
          >
            <div
              ref={img2Ref}
              style={{ position: "relative", top: "-4%", height: "108%", willChange: "transform" }}
            >
              <Image
                src="/opt/socia.webp"
                alt="Retrato de Duda, sócia do estúdio P3ro"
                width={640}
                height={640}
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_DARK}
                sizes="(max-width: 640px) 90vw, 45vw"
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div
              style={{
                position: "absolute", bottom: 16, left: 16,
                padding: "8px 14px",
                background: "rgba(9,6,10,0.82)",
                backdropFilter: "blur(8px)",
                border: "1px solid var(--color-line)",
                borderRadius: 2, zIndex: 2,
              }}
            >
              <p style={{ fontFamily: "var(--font-sora)", fontSize: 10, fontWeight: 500, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-acc)" }}>
                Duda · P3ro
              </p>
              <p style={{ fontFamily: "var(--font-sora)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-mut)", marginTop: 3 }}>
                Ribeirão Preto, SP
              </p>
            </div>
          </div>
        </motion.div>

        {/* Texto único + CTA */}
        <motion.div
          {...reveal}
          className="max-[800px]:!grid-cols-1"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "center",
            paddingTop: "clamp(24px, 4vw, 48px)",
            borderTop: "1px solid var(--color-lineSoft)",
          }}
        >
          <div ref={wordRevealRef} style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2.5vw, 24px)" }}>
            <span
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(60px, 10vw, 120px)",
                lineHeight: 0.8,
                color: "var(--color-cream)",
                opacity: 0.04,
                userSelect: "none",
                display: "block",
                marginBottom: -12,
              }}
            >
              P3ro
            </span>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="lead" style={{ fontSize: "clamp(16px, 1.6vw, 18px)" }}>
                {p.split(" ").map((word, j) => (
                  <span key={j} data-word style={{ display: "inline-block", marginRight: "0.28em" }}>
                    {word}
                  </span>
                ))}
              </p>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a href="#contato" className="btn btn-outline" data-cursor>
              Fale conosco
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
                textAlign: "center",
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

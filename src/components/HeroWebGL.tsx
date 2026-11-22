"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { hero, trust } from "@/data/site";
import { EASE } from "./anim";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Typewriter from "./Typewriter";
import { useMagnetic } from "@/hooks/useMagnetic";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

function Title({ text }: { text: string }) {
  const target = "desejado";
  const idx = text.toLowerCase().indexOf(target);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <em style={{ fontStyle: "italic", color: "var(--color-acc)", fontWeight: 300 }}>
        {text.slice(idx, idx + target.length)}
      </em>
      {text.slice(idx + target.length)}
    </>
  );
}

export default function HeroWebGL() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const magPrimary = useMagnetic<HTMLAnchorElement>();
  const magOutline = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    if (reduce || !sectionRef.current || !imgInnerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgInnerRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  const containerProps = reduce
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      style={{ position: "relative", overflow: "hidden", minHeight: "100svh" }}
    >
      {/* Layout grid: texto à esq, foto à dir */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100svh",
        }}
        className="max-[800px]:!flex max-[800px]:flex-col-reverse"
      >
        {/* ── Coluna esquerda: texto ── */}
        <motion.div
          {...containerProps}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingTop: "clamp(120px, 20vh, 180px)",
            paddingBottom: "clamp(52px, 10vh, 110px)",
            paddingLeft: "clamp(20px, 5vw, 72px)",
            paddingRight: "clamp(20px, 3vw, 48px)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Badge de disponibilidade */}
          <motion.div
            variants={reduce ? undefined : item}
            style={{ marginBottom: "clamp(14px, 2.2vh, 24px)" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                paddingInline: 14,
                paddingBlock: 7,
                borderRadius: 999,
                border: "1px solid color-mix(in srgb, var(--color-acc) 35%, transparent)",
                background: "color-mix(in srgb, var(--color-acc) 8%, transparent)",
                fontFamily: "var(--font-sora), system-ui, sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-acc)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 6px #4ade80",
                  flexShrink: 0,
                  animation: "pulse-green 2s ease-in-out infinite",
                }}
              />
              {hero.availability}
            </span>
          </motion.div>

          <motion.p
            variants={reduce ? undefined : item}
            className="eyebrow"
            style={{ marginBottom: "clamp(18px, 2.8vh, 32px)" }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={reduce ? undefined : item}
            id="hero-title"
            className="title-xl"
            style={{ maxWidth: "10ch" }}
          >
            <Title text={hero.title} />
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : item}
            className="lead"
            style={{ maxWidth: "38ch", marginTop: "clamp(16px, 2.5vh, 24px)" }}
          >
            {hero.text}
          </motion.p>

          <motion.div
            variants={reduce ? undefined : item}
            style={{ marginTop: "clamp(12px, 2vh, 18px)" }}
          >
            <Typewriter />
          </motion.div>

          <motion.p
            variants={reduce ? undefined : item}
            style={{
              fontSize: 11,
              fontFamily: "var(--font-sora)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-mut)",
              marginTop: "clamp(14px, 2.2vh, 24px)",
            }}
          >
            {trust.label}:{" "}
            <span style={{ color: "var(--color-acc)" }}>{trust.name}</span>
          </motion.p>

          <motion.div
            variants={reduce ? undefined : item}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: "clamp(28px, 4vh, 48px)",
            }}
            className="max-[620px]:flex-col"
          >
            <a ref={magPrimary} href="#contato" className="btn btn-primary max-[620px]:w-full" data-cursor>
              {hero.primary}
            </a>
            <a ref={magOutline} href="#portfolio" className="btn btn-outline max-[620px]:w-full" data-cursor>
              {hero.secondary}
            </a>
          </motion.div>

          {!reduce && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginTop: "clamp(40px, 7vh, 80px)",
              }}
              aria-hidden="true"
            >
              <div
                style={{
                  height: 1,
                  width: "clamp(40px, 8vw, 80px)",
                  background: "color-mix(in srgb, var(--color-cream) 20%, transparent)",
                }}
              />
              <span className="scroll-cue" />
            </motion.div>
          )}
        </motion.div>

        {/* ── Coluna direita: foto com parallax ── */}
        <div
          style={{ position: "relative", overflow: "hidden" }}
          className="max-[800px]:h-[55svh]"
        >
          {/* Gradiente esquerdo: blend com o fundo */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              pointerEvents: "none",
              background:
                "linear-gradient(to right, var(--color-bg) 0%, transparent 22%)",
            }}
          />
          {/* Gradiente inferior */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "auto 0 0 0",
              height: "28%",
              zIndex: 2,
              pointerEvents: "none",
              background:
                "linear-gradient(to top, var(--color-bg) 0%, transparent 100%)",
            }}
          />

          {/* Wrapper da imagem — move no scroll */}
          <div
            ref={imgInnerRef}
            style={{
              position: "absolute",
              inset: "-10% 0",
              willChange: "transform",
            }}
          >
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
            />
          </div>

          {/* Halo dourado decorativo */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "35%",
              left: "40%",
              width: "55%",
              aspectRatio: "1",
              borderRadius: "50%",
              background:
                "radial-gradient(closest-side, rgba(200,169,110,.22), transparent 70%)",
              filter: "blur(40px)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}

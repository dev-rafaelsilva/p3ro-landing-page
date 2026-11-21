"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { hero, webgl, trust } from "@/data/site";
import { EASE } from "./anim";
import SceneBoundary from "./webgl/SceneBoundary";

const HeroScene = dynamic(() => import("./webgl/HeroScene"), { ssr: false });

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

// Destaca "desejado" em itálico ember — apresentação, não altera o texto.
function Title({ text }: { text: string }) {
  const target = "desejado";
  const idx = text.toLowerCase().indexOf(target);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="ital">{text.slice(idx, idx + target.length)}</span>
      {text.slice(idx + target.length)}
    </>
  );
}

export default function HeroWebGL() {
  const reduce = useReducedMotion();
  const [canWebGL, setCanWebGL] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!reduce && supportsWebGL()) setCanWebGL(true);
  }, [reduce]);

  const containerProps = reduce
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* Camada visual: WebGL por cima do fallback estático */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={hero.image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: ready ? 0 : 1, transition: "opacity .8s ease" }}
        />
        {canWebGL && (
          <SceneBoundary onError={() => setCanWebGL(false)}>
            <HeroScene
              textureUrl={webgl.heroTex}
              imageAspect={webgl.heroAspect}
              onReady={() => setReady(true)}
            />
          </SceneBoundary>
        )}
        {/* Scrims para legibilidade e para fundir com o fundo da página */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,7,6,.55) 0%, rgba(11,7,6,.15) 30%, rgba(11,7,6,.35) 62%, rgba(11,7,6,.96) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(120% 90% at 20% 70%, rgba(11,7,6,.7), transparent 60%)",
          }}
        />
      </div>

      {/* Conteúdo */}
      <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end pb-[clamp(48px,9vh,110px)] pt-[clamp(90px,18vh,150px)]">
        <motion.div {...containerProps} className="max-w-[920px]">
          <motion.p variants={reduce ? undefined : item} className="eyebrow">
            {hero.eyebrow} — {trust.name}
          </motion.p>

          <motion.h1
            variants={reduce ? undefined : item}
            id="hero-title"
            className="title-xl mt-6"
            style={{ maxWidth: "15ch" }}
          >
            <Title text={hero.title} />
          </motion.h1>

          <motion.p variants={reduce ? undefined : item} className="lead mt-7 max-w-[540px]">
            {hero.text}
          </motion.p>

          <motion.div
            variants={reduce ? undefined : item}
            className="mt-9 flex flex-wrap items-center gap-3 max-[620px]:flex-col max-[620px]:items-stretch"
          >
            <a href="#contato" className="btn btn-primary max-[620px]:w-full" data-cursor>
              {hero.primary}
            </a>
            <a href="#portfolio" className="btn btn-outline max-[620px]:w-full" data-cursor>
              {hero.secondary}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 max-[900px]:flex md:flex"
          aria-hidden="true"
        >
          <span className="scroll-cue" />
        </motion.div>
      )}
    </section>
  );
}

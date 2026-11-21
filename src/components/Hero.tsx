"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, type Variants } from "framer-motion";
import { hero } from "@/data/site";
import { EASE } from "./anim";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const containerProps = reduce
    ? {}
    : { variants: container, initial: "hidden" as const, animate: "show" as const };
  const itemVariants = reduce ? undefined : item;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxSpring = useSpring(rx, { stiffness: 120, damping: 12 });
  const rySpring = useSpring(ry, { stiffness: 120, damping: 12 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 18);
    rx.set(-py * 14);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative"
      style={{ paddingTop: "clamp(16px,4vw,56px)", paddingBottom: "clamp(56px,8vw,96px)" }}
    >
      <div
        className="container grid items-center max-[900px]:grid-cols-1"
        style={{ gridTemplateColumns: "1.05fr .95fr", gap: "clamp(24px,5vw,56px)" }}
      >
        {/* Texto */}
        <motion.div {...containerProps} className="max-[900px]:order-2">
          <motion.p variants={itemVariants} className="eyebrow">
            {hero.eyebrow}
          </motion.p>

          <motion.h1 variants={itemVariants} id="hero-title" className="title-xl mt-4">
            {hero.title}
          </motion.h1>

          <motion.p variants={itemVariants} className="lead mt-6 max-w-[520px]">
            {hero.text}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3 max-[620px]:flex-col">
            <motion.a
              href="#contato"
              whileHover={reduce ? undefined : { y: -3, boxShadow: "0 14px 34px rgba(232,137,60,.35)" }}
              className="btn btn-primary max-[620px]:w-full"
            >
              {hero.primary}
            </motion.a>
            <motion.a
              href="#portfolio"
              whileHover={reduce ? undefined : { y: -3 }}
              className="btn btn-outline max-[620px]:w-full"
            >
              {hero.secondary}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Foto */}
        <div
          className="relative flex justify-center max-[900px]:order-1"
          style={{ perspective: 1500 }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "70%",
              aspectRatio: "3 / 4",
              background: "radial-gradient(closest-side, rgba(232,137,60,.5), transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <motion.div
            style={{ rotateX: reduce ? 0 : rxSpring, rotateY: reduce ? 0 : rySpring, transformStyle: "preserve-3d" }}
            className="relative z-10 w-full"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
              className="relative mx-auto w-full"
              style={{ maxWidth: 430 }}
            >
              <motion.div
                animate={reduce ? undefined : { rotateY: [-16, 14], rotateX: [4, -3] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                style={{
                  transformStyle: "preserve-3d",
                  borderRadius: 14,
                  border: "1px solid var(--color-line)",
                  boxShadow: "0 50px 90px rgba(0,0,0,.6)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={hero.image.width}
                  height={hero.image.height}
                  priority
                  sizes="(max-width: 900px) 90vw, 430px"
                  className="block h-auto w-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { EASE } from "./anim";

export default function SplashScreen() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), reduce ? 200 : 1900);
    // Trava o scroll durante o splash.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="fixed inset-0 z-[120] grid place-items-center"
          style={{ background: "#0A0605" }}
          aria-hidden="true"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex flex-col items-center gap-5"
          >
            <span className="relative block h-20 w-20 overflow-hidden rounded-2xl">
              <Image src={site.logo} alt="" fill sizes="80px" className="object-cover" priority />
              <motion.span
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0.6 }}
                animate={reduce ? undefined : { opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ boxShadow: "0 0 60px 10px rgba(192,57,47,.45) inset" }}
              />
            </span>

            <div className="overflow-hidden">
              <motion.span
                initial={reduce ? false : { y: "110%" }}
                animate={reduce ? undefined : { y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
                className="block text-cream"
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 500,
                  fontSize: 40,
                  letterSpacing: "0.02em",
                }}
              >
                P3RO
              </motion.span>
            </div>

            {!reduce && (
              <span className="relative h-px w-40 overflow-hidden" style={{ background: "rgba(244,234,221,.12)" }}>
                <motion.span
                  className="absolute inset-y-0 left-0"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: EASE }}
                  style={{ background: "var(--color-acc)" }}
                />
              </span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

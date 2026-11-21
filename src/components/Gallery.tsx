"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gallery } from "@/data/site";
import { useReveal, EASE } from "./anim";

export default function Gallery() {
  const reveal = useReveal();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>(gallery.filters[0]);
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const items = useMemo(
    () => (filter === "Todos" ? gallery.items : gallery.items.filter((i) => i.category === filter)),
    [filter]
  );

  const total = items.length;
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + total) % total)), [total]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % total)), [total]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  const current = index !== null ? items[index] : null;

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="section-plain">
      <div className="container">
        <motion.div {...reveal}>
          <p className="eyebrow">{gallery.eyebrow}</p>
          <h2 id="portfolio-title" className="title-lg mt-4">
            {gallery.title}
          </h2>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar portfólio">
            {gallery.filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                data-active={filter === f}
                onClick={() => {
                  setFilter(f);
                  setIndex(null);
                }}
                className="chip"
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div
          className="mt-8 grid grid-cols-3 gap-4 max-[620px]:grid-cols-2 max-[620px]:gap-[10px]"
          style={{ gridAutoRows: "clamp(220px,30vw,320px)" }}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.src}
                layout={!reduce}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`gtilt-wrap ${i === 0 ? "row-span-2" : ""}`}
                style={{ perspective: 900 }}
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="gtilt-card block h-full w-full overflow-hidden rounded-xl border border-line"
                  aria-label={`Ampliar foto: ${item.alt}`}
                >
                  <span className="relative block h-full w-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 620px) 50vw, 33vw"
                      className="zoomimg object-cover"
                    />
                    <span className="gal-cap">{item.alt}</span>
                  </span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {open && current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Foto ampliada"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: "rgba(12,7,4,.95)" }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="btn btn-outline absolute right-4 top-4 z-10"
              style={{ borderColor: "var(--color-btnBorder)" }}
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Foto anterior"
              className="btn btn-outline absolute left-4 top-1/2 -translate-y-1/2"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Próxima foto"
              className="btn btn-outline absolute right-4 top-1/2 -translate-y-1/2"
            >
              ›
            </button>
            <motion.div
              initial={reduce ? false : { scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={reduce ? undefined : { scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
              style={{ width: "min(92vw, 1100px)", height: "86vh" }}
            >
              <Image src={current.src} alt={current.alt} fill sizes="92vw" className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

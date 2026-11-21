"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gallery } from "@/data/site";
import { useReveal } from "./anim";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Ritmo editorial assimétrico (desktop, grid de 12 colunas).
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-6", "md:col-span-6"];
const ASPECTS = ["4 / 5", "1 / 1", "3 / 4", "5 / 4", "1 / 1", "4 / 5"];

export default function GalleryEditorial() {
  const reveal = useReveal();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>(gallery.filters[0]);
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  // Revelação em cascata + parallax sutil por imagem (GSAP).
  useEffect(() => {
    if (reduce || !gridRef.current) return;
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".ed-tile", gridRef.current!);
      tiles.forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: (i % 2) * 0.08,
            scrollTrigger: { trigger: tile, start: "top 88%" },
          }
        );
        const img = tile.querySelector(".ed-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });
      ScrollTrigger.refresh();
    }, gridRef);
    return () => ctx.revert();
  }, [reduce, filter]);

  const current = index !== null ? items[index] : null;

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="section-plain">
      <div className="container">
        <motion.div {...reveal} className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{gallery.eyebrow}</p>
            <h2 id="portfolio-title" className="title-lg mt-5">
              {gallery.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar portfólio">
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
                data-cursor
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6"
          style={{ gridAutoFlow: "dense" }}
        >
          {items.map((item, i) => (
            <div key={`${filter}-${item.src}`} className={`ed-tile gtilt-wrap ${SPANS[i % SPANS.length]}`}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="gtilt-card group relative block w-full overflow-hidden rounded-2xl border border-line"
                style={{ aspectRatio: ASPECTS[i % ASPECTS.length] }}
                aria-label={`Ampliar foto: ${item.alt}`}
                data-cursor-label="Ampliar"
              >
                <span className="ed-img absolute inset-0 block" style={{ top: "-8%", height: "116%" }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 45vw"
                    className="zoomimg object-cover"
                  />
                </span>
                <span className="gal-cap">{item.alt}</span>
              </button>
            </div>
          ))}
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
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            style={{ background: "rgba(8,5,3,.96)", backdropFilter: "blur(6px)" }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="btn btn-outline absolute right-4 top-4 z-10"
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
              key={current.src}
              initial={reduce ? false : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduce ? undefined : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
              style={{ width: "min(92vw, 1100px)", height: "86vh" }}
            >
              <Image src={current.src} alt={current.alt} fill sizes="92vw" className="object-contain" />
              <p className="absolute -bottom-9 left-0 right-0 text-center text-[13px] text-mut">{current.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

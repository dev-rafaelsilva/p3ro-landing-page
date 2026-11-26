"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { useReveal } from "./anim";

const POSTS = [
  { src: "/opt/galeria-1.webp", alt: "Bomba de chocolate com calda" },
  { src: "/opt/galeria-2.webp", alt: "Bombas de chocolate vistas de cima" },
  { src: "/opt/galeria-3.webp", alt: "Bomba em close lateral" },
  { src: "/opt/faixa-luz.webp", alt: "Bombas sob luz dramática" },
  { src: "/opt/galeria-4.webp", alt: "Conjunto de bombas" },
  { src: "/opt/galeria-5.webp", alt: "Bomba partida com recheio" },
  { src: "/opt/produto-coxinha-de-costela.webp", alt: "Coxinha de costela" },
  { src: "/opt/produto-croquete-de-carne.webp", alt: "Croquete de carne" },
  { src: "/opt/produto-churros-doce-de-leite.webp", alt: "Churros doce de leite" },
];

const igUrl = `https://instagram.com/${site.instagram}`;

export default function InstagramGrid() {
  const reveal = useReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + POSTS.length) % POSTS.length));
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % POSTS.length));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  return (
    <section
      aria-labelledby="ig-title"
      style={{
        paddingBlock: "clamp(52px, 8vw, 96px)",
        borderTop: "1px solid var(--color-lineSoft)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          {...reveal}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: "clamp(24px, 3.5vw, 40px)",
          }}
        >
          <div>
            <p className="eyebrow">Instagram</p>
            <h2
              id="ig-title"
              className="title-lg"
              style={{ marginTop: "clamp(10px, 1.5vw, 16px)" }}
            >
              Siga o trabalho
            </h2>
          </div>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            data-cursor
            style={{ flexShrink: 0 }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @{site.instagram}
          </a>
        </motion.div>

        {/* Grid 3×3 */}
        <motion.div
          {...reveal}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(3px, 0.5vw, 6px)",
          }}
          className="max-[480px]:!grid-cols-2"
        >
          {POSTS.map((post, i) => (
            <button
              key={post.src}
              onClick={() => setLightbox(i)}
              aria-label={`Ampliar foto: ${post.alt}`}
              style={{
                position: "relative",
                display: "block",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                cursor: "zoom-in",
                border: "none",
                padding: 0,
                background: "none",
              }}
              className="ig-cell group"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                loading="lazy"
                sizes="(max-width: 480px) 50vw, 33vw"
                className="object-cover"
                style={{
                  transition: "transform 0.5s cubic-bezier(0.2,0.7,0.2,1), filter 0.3s ease",
                }}
              />
              {/* Hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(9,6,10,0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.3s ease",
                }}
                className="ig-overlay"
              >
                <span
                  style={{
                    color: "var(--color-cream)",
                    fontFamily: "var(--font-sora)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    opacity: 0,
                    transform: "translateY(6px)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                  }}
                  className="ig-label"
                >
                  Ver
                </span>
              </div>

              {/* Badge no primeiro post */}
              {i === 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    padding: "3px 8px",
                    background: "var(--color-acc)",
                    borderRadius: 2,
                    fontFamily: "var(--font-sora)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#130A06",
                  }}
                >
                  Recente
                </span>
              )}
            </button>
          ))}
        </motion.div>

        <style>{`
          .ig-cell:hover img { transform: scale(1.06); filter: brightness(0.75); }
          .ig-cell:hover .ig-overlay { background: rgba(9,6,10,.38) !important; }
          .ig-cell:hover .ig-label { opacity: 1 !important; transform: translateY(0) !important; }
        `}</style>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "igLbIn 0.22s ease",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={POSTS[lightbox].alt}
        >
          {/* Imagem */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "min(90vw, 860px)",
              maxHeight: "90vh",
              width: "100%",
            }}
          >
            <Image
              src={POSTS[lightbox].src}
              alt={POSTS[lightbox].alt}
              width={860}
              height={860}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "90vh",
                objectFit: "contain",
                display: "block",
              }}
              priority
            />
            {/* Contador */}
            <p
              style={{
                position: "absolute",
                bottom: -28,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-sora)",
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {lightbox + 1} / {POSTS.length}
            </p>
          </div>

          {/* Fechar */}
          <button
            onClick={close}
            aria-label="Fechar"
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            ×
          </button>

          {/* Anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Foto anterior"
            style={{
              position: "fixed",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Próxima */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Próxima foto"
            style={{
              position: "fixed",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @keyframes igLbIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
      `}</style>
    </section>
  );
}

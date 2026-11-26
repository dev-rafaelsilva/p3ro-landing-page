"use client";
import { useEffect, useState } from "react";

const DOTS = [
  { id: "conteudo", label: "Início" },
  { id: "portfolio", label: "Portfólio" },
  { id: "area", label: "Área" },
  { id: "servicos", label: "Serviços" },
  { id: "precos", label: "Preços" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
];

export default function SectionDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers = DOTS.map(({ id }, i) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.35, rootMargin: "-15% 0px -15% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <nav
      aria-label="Seções da página"
      className="max-[1024px]:hidden"
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: "center",
      }}
    >
      {DOTS.map(({ id, label }, i) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          title={label}
          style={{
            display: "block",
            width: i === active ? 8 : 4,
            height: i === active ? 8 : 4,
            borderRadius: "50%",
            background: i === active ? "var(--color-acc)" : "rgba(200,169,110,0.25)",
            boxShadow: i === active ? "0 0 8px rgba(200,169,110,.5)" : "none",
            transition: "all 0.4s cubic-bezier(0.2, 0.7, 0.2, 1)",
            flexShrink: 0,
          }}
        />
      ))}
    </nav>
  );
}

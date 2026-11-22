"use client";

import { useEffect, useRef, useState } from "react";
import { site, hero } from "@/data/site";

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.123 1.528 5.858L.057 23.885a.5.5 0 0 0 .613.613l6.047-1.47A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.831 9.831 0 0 1-5.023-1.374l-.36-.214-3.728.906.922-3.653-.234-.375A9.819 9.819 0 0 1 2.182 12C2.182 6.566 6.566 2.182 12 2.182S21.818 6.566 21.818 12 17.434 21.818 12 21.818z" />
  </svg>
);

export default function MobileBar() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heroHeight = useRef(0);

  useEffect(() => {
    setMounted(true);
    const hero = document.querySelector("section");
    if (hero) heroHeight.current = hero.offsetHeight;

    const onScroll = () => {
      const threshold = heroHeight.current || window.innerHeight;
      setVisible(window.scrollY > threshold * 0.6);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const wpp = `https://wa.me/55${site.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento de fotografia gastronômica.")}`;

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9970,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.2,0.7,0.2,1)",
        // visible apenas em mobile
        display: "none",
      }}
      className="max-[800px]:!flex"
    >
      <a
        href={wpp}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          minHeight: 56,
          background: "var(--color-acc)",
          color: "#130A06",
          fontFamily: "var(--font-sora), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          textDecoration: "none",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {WA_ICON}
        {hero.primary}
      </a>
    </div>
  );
}

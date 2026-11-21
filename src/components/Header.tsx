"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { nav, site } from "@/data/site";
import { EASE } from "./anim";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -20 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      className={`sticky top-0 z-40 transition-colors duration-300 ${scrolled ? "header-blur" : ""}`}
    >
      <div
        className={`container flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-5"
        }`}
      >
        <a href="#conteudo" aria-label={`${site.studio} — início`} className="group flex items-center gap-2.5">
          <span
            className={`relative block overflow-hidden rounded-lg border border-line transition-all duration-300 group-hover:scale-105 ${
              scrolled ? "h-8 w-8" : "h-9 w-9"
            }`}
          >
            <Image src={site.logo} alt="" fill sizes="36px" className="object-cover" priority />
          </span>
          <span
            className="text-cream"
            style={{ fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em" }}
          >
            {site.studio}
          </span>
        </a>

        <nav aria-label="Principal" className="flex items-center gap-1 max-[900px]:hidden">
          <ul className="flex items-center gap-1">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-active={active === link.href.slice(1)}
                  className="nav-link inline-flex min-h-[44px] items-center rounded-lg px-4 text-[15px] text-mut transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contato" className="btn btn-primary ml-2">
            Orçamento
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="hidden h-11 w-11 items-center justify-center rounded-lg border border-line text-cream max-[900px]:inline-flex"
        >
          <span className="sr-only">Menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute inset-x-0 top-full z-40 hidden border-y border-line bg-card max-[900px]:block"
          >
            <ul className="container flex flex-col py-2">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center text-[16px] text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="py-3">
                <a href="#contato" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Orçamento
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

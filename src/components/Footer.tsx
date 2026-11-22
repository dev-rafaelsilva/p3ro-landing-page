"use client";

import Image from "next/image";
import { site, nav, footer } from "@/data/site";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Footer() {
  const wpp = `https://wa.me/55${site.whatsapp}`;
  const magCta = useMagnetic<HTMLAnchorElement>();

  return (
    <footer className="relative overflow-hidden border-t border-lineSoft">
      <div className="container relative py-20">
        {/* CTA */}
        <div className="max-w-3xl">
          <h2 className="title-xl">{footer.ctaTitle}</h2>
          <p className="lead mt-5 max-w-xl">{footer.ctaText}</p>
          <a
            ref={magCta}
            href={wpp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-8 max-[620px]:w-full"
          >
            {footer.cta}
          </a>
        </div>

        {/* Links */}
        <div className="mt-16 grid grid-cols-[1.4fr_1fr_1fr] gap-10 border-t border-lineSoft pt-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative block h-9 w-9 overflow-hidden rounded-lg border border-line">
                <Image src={site.logo} alt="" fill sizes="36px" className="object-cover" />
              </span>
              <span style={{ fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em" }} className="text-cream">
                {site.studio}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[15px] text-mut">
              Fotografia gastronômica autoral em {site.city} e região.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <p className="mb-4 text-[13px] uppercase tracking-[0.18em] text-mut">Navegação</p>
            <ul className="flex flex-col gap-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] text-cream transition-colors hover:text-acc">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-[13px] uppercase tracking-[0.18em] text-mut">Contato</p>
            <ul className="flex flex-col gap-2.5 text-[15px]">
              <li>
                <a href={wpp} target="_blank" rel="noopener noreferrer" className="text-cream transition-colors hover:text-acc">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" className="text-cream transition-colors hover:text-acc">
                  @{site.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Wordmark gigante — Fraunces italic */}
        <div
          aria-hidden="true"
          className="mt-14 select-none text-cream"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.04em", lineHeight: 0.8, fontSize: "clamp(48px,10vw,120px)", opacity: 0.04 }}
        >
          {site.studio}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-lineSoft pt-6">
          <p className="text-[13px] text-mut">
            © {site.year} {site.studio}. {footer.rights}
          </p>
          <p className="text-[13px] text-mut">
            {site.city} · @{site.instagram}
          </p>
        </div>
      </div>
    </footer>
  );
}

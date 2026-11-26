"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contact, site } from "@/data/site";
import { useReveal } from "./anim";

export default function Contact() {
  const reveal = useReveal();
  const [name, setName] = useState("");
  const [service, setService] = useState<string>(contact.services[0]);
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    let dateLabel = "";
    if (date) {
      const [y, m, d] = date.split("-");
      dateLabel = ` Data desejada: ${d}/${m}/${y}.`;
    }

    const message = `Olá! Meu nome é ${name.trim()}. Tenho interesse em: ${service}.${dateLabel}`;
    const url = `https://wa.me/55${site.whatsapp}?text=${encodeURIComponent(message)}`;

    setLoading(true);
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setLoading(false);
    }, 1500);
  };

  // Data mínima = hoje
  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="contato" aria-labelledby="contato-title" className="section">
      <div
        className="container grid items-start max-[900px]:grid-cols-1"
        style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,5vw,64px)" }}
      >
        <motion.div {...reveal}>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2
            id="contato-title"
            className="title-lg mt-4"
          >
            {contact.title}
          </h2>
          <p className="lead mt-6 max-w-[520px]">{contact.text}</p>
        </motion.div>

        <motion.div {...reveal}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col rounded-2xl border border-line bg-card"
            style={{ padding: "clamp(22px,4vw,36px)", gap: 18 }}
          >
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label htmlFor="c-name" className="text-[14px] text-cream">
                Nome
              </label>
              <input
                id="c-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required="true"
                aria-invalid={error}
                aria-describedby={error ? "c-name-error" : undefined}
                className="field"
              />
              {error && (
                <span id="c-name-error" className="text-[13px]" style={{ color: "var(--color-acc)" }}>
                  Por favor, informe seu nome.
                </span>
              )}
            </div>

            {/* Serviço */}
            <div className="flex flex-col gap-2">
              <label htmlFor="c-service" className="text-[14px] text-cream">
                Serviço
              </label>
              <div style={{ position: "relative" }}>
                <select
                  id="c-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="field"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    paddingRight: 36,
                    cursor: "pointer",
                    width: "100%",
                    background: "transparent",
                    color: "var(--color-cream)",
                  }}
                >
                  {contact.services.map((s) => (
                    <option key={s} value={s} style={{ background: "#1a1120", color: "var(--color-cream)" }}>
                      {s}
                    </option>
                  ))}
                </select>
                {/* Seta customizada */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "var(--color-acc)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Data */}
            <div className="flex flex-col gap-2">
              <label htmlFor="c-date" className="text-[14px] text-cream">
                Data desejada
              </label>
              <input
                id="c-date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="field"
                style={{ colorScheme: "dark", cursor: "pointer" }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "opacity 0.2s", opacity: loading ? 0.85 : 1 }}
              >
                {loading ? (
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    aria-hidden="true"
                    style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                ) : contact.submit}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

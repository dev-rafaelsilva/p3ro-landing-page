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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    const message = `Olá! Meu nome é ${name.trim()}. Tenho interesse em: ${service}.${
      date.trim() ? ` Data desejada: ${date.trim()}.` : ""
    }`;
    const url = `https://wa.me/55${site.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

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

            <div className="flex flex-col gap-2">
              <label htmlFor="c-service" className="text-[14px] text-cream">
                Serviço
              </label>
              <select
                id="c-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="field"
              >
                {contact.services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="c-date" className="text-[14px] text-cream">
                Data desejada
              </label>
              <input
                id="c-date"
                type="text"
                inputMode="numeric"
                placeholder="dd/mm/aaaa"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="field"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button type="submit" className="btn btn-primary w-full">
                {contact.submit}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

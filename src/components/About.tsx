"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { about } from "@/data/site";
import { useReveal } from "./anim";

export default function About() {
  const reveal = useReveal();

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section-plain">
      <div
        className="container grid items-start max-[900px]:grid-cols-1"
        style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,5vw,64px)" }}
      >
        <motion.div {...reveal}>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="sobre-title" className="title-lg mt-4">
            {about.title}
          </h2>

          <div className="mt-8 overflow-hidden rounded-xl border border-line" style={{ maxWidth: 420 }}>
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              width={about.photo.width}
              height={about.photo.height}
              loading="lazy"
              sizes="(max-width: 900px) 90vw, 420px"
              className="block h-auto w-full"
            />
          </div>
        </motion.div>

        <motion.div {...reveal} className="flex flex-col gap-5">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="lead">
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

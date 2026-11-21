"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/site";
import { useReveal } from "./anim";

function Card({ item }: { item: (typeof testimonials.items)[number] }) {
  const reveal = useReveal();
  return (
    <motion.figure {...reveal} className="flex flex-col rounded-2xl border border-line bg-card p-8">
      <div className="mb-4 flex gap-1 text-acc" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17.8 5.8 20.6l1.6-6.7L2.2 8.9l6.9-.6z" />
          </svg>
        ))}
      </div>
      <blockquote className="flex-1 text-[17px] text-cream">{item.quote}</blockquote>
      <figcaption className="mt-6">
        <p className="font-semibold text-cream">{item.name}</p>
        <p className="text-[14px] text-mut">{item.role}</p>
      </figcaption>
    </motion.figure>
  );
}

export default function Testimonials() {
  const reveal = useReveal();

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="section-plain">
      <div className="container">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2 id="depoimentos-title" className="title-lg mt-4">
            {testimonials.title}
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {testimonials.items.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

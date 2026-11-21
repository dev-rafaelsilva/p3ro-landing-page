"use client";

import { motion } from "framer-motion";
import { faq } from "@/data/site";
import { useReveal } from "./anim";

export default function Faq() {
  const reveal = useReveal();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-plain">
      <div className="container grid grid-cols-[0.8fr_1.2fr] gap-10 max-[900px]:grid-cols-1">
        <motion.div {...reveal}>
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-title" className="title-lg mt-4">
            {faq.title}
          </h2>
        </motion.div>

        <motion.div {...reveal}>
          {faq.items.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                {item.q}
                <svg className="faq-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

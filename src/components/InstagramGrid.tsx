"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { instagram, site } from "@/data/site";
import { useReveal } from "./anim";

const InstaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.3.07 1.69.07 4.9s0 3.6-.07 4.9c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.3.06-1.69.07-4.9.07s-3.6 0-4.9-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 3.1A6.7 6.7 0 1012 18.7 6.7 6.7 0 0012 5.3zm0 11a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6zm6.9-11.3a1.57 1.57 0 11-3.14 0 1.57 1.57 0 013.14 0z" />
  </svg>
);

export default function InstagramGrid() {
  const reveal = useReveal();
  const url = `https://instagram.com/${site.instagram}`;

  return (
    <section aria-labelledby="ig-title" className="section-plain">
      <div className="container">
        <motion.div
          {...reveal}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <p className="eyebrow">{instagram.eyebrow}</p>
            <h2 id="ig-title" className="title-lg mt-4">
              {instagram.title}
            </h2>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary max-[620px]:w-full">
            <InstaIcon />
            {instagram.cta} @{site.instagram}
          </a>
        </motion.div>

        <motion.div
          {...reveal}
          className="mt-10 grid grid-cols-6 gap-3 max-[900px]:grid-cols-3 max-[620px]:grid-cols-2"
        >
          {instagram.images.map((img) => (
            <a key={img.src} href={url} target="_blank" rel="noopener noreferrer" className="ig-tile">
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 620px) 50vw, 16vw" className="object-cover" />
              <span className="ig-overlay">
                <InstaIcon />
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

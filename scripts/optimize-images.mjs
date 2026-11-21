// Gera versões WebP otimizadas das fotos reais do Gustavo para texturas WebGL
// e carregamento rápido. Originais permanecem intactos em /public/fotos.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FOTOS = path.resolve(__dirname, "../public/fotos");
const OUT = path.resolve(__dirname, "../public/opt");

// Imagens realmente referenciadas em src/data/site.ts
const files = [
  "hero.jpg",
  "faixa-luz.jpg",
  "gustavo.jpg",
  "galeria-1.jpg",
  "galeria-2.jpg",
  "galeria-3.jpg",
  "galeria-4.jpg",
  "galeria-5.jpg",
  "produto-salsicha.jpg",
  "produto-churros-doce-de-leite.jpg",
  "produto-coxinha-de-costela.jpg",
  "produto-croquete-de-calabresa.jpg",
  "produto-risoles-de-milho.jpg",
  "produto-croquete-de-carne.jpg",
];

await mkdir(OUT, { recursive: true });

for (const name of files) {
  const base = name.replace(/\.[^.]+$/, "");
  const input = path.join(FOTOS, name);
  try {
    // Versão grande (galeria/lightbox/hero): até 2000px, qualidade 82
    await sharp(input)
      .rotate()
      .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, `${base}.webp`));

    // Textura WebGL (leve): até 1280px, qualidade 78
    await sharp(input)
      .rotate()
      .resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, `${base}-tex.webp`));

    console.log("OK", name);
  } catch (e) {
    console.error("FALHOU", name, e.message);
  }
}
console.log("Concluído.");

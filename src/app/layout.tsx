import type { Metadata } from "next";
import { Sora, Inter, Caveat, Fraunces } from "next/font/google";
import { site } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.p3ro.com.br"),
  title: "P3ro — Fotografia gastronômica em Ribeirão Preto",
  description:
    "Fotografia gastronômica autoral para restaurantes, confeitarias e marcas de alimentos. Imagens que despertam apetite e vendem. Atendemos Ribeirão Preto e região.",
  keywords: [
    "fotografia gastronômica",
    "fotografia de alimentos",
    "fotografia gastronômica Ribeirão Preto",
    "fotos para cardápio",
    "fotografia de produto",
    "food photography",
    "P3ro",
  ],
  authors: [{ name: "P3ro" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "P3ro — Fotografia gastronômica",
    description:
      "Imagens autorais para restaurantes, confeitarias e marcas de alimentos que querem vender mais com fotos que despertam apetite.",
    type: "website",
    locale: "pt_BR",
    siteName: "P3ro",
  },
  twitter: {
    card: "summary_large_image",
    title: "P3ro — Fotografia gastronômica",
    description: "Fotografia gastronômica em Ribeirão Preto e região.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "P3ro",
  description:
    "Fotografia gastronômica autoral para restaurantes, confeitarias e marcas de alimentos.",
  image: "https://www.p3ro.com.br/fotos/hero.jpg",
  url: "https://www.p3ro.com.br",
  telephone: `+55${site.whatsapp}`,
  areaServed: "Ribeirão Preto e região",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ribeirão Preto",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  knowsAbout: ["Fotografia gastronômica", "Fotografia de produto", "Direção de arte"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable} ${caveat.variable} ${fraunces.variable}`}>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

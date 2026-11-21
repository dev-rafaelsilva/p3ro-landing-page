import { marquee } from "@/data/site";

export default function Marquee() {
  const row = [...marquee.words, ...marquee.words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i} className="marquee-item">
            {w}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

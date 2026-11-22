"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const PHRASES = [
  "Fotografamos o sabor.",
  "Transformamos luz em desejo.",
  "Seu cardápio, em destaque.",
  "Imagens que vendem mais.",
  "Do estúdio pro feed.",
  "Comida que desperta apetite.",
];

const TYPE_SPEED = 55;
const DELETE_SPEED = 28;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_DELETE = 400;

export default function Typewriter() {
  const reduce = useReducedMotion();
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce) {
      setText(PHRASES[0]);
      return;
    }

    const current = PHRASES[phraseIndex];

    if (phase === "typing") {
      if (text.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, TYPE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pausing"), PAUSE_AFTER_TYPE);
      }
    }

    if (phase === "pausing") {
      setPhase("deleting");
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setText((t) => t.slice(0, -1));
        }, DELETE_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % PHRASES.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, phase, phraseIndex, reduce]);

  return (
    <span
      aria-label={PHRASES[phraseIndex]}
      style={{
        fontFamily: "var(--font-fraunces)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "clamp(13px, 1.4vw, 16px)",
        color: "var(--color-acc)",
        letterSpacing: "0.01em",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        minHeight: "1.5em",
      }}
    >
      {reduce ? PHRASES[0] : text}
      {!reduce && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 1.5,
            height: "1em",
            background: "var(--color-acc)",
            marginLeft: 2,
            animation: "twCursor 1.1s step-end infinite",
          }}
        />
      )}
      <style>{`
        @keyframes twCursor {
          0%, 100% { opacity: 1 }
          50%       { opacity: 0 }
        }
      `}</style>
    </span>
  );
}

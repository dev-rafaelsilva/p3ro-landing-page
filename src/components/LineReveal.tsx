"use client";

import {
  useRef,
  useLayoutEffect,
  useState,
  type ElementType,
  type ReactNode,
  type CSSProperties,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Props {
  as?: ElementType;
  children: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  stagger?: number;
  /** If true, fires immediately without ScrollTrigger (e.g. hero) */
  eager?: boolean;
}

type Line = { words: string[]; key: string };

export default function LineReveal({
  as: Tag = "p",
  children,
  className,
  style,
  delay = 0,
  stagger = 0.12,
  eager = false,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const words = children.split(/\s+/).filter(Boolean);

  // After mount, group words by their offsetTop (= actual line breaks)
  useLayoutEffect(() => {
    const spans = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (spans.length === 0) return;

    const grouped: Line[] = [];
    let current: string[] = [];
    let currentTop: number | null = null;

    spans.forEach((span, i) => {
      const top = Math.round(span.getBoundingClientRect().top);
      if (currentTop === null) currentTop = top;
      if (top !== currentTop) {
        grouped.push({ words: current, key: `line-${grouped.length}` });
        current = [];
        currentTop = top;
      }
      current.push(words[i]);
    });
    if (current.length > 0) grouped.push({ words: current, key: `line-${grouped.length}` });

    setLines(grouped);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After lines are set, animate them
  useLayoutEffect(() => {
    if (lines.length === 0 || !containerRef.current) return;

    const lineEls = containerRef.current.querySelectorAll<HTMLElement>("[data-line]");
    if (lineEls.length === 0) return;

    const innerEls = Array.from(lineEls).map(
      (el) => el.querySelector<HTMLElement>("[data-inner]")!
    );

    gsap.set(innerEls, { yPercent: 110 });

    const tl = gsap.timeline({
      delay,
      scrollTrigger: eager
        ? undefined
        : {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
    });

    tl.to(innerEls, {
      yPercent: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.vars.trigger === containerRef.current)
        .forEach((t) => t.kill());
    };
  }, [lines, delay, stagger, eager]);

  // Phase 1: render invisible words to measure line breaks
  if (lines.length === 0) {
    return (
      <Tag ref={containerRef as never} className={className} style={{ ...style, visibility: "hidden" }}>
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </span>
        ))}
      </Tag>
    );
  }

  // Phase 2: render grouped lines with clip + inner
  return (
    <Tag ref={containerRef as never} className={className} style={style}>
      {lines.map((line, li) => (
        <span
          key={line.key}
          data-line
          style={{ display: "block", overflow: "hidden", lineHeight: "inherit" }}
        >
          <span
            data-inner
            style={{ display: "block" }}
          >
            {line.words.join(" ")}
            {li < lines.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

import { useReducedMotion, type MotionProps, type Variants } from "framer-motion";

export const EASE: [number, number, number, number] = [0.2, 0.7, 0.2, 1];

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

export function useReveal(): MotionProps {
  const reduce = useReducedMotion();
  if (reduce) return { initial: false };
  return {
    variants: revealVariants,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.2 },
  };
}

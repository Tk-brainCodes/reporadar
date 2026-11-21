"use client";

import { m, useReducedMotion } from "framer-motion";

export function ScrollReveal({ children, className }) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: reduceMotion ? 0 : 0.68,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
  );
}

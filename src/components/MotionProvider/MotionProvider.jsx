"use client";

import { LazyMotion, domMax } from "framer-motion";

export function MotionProvider({ children }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}

import React from "react";
import styles from "./RadarVisual.module.css";
import { cn } from "@/lib/utils";
import type { RadarVisualProps } from "./types";

export function RadarVisual({ className }: RadarVisualProps) {
  return (
    <div className={cn(styles.container, className)} aria-hidden="true">
      <div className={styles.radarGlow} />

      <svg
        viewBox="0 0 400 400"
        className={styles.radarSvg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="sweepGradient"
            cx="200"
            cy="200"
            r="190"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#00f589" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00f589" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="gridLines" x1="0" y1="0" x2="400" y2="400">
            <stop offset="0%" stopColor="#23293a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#191f2d" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="190" stroke="#23293a" strokeWidth="1" />
        <circle cx="200" cy="200" r="140" stroke="#1d2331" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="90" stroke="#23293a" strokeWidth="1" />
        <circle cx="200" cy="200" r="40" stroke="#1d2331" strokeWidth="1" strokeDasharray="3 3" />

        <line x1="10" y1="200" x2="390" y2="200" stroke="#1d2331" strokeWidth="1" />
        <line x1="200" y1="10" x2="200" y2="390" stroke="#1d2331" strokeWidth="1" />
        <line x1="66" y1="66" x2="334" y2="334" stroke="#171b26" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="66" y1="334" x2="334" y2="66" stroke="#171b26" strokeWidth="1" strokeDasharray="2 4" />

        <g className={styles.sweepBeam}>
          <path
            d="M 200 200 L 200 10 A 190 190 0 0 1 334 66 Z"
            fill="url(#sweepGradient)"
          />
          <line x1="200" y1="200" x2="200" y2="10" stroke="#00f589" strokeWidth="1.5" />
        </g>

        <circle cx="280" cy="110" r="4" fill="#00f589" />
        <circle cx="280" cy="110" r="4" stroke="#00f589" strokeWidth="1" className={cn(styles.blip, styles.blipDelay1)} fill="none" />

        <circle cx="120" cy="290" r="3.5" fill="#00f589" />
        <circle cx="120" cy="290" r="3.5" stroke="#00f589" strokeWidth="1" className={cn(styles.blip, styles.blipDelay2)} fill="none" />

        <circle cx="290" cy="270" r="3" fill="#38bdf8" />
        <circle cx="290" cy="270" r="3" stroke="#38bdf8" strokeWidth="1" className={cn(styles.blip, styles.blipDelay3)} fill="none" />

        <circle cx="200" cy="200" r="5" fill="#00f589" />
      </svg>

      <div className={cn(styles.previewBadge, styles.previewBadge1)}>
        <span className={styles.badgeRepo}>vector-db/nano</span>
        <span className={styles.badgeStar}>★ 840</span>
      </div>

      <div className={cn(styles.previewBadge, styles.previewBadge2)}>
        <span className={styles.badgeRepo}>rust-agent/core</span>
        <span className={styles.badgeStar}>★ 1.2k</span>
      </div>
    </div>
  );
}

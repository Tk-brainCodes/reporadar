import React from "react";
import { ArrowDown } from "lucide-react";
import styles from "./Hero.module.css";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { RadarVisual } from "@/components/RadarVisual";
import { cn } from "@/lib/utils";
import type { HeroProps } from "./types";

export function Hero({ className }: HeroProps) {
  return (
    <section className={cn(styles.hero, className)} id="product">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.eyebrowWrapper}>
            <Badge variant="radar" size="md" dot>
              THE OPEN SOURCE DISCOVERY RADAR
            </Badge>
          </div>

          <h1 className={styles.headline}>
            Find the next big thing{" "}
            <span className={styles.headlineGradient}>in open source.</span>
          </h1>

          <p className={styles.description}>
            Discover emerging GitHub projects, explore innovative developer
            tools, and find your next favorite repository before everyone else.
          </p>

          <div className={styles.ctaGroup}>
            <Button
              variant="primary"
              size="lg"
              href="#explorer"
              rightIcon={<ArrowDown className="w-4 h-4" />}
            >
              Explore rising repositories
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href="#how-it-works"
            >
              How it works
            </Button>
          </div>

          <div className={styles.metaNotice}>
            <span className={styles.metaNoticeDot} aria-hidden="true" />
            <span>Scanning live public repositories across 12 tech ecosystems</span>
          </div>
        </div>

        <div className={styles.visualWrapper}>
          <RadarVisual />
        </div>
      </div>
    </section>
  );
}

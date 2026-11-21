import React from "react";
import { ArrowUp } from "lucide-react";
import styles from "./FinalCTA.module.css";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import type { FinalCTAProps } from "./types";

export function FinalCTA({ className }: FinalCTAProps) {
  return (
    <section className={cn(styles.section, className)}>
      <div className={styles.container}>
        <h2 className={styles.headline}>
          Your next favorite repository is out there.
        </h2>
        <p className={styles.description}>
          Stop searching blindly. Discover what developers are building.
        </p>
        <div className={styles.ctaWrapper}>
          <Button
            variant="primary"
            size="lg"
            href="#explorer"
            rightIcon={<ArrowUp className="w-4 h-4" />}
          >
            Explore rising repositories
          </Button>
        </div>
      </div>
    </section>
  );
}

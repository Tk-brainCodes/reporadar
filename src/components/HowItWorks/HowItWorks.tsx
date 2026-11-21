import React from "react";
import { Search, TrendingUp, Compass } from "lucide-react";
import styles from "./HowItWorks.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
import type { HowItWorksProps } from "./types";

const STEPS = [
  {
    number: "01",
    title: "Scan GitHub",
    description: "We retrieve recently created public repositories directly from GitHub.",
    icon: <Search className="w-5 h-5 text-[#00f589]" />,
  },
  {
    number: "02",
    title: "Find rising projects",
    description: "Repositories are ranked by their accumulated stars to highlight projects attracting attention.",
    icon: <TrendingUp className="w-5 h-5 text-[#00f589]" />,
  },
  {
    number: "03",
    title: "Explore and discover",
    description: "Browse projects by programming language, inspect their details, and visit the original repository.",
    icon: <Compass className="w-5 h-5 text-[#00f589]" />,
  },
];

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section className={cn(styles.section, className)} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.header}>
          <Badge variant="outline" size="sm">
            WORKFLOW
          </Badge>
          <h2 className={styles.title}>How it works</h2>
          <p className={styles.subtitle}>
            A streamlined discovery engine that continuously queries GitHub public
            data to uncover emerging developer tools.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.stepCard}>
              <div className="flex items-center justify-between">
                <div className={styles.iconWrapper}>{step.icon}</div>
                <span className={styles.stepNumber}>{step.number}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

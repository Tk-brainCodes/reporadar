import React from "react";
import { Sparkles, Terminal, Globe, Zap } from "lucide-react";
import styles from "./Features.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
import type { FeaturesProps } from "./types";

const FEATURES = [
  {
    title: "Early Discovery",
    description: "Explore newly created repositories before they become widely known.",
    icon: <Sparkles className="w-5 h-5 text-[#00f589]" />,
  },
  {
    title: "Language-Specific Discovery",
    description: "Focus on the programming languages and ecosystems you care about.",
    icon: <Terminal className="w-5 h-5 text-[#00f589]" />,
  },
  {
    title: "Live GitHub Data",
    description: "Discover projects using information retrieved directly from GitHub.",
    icon: <Globe className="w-5 h-5 text-[#00f589]" />,
  },
  {
    title: "Zero Friction",
    description: "No account, subscription, or GitHub authentication required.",
    icon: <Zap className="w-5 h-5 text-[#00f589]" />,
  },
];

export function Features({ className }: FeaturesProps) {
  return (
    <section className={cn(styles.section, className)} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <Badge variant="outline" size="sm">
            ADVANTAGES
          </Badge>
          <h2 className={styles.title}>Why RepoRadar</h2>
          <p className={styles.subtitle}>
            Purpose-built intelligence designed for developers who value staying
            ahead of open-source innovation.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((item) => (
            <div key={item.title} className={styles.featureCard}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

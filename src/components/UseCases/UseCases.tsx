import React from "react";
import { Wrench, GitPullRequest, Code2, Lightbulb } from "lucide-react";
import styles from "./UseCases.module.css";
import { Badge } from "@/components/Badge";
import { cn } from "@/lib/utils";
import type { UseCasesProps } from "./types";

const USE_CASES = [
  {
    role: "Full-Stack & Systems Engineers",
    title: "Tool Hunters",
    description:
      "Find bleeding-edge developer tools, modern utility libraries, and alternative CLI utilities before they hit tech news aggregates.",
    icon: <Wrench className="w-5 h-5 text-[#00f589]" />,
  },
  {
    role: "Open Source Developers",
    title: "Early Contributors",
    description:
      "Discover fresh, high-potential projects in their foundational stages where architecture decisions and first contributions carry real impact.",
    icon: <GitPullRequest className="w-5 h-5 text-[#00f589]" />,
  },
  {
    role: "Engineering Teams",
    title: "Technology Evaluators",
    description:
      "Monitor ecosystem movement and track what peers are building in Rust, TypeScript, Go, and Python to inform architecture decisions.",
    icon: <Code2 className="w-5 h-5 text-[#00f589]" />,
  },
  {
    role: "Technical Founders",
    title: "Innovation Researchers",
    description:
      "Observe emergent patterns in developer tooling, infrastructure components, and open software stacks to identify whitespace opportunities.",
    icon: <Lightbulb className="w-5 h-5 text-[#00f589]" />,
  },
];

export function UseCases({ className }: UseCasesProps) {
  return (
    <section className={cn(styles.section, className)} id="use-cases">
      <div className={styles.container}>
        <div className={styles.header}>
          <Badge variant="outline" size="sm">
            APPLICATIONS
          </Badge>
          <h2 className={styles.title}>Built for developers</h2>
          <p className={styles.subtitle}>
            Whether you are hunting for innovative libraries or finding projects to
            contribute to, RepoRadar provides early visibility.
          </p>
        </div>

        <div className={styles.grid}>
          {USE_CASES.map((item) => (
            <div key={item.title} className={styles.useCaseCard}>
              <div className={styles.iconBox}>{item.icon}</div>
              <div className={styles.cardBody}>
                <span className={styles.targetAudience}>{item.role}</span>
                <h3 className={styles.useCaseTitle}>{item.title}</h3>
                <p className={styles.useCaseDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

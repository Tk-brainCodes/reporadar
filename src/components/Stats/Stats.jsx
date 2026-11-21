import styles from "./Stats.module.css";
import { LANGUAGES } from "@/lib/constants";

const FACTS = [
  { value: String(LANGUAGES.length - 1), label: "languages" },
  { value: "7 / 30 days", label: "creation windows" },
  { value: "10 minutes", label: "local cache" },
  { value: "GitHub REST API v3", label: "data source" },
];

export function Stats() {
  return (
    <section className={styles.statsSection} aria-label="RepoRadar at a glance">
      <div className={styles.container}>
        {FACTS.map((fact) => (
          <div className={styles.statItem} key={fact.label}>
            <span className={styles.value}>{fact.value}</span>
            <span className={styles.label}>{fact.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

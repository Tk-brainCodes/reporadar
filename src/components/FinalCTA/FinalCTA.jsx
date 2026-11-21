import { ArrowUpRight } from "lucide-react";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <h2 className={styles.headline}>Start with the repository feed.</h2>
          <p className={styles.description}>Choose a language and a date window. The results link straight to GitHub.</p>
        </div>
        <a className={styles.action} href="#explorer">
          Find repositories <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

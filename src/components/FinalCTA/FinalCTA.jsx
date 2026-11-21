import styles from "./FinalCTA.module.css";
import { Button } from "@/components/Button";

export function FinalCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <h2 className={styles.headline}>Start with the repository feed.</h2>
          <p className={styles.description}>Choose a language and a date window. The results link straight to GitHub.</p>
        </div>
        <Button variant="primary" size="md" href="#explorer">Find repositories</Button>
      </div>
    </section>
  );
}

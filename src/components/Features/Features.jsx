import { ArrowUpRight, CalendarDays, Languages, LockKeyhole, Star } from "lucide-react";
import styles from "./Features.module.css";

const FEATURES = [
  { title: "Choose a date window", description: "Look at repositories created in the last 7 or 30 days.", icon: CalendarDays },
  { title: "Filter by language", description: "Narrow the feed across 11 supported languages.", icon: Languages },
  { title: "Sort your way", description: "Compare total stars, forks, or recent updates.", icon: Star },
  { title: "Open access", description: "No account or GitHub sign-in is needed.", icon: LockKeyhole },
];

export function Features() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>The filters do the work.</h2>
          <p className={styles.subtitle}>Move from a broad scan to a useful shortlist without leaving the feed.</p>
          <a className={styles.detailLink} href="#explorer">Use the repository filters <ArrowUpRight aria-hidden="true" /></a>
        </header>
        <div className={styles.grid}>
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <article className={styles.feature} key={title}>
              <Icon aria-hidden="true" className={styles.icon} />
              <div>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDescription}>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

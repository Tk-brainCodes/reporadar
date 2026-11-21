import { Info } from "lucide-react";
import styles from "./Methodology.module.css";

const STEPS = [
  ["01", "Set a date boundary", "The selected window becomes a created-after date in the GitHub search query."],
  ["02", "Request public repositories", "The query includes the chosen language and asks GitHub for matching public repositories."],
  ["03", "Apply the selected sort", "Results are ordered by total stars, forks, or most recently updated."],
  ["04", "Cache successful responses", "A successful response is saved in local storage for up to 10 minutes."],
];

export function Methodology() {
  return (
    <section className={styles.section} id="methodology">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Know what “rising” means.</h2>
          <p className={styles.subtitle}>
            RepoRadar searches public GitHub repositories created during your chosen window. The ranking is explicit.
          </p>
        </header>

        <div className={styles.definition}>
          <Info aria-hidden="true" className={styles.infoIcon} />
          <p><strong>Stars show total popularity.</strong> They do not measure stars gained during the selected window.</p>
        </div>

        <ol className={styles.pipeline}>
          {STEPS.map(([number, title, description]) => (
            <li className={styles.pipelineRow} key={number}>
              <span className={styles.stepNumber}>{number}</span>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepText}>{description}</p>
            </li>
          ))}
        </ol>

        <dl className={styles.specs}>
          <div><dt>Data source</dt><dd>GitHub REST API v3</dd></div>
          <div><dt>Authentication</dt><dd>Unauthenticated public search</dd></div>
          <div><dt>Cache duration</dt><dd>10 minutes in your browser</dd></div>
        </dl>
      </div>
    </section>
  );
}

import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    number: "01",
    title: "Set the window",
    description: "Choose repositories created in the last 7 or 30 days, then narrow the results by language.",
  },
  {
    number: "02",
    title: "Search GitHub",
    description: "RepoRadar requests matching public repositories from the GitHub REST API.",
  },
  {
    number: "03",
    title: "Compare the results",
    description: "Sort by total stars, forks, or recent updates, then open any repository on GitHub.",
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>A search you can understand.</h2>
          <p className={styles.subtitle}>Set a boundary, choose what matters, and inspect the repositories that match.</p>
        </header>
        <div className={styles.stepsGrid}>
          {STEPS.map((step) => (
            <article className={styles.step} key={step.number}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

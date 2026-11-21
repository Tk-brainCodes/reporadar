import styles from "./UseCases.module.css";

const USE_CASES = [
  {
    role: "Full-stack and systems engineers",
    title: "Evaluate tools",
    description: "Compare new developer tools, libraries, and infrastructure projects.",
  },
  {
    role: "Open-source contributors",
    title: "Find a project to join",
    description: "Browse newly created repositories and open the source project directly.",
  },
  {
    role: "Engineering teams",
    title: "Compare ecosystems",
    description: "Filter by TypeScript, Go, Rust, Python, and other supported languages.",
  },
  {
    role: "Technical founders",
    title: "Research an idea",
    description: "Scan recent public repositories to see how others are approaching a problem.",
  },
];

export function UseCases() {
  return (
    <section className={styles.section} id="use-cases">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>A useful starting point for your next build.</h2>
        </header>
        <div className={styles.list}>
          {USE_CASES.map((item) => (
            <article className={styles.useCase} key={item.role}>
              <p className={styles.targetAudience}>{item.role}</p>
              <div className={styles.caseCopy}>
                <h3 className={styles.caseTitle}>{item.title}</h3>
                <p className={styles.caseDescription}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

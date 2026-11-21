"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./Hero.module.css";
import { Button } from "@/components/Button";
import { useRepositories } from "@/components/RepositoryExplorer/useRepositories";

const LANGUAGES = [
  { name: "JavaScript", icon: "javascript" },
  { name: "Python", icon: "python" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Rust", icon: "rust" },
  { name: "Go", icon: "go" },
  { name: "Java", icon: "java" },
  { name: "C++", icon: "cplusplus" },
  { name: "Swift", icon: "swift" },
  { name: "Kotlin", icon: "kotlin" },
  { name: "PHP", icon: "php" },
  { name: "Ruby", icon: "ruby" },
];
const FALLBACK_AVATARS = ["01", "02", "03", "04"];

export function Hero() {
  const [feed] = useRepositories();
  const owners = [...new Map(
    feed.repositories
      .filter((repository) => repository.owner?.avatar_url)
      .map((repository) => [repository.owner.login, repository.owner]),
  ).values()].slice(0, 4);

  return (
    <section className={styles.hero} id="product" aria-labelledby="hero-title">
      <div className={styles.heroInner}>
        <div className={styles.content}>
          <h1 className={styles.headline} id="hero-title">
            <span>Find what’s new</span>
            <em>in open source.</em>
          </h1>
          <p className={styles.description}>
            Explore newly created GitHub repositories by language and date. Find a project, tool, or idea worth your attention.
          </p>

          <div className={styles.actions}>
            <Button variant="primary" size="lg" href="#explorer" rightIcon={<ArrowUpRight />}>
              Explore repositories
            </Button>

            <div className={styles.ownerCard} role="group" aria-label="Explore open-source project creators">
              <div className={styles.avatarStack} aria-hidden="true">
                {owners.length > 0 ? owners.map((owner) => (
                  <Image
                    key={owner.login}
                    src={owner.avatar_url}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    className={styles.avatar}
                  />
                )) : FALLBACK_AVATARS.map((avatar) => (
                  <Image
                    key={avatar}
                    src={`/language-logos/avatar-${avatar}.jpg`}
                    alt=""
                    width={48}
                    height={48}
                    className={styles.avatar}
                  />
                ))}
              </div>
              <div className={styles.ownerCopy}>
                <strong>Open source, in motion</strong>
                <span>Discover projects from across GitHub</span>
              </div>
              <ArrowUpRight aria-hidden="true" className={styles.ownerArrow} />
            </div>
          </div>
        </div>

        <div className={styles.brandSlider} role="group" aria-label="Supported programming languages">
          <div className={styles.languageTrack}>
            {[...LANGUAGES, ...LANGUAGES].map(({ name, icon }, index) => (
              <div className={styles.language} key={`${name}-${index}`} aria-hidden={index >= LANGUAGES.length}>
                <img src={`/language-logos/${icon}.svg`} alt="" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

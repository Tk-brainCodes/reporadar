"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight, Radar } from "lucide-react";
import styles from "./Footer.module.css";
import { cn } from "@/lib/utils";
import { FooterPlayground } from "./FooterPlayground";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const getServerYear = () => 2026;

export function Footer({ className }) {
  const year = useSyncExternalStore(subscribe, getYear, getServerYear);

  return (
    <footer className={cn(styles.footer, className)}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              <Radar aria-hidden="true" className={styles.logoIcon} />
              <span>RepoRadar</span>
            </Link>
            <p className={styles.description}>
              A clear view of recently created open-source repositories, sourced from GitHub.
            </p>
          </div>
          <nav className={styles.linksGrid} aria-label="Footer">
            <div className={styles.linkGroup}>
              <span className={styles.groupTitle}>Explore</span>
              <a href="#explorer" className={styles.link}>Repository feed</a>
              <a href="#how-it-works" className={styles.link}>How it works</a>
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.groupTitle}>Source</span>
              <a href="https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories" target="_blank" rel="noopener noreferrer" className={styles.link}>
                GitHub Search API <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="https://github.com/topics/awesome" target="_blank" rel="noopener noreferrer" className={styles.link}>
                GitHub <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
        <div className={styles.bottomSection}>
          <span>© {year} RepoRadar</span>
          <span className={styles.attribution}>Public GitHub REST API v3</span>
        </div>
        <FooterPlayground />
      </div>
    </footer>
  );
}

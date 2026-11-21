"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Radar } from "lucide-react";
import styles from "./Footer.module.css";
import { cn } from "@/lib/utils";
import type { FooterProps } from "./types";

function subscribe(): () => void {
  return () => {};
}

function getClientSnapshot(): number {
  return new Date().getFullYear();
}

function getServerSnapshot(): number {
  return 2026;
}

export function Footer({ className }: FooterProps) {
  const currentYear = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  return (
    <footer className={cn(styles.footer, className)}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand}>
              <span className={styles.logoIcon} aria-hidden="true">
                <Radar className="w-4 h-4 text-[#00f589]" />
              </span>
              <span>RepoRadar</span>
            </Link>
            <p className={styles.description}>
              The developer-focused discovery radar for emerging open-source
              repositories. Discover what is rising across ecosystems before it
              becomes mainstream.
            </p>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <span className={styles.groupTitle}>Product</span>
              <a href="#explorer" className={styles.link}>
                Repository Explorer
              </a>
              <a href="#how-it-works" className={styles.link}>
                How It Works
              </a>
              <a href="#features" className={styles.link}>
                Why RepoRadar
              </a>
              <a href="#use-cases" className={styles.link}>
                Use Cases
              </a>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.groupTitle}>Transparency</span>
              <a href="#methodology" className={styles.link}>
                Data Methodology
              </a>
              <a
                href="https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub Search API
              </a>
              <a
                href="https://github.com/topics/awesome"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub Awesome
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div>
            &copy; {currentYear} RepoRadar. All rights reserved.
          </div>

          <div className={styles.attribution}>
            <span className={styles.attributionDot} aria-hidden="true" />
            <span>Data powered by the public GitHub REST API v3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

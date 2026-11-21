"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, Radar, X } from "lucide-react";
import styles from "./Navbar.module.css";
import { useNavbar } from "./useNavbar";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isOpen, isScrolled, toggleMenu, closeMenu } = useNavbar();

  return (
    <header className={cn(styles.header, isScrolled && styles.scrolled)}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand} onClick={closeMenu} aria-label="RepoRadar home">
          <Radar aria-hidden="true" className={styles.brandMark} />
          <span>RepoRadar</span>
        </Link>

        <nav className={styles.navLinks} aria-label="Main navigation">
          <a href="#explorer" className={styles.navLink}>Repository feed</a>
          <a href="#how-it-works" className={styles.navLink}>How it works</a>
          <a href="#methodology" className={styles.navLink}>Methodology</a>
        </nav>

        <div className={styles.actions}>
          <a className={styles.githubLink} href="https://github.com/topics/awesome" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight aria-hidden="true" />
          </a>
          <Button variant="primary" size="sm" href="#explorer">Browse feed</Button>
        </div>

        <button
          className={styles.menuButton}
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {isOpen && (
        <nav className={styles.mobileDrawer} aria-label="Mobile navigation">
          <a href="#explorer" onClick={closeMenu}>Repository feed</a>
          <a href="#how-it-works" onClick={closeMenu}>How it works</a>
          <a href="#methodology" onClick={closeMenu}>Methodology</a>
          <Button variant="primary" size="md" href="#explorer" onClick={closeMenu}>Browse feed</Button>
        </nav>
      )}
    </header>
  );
}

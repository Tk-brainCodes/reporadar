"use client";

import React from "react";
import Link from "next/link";
import { Radar, Menu, X, ArrowUpRight } from "lucide-react";
import styles from "./Navbar.module.css";
import { useNavbar } from "./useNavbar";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import type { NavbarProps } from "./types";

export function Navbar({ className }: NavbarProps) {
  const { isOpen, isScrolled, toggleMenu, closeMenu } = useNavbar();

  return (
    <header className={cn(styles.header, isScrolled && styles.scrolled, className)}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <span className={styles.logoIcon} aria-hidden="true">
            <Radar className="w-4 h-4 text-[#00f589]" />
          </span>
          <span>RepoRadar</span>
        </Link>

        <nav className={styles.navLinks} aria-label="Main navigation">
          <a href="#product" className={styles.navLink}>
            Product
          </a>
          <a href="#how-it-works" className={styles.navLink}>
            How it works
          </a>
          <a href="#methodology" className={styles.navLink}>
            Methodology
          </a>
          <a
            href="https://github.com/topics/awesome"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(styles.navLink, "inline-flex items-center gap-1")}
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </nav>

        <div className={styles.navActions}>
          <Button
            variant="primary"
            size="sm"
            href="#explorer"
          >
            Explore repositories
          </Button>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className={styles.mobileDrawer}>
          <a href="#product" className={styles.mobileNavLink} onClick={closeMenu}>
            Product
          </a>
          <a href="#how-it-works" className={styles.mobileNavLink} onClick={closeMenu}>
            How it works
          </a>
          <a href="#methodology" className={styles.mobileNavLink} onClick={closeMenu}>
            Methodology
          </a>
          <a
            href="https://github.com/topics/awesome"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            GitHub
          </a>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              href="#explorer"
              className="w-full"
              onClick={closeMenu}
            >
              Explore repositories
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

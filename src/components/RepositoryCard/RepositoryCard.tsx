import React from "react";
import Image from "next/image";
import { Star, GitFork, ExternalLink, Calendar } from "lucide-react";
import styles from "./RepositoryCard.module.css";
import { formatNumber, formatTimeAgo, formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { RepositoryCardProps } from "./types";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Ruby: "#701516",
};

export function RepositoryCard({ repository, className }: RepositoryCardProps) {
  const langColor = repository.language ? LANGUAGE_COLORS[repository.language] || "#00f589" : "#64748b";

  return (
    <div className={cn(styles.repoCard, className)}>
      <div className={styles.cardHeader}>
        <div className={styles.ownerInfo}>
          <Image
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
            className={styles.ownerAvatar}
            width={36}
            height={36}
            unoptimized
          />
          <div className={styles.nameBlock}>
            <span className={styles.ownerLogin}>{repository.owner.login}</span>
            <h3 className={styles.repoName} title={repository.name}>
              {repository.name}
            </h3>
          </div>
        </div>

        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
          aria-label={`Open ${repository.full_name} on GitHub`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <p className={styles.cardDescription}>
        {repository.description || "No repository description provided by the authors."}
      </p>

      <div className={styles.cardFooter}>
        <div className={styles.metaLeft}>
          <span className={styles.langIndicator}>
            <span
              className={styles.langDot}
              style={{ backgroundColor: langColor }}
              aria-hidden="true"
            />
            <span>{repository.language || "Unknown"}</span>
          </span>

          <span className={styles.statMetric} title={`${repository.stargazers_count} stars`}>
            <Star className="w-3.5 h-3.5 text-[#00f589]" />
            <span>{formatNumber(repository.stargazers_count)}</span>
          </span>

          <span className={styles.statMetric} title={`${repository.forks_count} forks`}>
            <GitFork className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span>{formatNumber(repository.forks_count)}</span>
          </span>
        </div>

        <div className={styles.metaRight}>
          <span className={styles.createdDate} title={`Created on ${formatDate(repository.created_at)}`}>
            <Calendar className="w-3 h-3 text-[#64748b]" />
            <span>{formatTimeAgo(repository.created_at)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

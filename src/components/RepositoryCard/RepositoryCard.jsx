import Image from "next/image";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import styles from "./RepositoryCard.module.css";
import { formatNumber, formatTimeAgo } from "@/lib/date";
import { cn } from "@/lib/utils";

export function RepositoryCard({ repository, className }) {
  return (
    <article className={cn(styles.repoRow, className)}>
      <div className={styles.repoIdentity}>
        <Image
          src={repository.owner.avatar_url}
          alt=""
          className={styles.ownerAvatar}
          width={40}
          height={40}
          unoptimized
        />
        <div className={styles.nameBlock}>
          <span className={styles.ownerLogin}>{repository.owner.login}</span>
          <h3 className={styles.repoName}>
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
              {repository.name}
              <ArrowUpRight aria-hidden="true" className={styles.externalLink} />
            </a>
          </h3>
          <p className={styles.cardDescription}>
            {repository.description || "No description provided by the repository owner."}
          </p>
        </div>
      </div>

      <div className={styles.repoMeta}>
        <span className={styles.language}>{repository.language || "Unspecified"}</span>
        <span className={styles.statMetric} title={`${repository.stargazers_count} stars`}>
          <Star aria-hidden="true" /> {formatNumber(repository.stargazers_count)}
        </span>
        <span className={styles.statMetric} title={`${repository.forks_count} forks`}>
          <GitFork aria-hidden="true" /> {formatNumber(repository.forks_count)}
        </span>
        <time className={styles.createdDate} dateTime={repository.created_at}>
          {formatTimeAgo(repository.created_at)}
        </time>
      </div>
    </article>
  );
}

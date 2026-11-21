import type { GitHubRepository } from "@/lib/github-types";

export interface RepositoryCardProps {
  repository: GitHubRepository;
  className?: string;
}

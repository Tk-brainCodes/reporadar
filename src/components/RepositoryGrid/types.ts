import type { GitHubRepository } from "@/lib/github-types";

export interface RepositoryGridProps {
  repositories: GitHubRepository[];
  isLoading: boolean;
  isSearchActive: boolean;
  onResetFilters: () => void;
  className?: string;
}

import { Radar, RotateCcw } from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import styles from "./ExplorerEmptyState.module.css";

export function ExplorerEmptyState({ isSearchActive, onReset, className }) {
  const title = isSearchActive
    ? "No matching repositories found"
    : "No emerging repositories detected";
  const description = isSearchActive
    ? "No repositories match your active search filter. Try clearing the search term or adjusting language and time parameters."
    : "There are currently no repositories meeting the query threshold within this discovery window. Try expanding the time filter to 30 days or selecting All Languages.";

  return (
    <div className={cn(styles.emptyContainer, className)}>
      <div className={styles.emptyIconWrapper}>
        <Radar aria-hidden="true" />
      </div>
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyDescription}>{description}</p>
      <div className="pt-2">
        <Button
          variant="primary"
          size="sm"
          onClick={onReset}
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Reset all filters
        </Button>
      </div>
    </div>
  );
}

export function getSinceDate(daysAgo) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysAgo);
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0");
    const day = String(targetDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
export function formatNumber(num) {
    return new Intl.NumberFormat("en-US", {
        notation: num >= 10000 ? "compact" : "standard",
        maximumFractionDigits: 1,
    }).format(num);
}
export function formatDate(isoString) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}
export function formatTimeAgo(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) {
        return "just now";
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
        return `${diffInDays}d ago`;
    }
    return formatDate(isoString);
}

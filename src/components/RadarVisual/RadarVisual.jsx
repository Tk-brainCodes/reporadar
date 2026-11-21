import styles from "./RadarVisual.module.css";

export function RadarVisual() {
  return (
    <div className={styles.visual} role="group" aria-label="How RepoRadar searches GitHub">
      <div className={styles.visualHeader}>
        <span className={styles.visualTitle}>Search model</span>
        <span className={styles.source}><span aria-hidden="true" /> GitHub REST API v3</span>
      </div>
      <svg className={styles.radar} viewBox="0 0 440 330" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="radar-wash" cx="0" cy="0" r="1" gradientTransform="translate(220 165) rotate(90) scale(152)">
            <stop stopColor="#FCA311" stopOpacity=".12" />
            <stop offset="1" stopColor="#FCA311" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="radar-sweep" x1="220" y1="165" x2="368" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCA311" stopOpacity=".02" />
            <stop offset="1" stopColor="#FCA311" stopOpacity=".34" />
          </linearGradient>
        </defs>
        <circle cx="220" cy="165" r="148" fill="url(#radar-wash)" />
        <circle cx="220" cy="165" r="148" stroke="rgba(229,229,229,.16)" />
        <circle cx="220" cy="165" r="108" stroke="rgba(229,229,229,.12)" />
        <circle cx="220" cy="165" r="68" stroke="rgba(229,229,229,.12)" />
        <circle cx="220" cy="165" r="28" stroke="rgba(229,229,229,.1)" />
        <path d="M72 165h296M220 17v296M115 60l210 210M115 270 325 60" stroke="rgba(229,229,229,.08)" />
        <g className={styles.sweep}>
          <path d="M220 165 368 72a148 148 0 0 1 0 186L220 165Z" fill="url(#radar-sweep)" />
          <path d="M220 165 368 72" stroke="#FCA311" strokeOpacity=".8" />
        </g>
        <circle cx="302" cy="109" r="4" fill="#FCA311" />
        <circle cx="151" cy="211" r="3" fill="#E5E5E5" />
        <circle cx="278" cy="239" r="3" fill="#FCA311" />
        <circle cx="220" cy="165" r="5" fill="#FCA311" />
      </svg>
      <div className={styles.visualFooter}>
        <div className={styles.queryBlock}>
          <span className={styles.metaLabel}>Creation window</span>
          <span className={styles.metaValue}>Last 7 or 30 days</span>
        </div>
        <div className={styles.queryBlock}>
          <span className={styles.metaLabel}>Default ranking</span>
          <span className={styles.metaValue}>Total stars</span>
        </div>
        <div className={styles.queryMark} aria-hidden="true">RR<span>/</span>01</div>
      </div>
    </div>
  );
}

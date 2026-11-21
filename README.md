# RepoRadar

> Discover what's rising in open source.

RepoRadar is a production-quality developer intelligence landing page and repository discovery engine. Built for software engineers, engineering teams, and open-source contributors, RepoRadar scans public repositories created on GitHub to highlight high-traction projects across modern developer ecosystems.

---

## 1. Project Overview

RepoRadar solves a persistent problem for developers: finding innovative new open-source projects before they become ubiquitous. Rather than presenting static marketing materials or artificial mock data, RepoRadar pairs a dark-first SaaS design with an interactive, live GitHub repository discovery explorer.

## 2. Product Purpose & Value Proposition

- **Core Value Proposition:** Find emerging GitHub projects, discover innovative developer tools, and explore interesting open-source repositories before they become widely known.
- **Target Audience:** Frontend, backend, and full-stack engineers, open-source contributors, engineering managers, and technical founders.
- **Brand Personality:** Technical, minimal, intelligent, trustworthy, and developer-focused.

---

## 3. Key Features

- **Interactive Repository Explorer:**
  - Real-time GitHub search querying unauthenticated public endpoints.
  - Multi-ecosystem filtering: All Languages, TypeScript, JavaScript, Python, Rust, Go, Java, C++, Swift, Kotlin, PHP, and Ruby.
  - Dynamic time-boundary calculation: Last 7 days or Last 30 days.
  - Multiple sorting metrics: Most stars, Most forks, and Recently updated.
  - Instant client-side search filtering across repository names, owners, and descriptions without repetitive network roundtrips.
  - Expandable results grid displaying up to 12 repositories per search view.
- **Status & Transparency Indicators:**
  - Real-time data state indicator: distinguishes fresh API data, 10-minute local cached entries, and stale fallbacks.
  - Manual cache bypass refresh button with request deduplication and concurrent click prevention.
  - Graceful rate-limit detection explaining the 60 requests/hour unauthenticated threshold with interactive retries.
- **Responsive interface:**
  - Scoped CSS Modules, a mobile navigation drawer, touch-friendly controls, and reduced-motion support.
  - Keyboard focus indicators and semantic labels for interactive controls.

---

## 4. Trending Methodology & Transparency

> **Important Disclosure:**
> GitHub does not expose an official trending repositories API. RepoRadar defines rising repositories as public repositories created within the selected time window, ranked by their total GitHub star count. This ranking does not represent the number of stars gained during that time window.

### Discovery Pipeline:
1. **Dynamic Time Horizon:** Derives a calendar-date cutoff (e.g. `created:>=YYYY-MM-DD`) for the selected 7- or 30-day window.
2. **REST Query Execution:** Queries GitHub's `/search/repositories` API with the requested language qualifier and sorting parameters.
3. **Cumulative Metric Ordering:** Ranks results by cumulative stargazers or fork volume to elevate standout projects.
4. **Local TTL Caching:** Stores verified payloads in `localStorage` for 10 minutes to protect client IP rate quotas.

---

## 5. Caching & Rate-Limit Strategy

GitHub's unauthenticated REST API allows up to **60 requests per hour per originating IP**. To maximize availability:

- **Query-Specific Cache Keys:** Formatted as `${timeWindow}_${language}_${sort}_${perPage}`.
- **10-Minute Time-To-Live (TTL):** Subsequent requests for the same parameters within 10 minutes are returned instantly from `localStorage`.
- **In-Flight Request Deduplication:** Prevents duplicate concurrent network requests using an internal promise map.
- **Request Cancellation:** Aborts outdated in-flight requests using `AbortController` whenever the user switches filters rapidly.
- **Stale-While-Error Fallback:** If GitHub returns a rate limit (HTTP 403/429) or transient network error, previously cached results are presented with a "Stale Fallback" warning.
- **Manual Bypass:** The Refresh button bypasses cached entries and initiates a fresh network request.

---

## 6. Technologies Used

- **Framework:** Next.js 16 (App Router) with React 19 and JavaScript (ES modules, JSX)
- **Styling:** Scoped CSS Modules (`*.module.css`) and Tailwind CSS v4
- **Utilities & Motion:** `clsx`, `tailwind-merge`, and Framer Motion
- **Icons:** `lucide-react`
- **Data Source:** GitHub REST API v3 (`https://api.github.com/search/repositories`)

---

## 7. Directory Structure

```text
src/
├── app/
│   ├── globals.css                       # Brand tokens & base reset
│   ├── layout.jsx                        # Root layout, fonts & OpenGraph metadata
│   └── page.jsx                          # RSC landing page aggregating all sections
├── components/                           # Strictly encapsulated component folders
└── lib/                                  # Core business logic, cache, API & utilities
    ├── cache.js                          # LocalStorage TTL cache manager
    ├── constants.js                      # Languages, query defaults & URLs
    ├── date.js                           # Dynamic date boundary & formatting helpers
    ├── github.js                         # GitHub REST API service & deduplication
    └── utils.js                          # Tailwind merge utility (cn)
```

---

## 8. Getting Started

### Prerequisites
- Node.js 20+ installed
- npm or pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

### Engineering conventions
- Keep application code in JavaScript and JSX; do not introduce TypeScript files or type-checking dependencies.
- Keep styles scoped to component CSS Modules unless a token or reset belongs in `src/app/globals.css`.
- Keep GitHub API and cache behavior in `src/lib/`; keep view state in focused React hooks.
- Use semantic HTML, keyboard-visible focus, reduced-motion support, and controls that remain usable on touch screens.
- Before submitting changes, run `npm run lint` and `npm run build`.

---

## 9. Limitations & Future Scope

### Current Limitations:
- Unauthenticated GitHub API calls are subject to the 60 requests/hour IP limit.
- The explorer requests up to 12 repositories per query; sorting and text filtering operate on that result set.
- Repository totals and stars are current GitHub values, not historical growth measurements.
- The browser calls GitHub directly, so API availability and rate limits are controlled by GitHub.

### Future Improvements (Not in Initial Scope):
- Local repository bookmarking using `localStorage`.
- Historical repository analytics with backend-recorded star velocity snapshots.
- Language ecosystem trend breakdowns and comparison tools.
- A server-side proxy or authenticated integration if product scale requires centralized quotas or additional data sources.

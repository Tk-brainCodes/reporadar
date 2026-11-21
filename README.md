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
  - Multiple sorting metrics: Most stars, Most forks, and Recently created.
  - Instant client-side search filtering across repository names, owners, and descriptions without repetitive network roundtrips.
  - Expandable results grid displaying up to 12 repositories per search view.
- **Status & Transparency Indicators:**
  - Real-time data state indicator: distinguishes fresh API data, 10-minute local cached entries, and stale fallbacks.
  - Manual cache bypass refresh button with request deduplication and concurrent click prevention.
  - Graceful rate-limit detection explaining the 60 requests/hour unauthenticated threshold with interactive retries.
- **Developer SaaS Design System:**
  - Scoped CSS Modules with custom radar sweep visual, concentric grid rings, and glowing coordinates.
  - Accessible keyboard navigation and mobile-responsive drawer.
  - Dark-mode aesthetic inspired by Linear and Raycast.

---

## 4. Trending Methodology & Transparency

> **Important Disclosure:**
> GitHub does not expose an official trending repositories API. RepoRadar defines rising repositories as public repositories created within the selected time window, ranked by their total GitHub star count. This ranking does not represent the number of stars gained during that time window.

### Discovery Pipeline:
1. **Dynamic Time Horizon:** Derives an exact ISO 8601 calendar cutoff (e.g. `created:>=YYYY-MM-DD`).
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

- **Framework:** Next.js 16 (App Router) with React 19 & TypeScript 5
- **Styling:** Scoped CSS Modules (`*.module.css`) for animations and component layouts + Tailwind CSS v4 design tokens (`globals.css`)
- **UI Primitives & Motion:** `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, Framer Motion, and GSAP
- **Icons:** `lucide-react`
- **Data Source:** GitHub REST API v3 (`https://api.github.com/search/repositories`)

---

## 7. Directory Structure

```text
src/
├── app/
│   ├── globals.css                       # Brand tokens & base reset
│   ├── layout.tsx                        # Root layout, fonts & OpenGraph metadata
│   └── page.tsx                          # RSC landing page aggregating all sections
├── components/                           # Strictly encapsulated component folders
│   ├── Badge/                            # Badge.tsx, Badge.module.css, types.ts, index.ts
│   ├── Button/                           # Button.tsx, Button.module.css, types.ts, index.ts
│   ├── Card/                             # Card.tsx, Card.module.css, types.ts, index.ts
│   ├── ExplorerEmptyState/               # EmptyState.tsx, EmptyState.module.css, types.ts, index.ts
│   ├── ExplorerErrorState/               # ErrorState.tsx, ErrorState.module.css, types.ts, index.ts
│   ├── ExplorerFilters/                  # Filters.tsx, Filters.module.css, types.ts, index.ts
│   ├── Features/                         # Features.tsx, Features.module.css, types.ts, index.ts
│   ├── FinalCTA/                         # FinalCTA.tsx, FinalCTA.module.css, types.ts, index.ts
│   ├── Footer/                           # Footer.tsx, Footer.module.css, types.ts, index.ts
│   ├── Hero/                             # Hero.tsx, Hero.module.css, types.ts, index.ts
│   ├── HowItWorks/                       # HowItWorks.tsx, HowItWorks.module.css, types.ts, index.ts
│   ├── Methodology/                      # Methodology.tsx, Methodology.module.css, types.ts, index.ts
│   ├── Navbar/                           # Navbar.tsx, Navbar.module.css, useNavbar.ts, types.ts, index.ts
│   ├── RadarVisual/                      # RadarVisual.tsx, RadarVisual.module.css, types.ts, index.ts
│   ├── RepositoryCard/                   # RepositoryCard.tsx, RepositoryCard.module.css, types.ts, index.ts
│   ├── RepositoryExplorer/               # RepositoryExplorer.tsx, RepositoryExplorer.module.css, useRepositories.ts, types.ts, index.ts
│   ├── RepositoryGrid/                   # RepositoryGrid.tsx, RepositoryGrid.module.css, types.ts, index.ts
│   ├── RepositorySkeleton/               # RepositorySkeleton.tsx, RepositorySkeleton.module.css, types.ts, index.ts
│   ├── StatusIndicator/                  # StatusIndicator.tsx, StatusIndicator.module.css, types.ts, index.ts
│   └── Stats/                            # Stats.tsx, Stats.module.css, types.ts, index.ts
├── hooks/                                # Global, shared utility hooks
│   ├── useIsMobile.ts                    # SSR-safe viewport hook
│   └── useReducedMotion.ts               # SSR-safe reduced motion preference hook
└── lib/                                  # Core business logic, cache, API & utilities
    ├── cache.ts                          # LocalStorage TTL cache manager
    ├── cache-types.ts                    # Cache data structures & lookup types
    ├── constants.ts                      # Languages, query defaults & URLs
    ├── date.ts                           # Dynamic date boundary & formatting helpers
    ├── github.ts                         # GitHub REST API service & deduplication
    ├── github-types.ts                   # GitHub domain entities & response types
    └── utils.ts                          # Tailwind merge utility (cn)
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

---

## 9. Limitations & Future Scope

### Current Limitations:
- Unauthenticated GitHub API calls are subject to the 60 requests/hour IP limit.
- Sorting applies to the top results retrieved from the GitHub search endpoint.

### Future Improvements (Not in Initial Scope):
- Local repository bookmarking using `localStorage`.
- Historical repository analytics with backend-recorded star velocity snapshots.
- Language ecosystem trend breakdowns and comparison tools.

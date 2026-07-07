# MacroSpark

Finance and economics intelligence platform — long-form research, market analysis, quant projects, and newsletter. Institutional standard, not a blog.

---

## Tech Stack

| Layer      | Technology                                                | Why                                                                                    |
| ---------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Framework  | Next.js 14 (App Router)                                   | RSC for static content sections, no TS overhead for this phase                         |
| Styling    | SCSS Modules + ITCSS                                      | Predictable specificity, zero runtime cost, design token system via CSS custom props   |
| Animation  | Framer Motion v11 — `LazyMotion` + `domAnimation`         | Tree-shakeable animation bundle; `m.div` not `motion.div` everywhere                   |
| State      | Zustand (auth) · SWR (server data) · URL params (filters) | Right tool per concern — no single global store                                        |
| Auth       | RS256 JWT + HttpOnly cookies                              | Access token in RAM only (XSS-safe); refresh token in HttpOnly cookie (JS-unreachable) |
| Backend    | Express 4 + MongoDB Atlas + Mongoose 8                    | In `server/` — separate from frontend                                                  |
| Validation | Zod                                                       | Frontend env + backend request schemas — single schema = single source of truth        |
| Logging    | Winston (JSON) + Morgan                                   | Structured logs, parseable by any log aggregator                                       |

---

## Project Structure

```
macro_spark/
├── src/
│   ├── app/                    # Next.js App Router — page.jsx + layout.jsx per segment
│   ├── components/
│   │   ├── auth/               # AuthInitializer — restores session on boot
│   │   ├── animation/          # FadeIn, SlideIn, StaggerList wrappers
│   │   ├── features/research/  # ResearchCard, Filters, Search, Pagination
│   │   ├── layout/             # Navbar, Footer, Container, PageLayout
│   │   ├── sections/           # Hero, MarketTicker, DashboardPreview, CTA
│   │   └── ui/                 # Button, Card, Typography — design system primitives
│   ├── lib/
│   │   ├── apiClient.js        # fetch wrapper: auth header, 401 silent refresh, request queue
│   │   ├── authService.js      # loginUser, registerUser, refreshSession, logoutUser
│   │   └── research.js         # mock data — replaced by Sanity in Sprint 8
│   ├── store/authStore.js      # Zustand: user · accessToken · authStatus
│   ├── constants/              # routes, navigation, roles, metadata, content types
│   ├── animations/             # Framer Motion variants (fade, slide, scale, stagger, page)
│   ├── middleware.js           # Edge: guards /dashboard /settings /bookmarks
│   └── styles/                 # ITCSS: abstracts → base → layout → themes → utilities
│
├── server/                     # Express backend (separate process)
│   └── src/
│       ├── config/             # env.js (Zod), database.js, redis.js, logger.js
│       ├── models/             # Mongoose schemas (strict, timestamps, select: false on secrets)
│       ├── controllers/        # thin — parse → service → respond
│       ├── routes/
│       ├── middlewares/        # authenticate, validate, rateLimiter, sanitize
│       └── validators/         # Zod schemas per domain
│
└── src/__tests__/              # Jest: unit + integration
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas URI (or local MongoDB)
- Redis (optional in dev — falls back to in-memory rate limiter)

### Frontend

```bash
# Install dependencies
npm install

# Copy and fill environment variables
cp .env.example .env.local

# Start dev server
npm run dev          # http://localhost:3000
```

### Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev          # http://localhost:5000
```

---

## Available Scripts

```bash
# Frontend
npm run dev              # Next.js dev server
npm run build            # Production build
npm run lint             # ESLint
npm run lint:fix         # ESLint with auto-fix
npm run format           # Prettier (write)
npm run format:check     # Prettier (check only)
npm test                 # Jest
npm run test:watch       # Jest watch mode
npm run test:coverage    # Jest with coverage report
```

---

## Environment Variables

### Frontend — `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend — `server/.env`

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=
REDIS_URL=
JWT_PRIVATE_KEY=          # base64-encoded RS256 PEM
JWT_PUBLIC_KEY=           # base64-encoded RS256 PEM
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
ALLOWED_ORIGINS=http://localhost:3000
RESEND_API_KEY=
ALGOLIA_APP_ID=
ALGOLIA_ADMIN_KEY=
SANITY_WEBHOOK_SECRET=
BCRYPT_ROUNDS=12
```

> See `.env.example` for a full template. Never commit `.env.local` or `server/.env`.

---

## Auth Flow

```
POST /auth/login
  → Zod validation
  → bcrypt.compare (12 rounds)
  → sign RS256 JWT (15min access token)
  → UUID refresh token → SHA-256 → store in MongoDB
  → Set-Cookie: refreshToken; HttpOnly; Secure; SameSite=Strict
  → body: { accessToken, user }

Client boot:
  AuthInitializer (in Providers) → refreshSession() → restores session from cookie

Silent refresh:
  apiClient catches 401 TOKEN_EXPIRED → POST /auth/refresh
  Concurrent requests during refresh are queued → retried with new token
```

**Security model:** access token lives in Zustand (RAM only — not localStorage, not a cookie). Refresh token in HttpOnly cookie — JS cannot read it, browser sends it automatically. Token rotation on every refresh.

---

## Architecture Decisions

- **No TypeScript (yet):** JSDoc provides type hints with zero compilation overhead. Migration path is clear when the team scales.
- **ITCSS over Tailwind:** Tailwind couples design decisions to markup. ITCSS with CSS custom properties gives the same token system with cleaner component code.
- **Zustand over Redux:** Selector-based subscriptions mean components only re-render for their slice. Synchronous reads work outside React (used in `apiClient` interceptor).
- **SWR for server data:** Built-in deduplication, revalidation on focus, and stale-while-revalidate semantics — no manual cache management.
- **RS256 over HS256:** Asymmetric signing — public key can be shared with third-party services for verification without exposing the signing secret.

---

## Contributing

```bash
# 1. Create a feature branch
git checkout -b feat/your-feature-name

# 2. Make changes — follow commit convention below
git commit -m "feat: add newsletter double opt-in flow"

# 3. Open a Pull Request against main
# Ensure lint, typecheck, and tests pass before requesting review
```

### Commit convention

```
feat:     new feature
fix:      bug fix
refactor: code change that neither fixes a bug nor adds a feature
test:     adding or updating tests
docs:     documentation only
chore:    tooling, config, dependencies
```

---

## Sprint Status

| Sprint | What                                                             | Status |
| ------ | ---------------------------------------------------------------- | ------ |
| 1–2    | Setup, SCSS design system, routing                               | ✓      |
| 3      | Home, Research, Markets, About, Contact pages                    | ✓      |
| 4      | Analysis detail, Newsletter, Legal, 404                          | ✓      |
| 5      | Express + MongoDB + auth endpoints                               | ✓      |
| 6      | QA — 3C + 6H + 6M + 4L bugs fixed                                | ✓      |
| 7      | Auth flow, Zustand, apiClient, middleware, tests                 | ✓      |
| 8      | Resend email, Sanity CMS, Playwright E2E, mobile menu focus trap | todo   |

Production readiness: **82/100**

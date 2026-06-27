# MacroSpark

Finance + economics intelligence platform. Long-form research, market analysis, quant projects, newsletter. Institutional standard — not a blog.

---

## Stack

- **Frontend**: Next.js 14.2.5 (App Router), React 18, JSDoc only (no TS for now)
- **Styling**: SCSS Modules + ITCSS. CSS custom props for all tokens.
- **Animation**: Framer Motion v11. LazyMotion + domAnimation. Use `m.div` — never `motion.div`.
- **State**: Zustand (auth/theme/toast) · SWR (revalidation) · URL params (filters)
- **Backend**: Express 4, CommonJS
- **DB**: MongoDB Atlas + Mongoose 8
- **Validation**: Zod everywhere — frontend env + backend request schemas
- **Logging**: Winston (structured JSON) + Morgan
- **Auth**: RS256 JWT, bcrypt 12 rounds, HttpOnly cookie for refresh

---

## Folder layout

```
macro_spark/
├── src/
│   ├── app/                    # routes — page.jsx + layout.jsx per segment
│   ├── components/
│   │   ├── auth/               # AuthInitializer.jsx
│   │   ├── features/           # ResearchSearch etc
│   │   └── layout/             # Navbar, Footer
│   ├── lib/
│   │   ├── apiClient.js        # fetch wrapper — 401 → silent refresh → retry queue
│   │   ├── authService.js      # loginUser, registerUser, refreshSession, logoutUser
│   │   └── research.js         # mock data (ARTICLES, MARKET_NEWS) — replace w/ Sanity in S8
│   ├── store/authStore.js      # Zustand: user · accessToken · authStatus
│   ├── constants/routes.js     # ROUTES.* — never hardcode paths
│   ├── middleware.js           # edge: guards /dashboard /settings /bookmarks
│   └── styles/                 # abstracts → base → layout → themes → utilities
│
├── server/src/
│   ├── config/                 # env.js (Zod), database.js, redis.js, logger.js
│   ├── models/                 # Mongoose schemas
│   ├── controllers/            # thin — parse → service → respond
│   ├── routes/
│   ├── middlewares/            # authenticate, validate, rateLimiter, sanitize
│   ├── validators/             # Zod schemas per domain
│   └── app.js / server.js
│
├── src/__tests__/              # Jest (frontend)
└── server/__tests__/           # Jest unit + integration (backend)
```

---

## Auth flow

```
POST /auth/login
  → validate (Zod)
  → bcrypt.compare
  → sign RS256 JWT (15min access token)
  → random UUID refresh token → SHA-256 → store in MongoDB
  → Set-Cookie: refreshToken; HttpOnly; Secure; SameSite=Strict
  → body: { accessToken, user }

Client boot:
  AuthInitializer (in Providers) → calls refreshSession() → restores session from cookie

Silent refresh:
  apiClient catches 401 TOKEN_EXPIRED → POST /auth/refresh (cookie auto-sent)
  concurrent requests during refresh queued → retried with new token

Edge middleware:
  checks cookie PRESENCE only (not validity — RS256 verify in edge is annoying)
  /dashboard /settings /bookmarks → redirect /login?next=<path> if no cookie
  /login /register /forgot-password /reset-password → redirect /dashboard if has cookie
```

accessToken lives in Zustand (RAM only — never localStorage). Refresh token in HttpOnly cookie — JS can't touch it. Rotation on every refresh.

---

## SCSS rules

- First line in every module: `@use 'styles/abstracts' as *`
- Typography: `@include type-scale('body-md')` — not px values
- Colors: `var(--color-text-primary)` — no hex in components
- No `!important`. No element selectors. No global selectors inside modules.

---

## Component rules

- Default server component. `'use client'` only for hooks/events/Framer.
- `m.div` not `motion.div` — LazyMotion is wired in `providers.jsx`
- Accessibility: `aria-label`, `aria-invalid`, `aria-describedby` on interactive elements

---

## API client usage

```js
import { api } from '@/lib/apiClient'

api.get('/research')
api.post('/auth/login', body, { skipAuth: true })
// throws ApiError: { message, status, code, details }
```

## Auth store

```js
import useAuthStore from '@/store/authStore'
const { user, authStatus } = useAuthStore((s) => ({ user: s.user, authStatus: s.authStatus }))
// authStatus: 'loading' | 'authenticated' | 'unauthenticated'
```

## Routes

```js
import { ROUTES } from '@/constants/routes'
// ROUTES.LOGIN, ROUTES.DASHBOARD, etc. — never '/login' inline
```

---

## Env vars

### Frontend
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (`server/.env`)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
REDIS_URL=                  # optional in dev — falls back to memory limiter
JWT_PRIVATE_KEY=            # base64-encoded RS256 PEM
JWT_PUBLIC_KEY=             # base64-encoded RS256 PEM
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
ALLOWED_ORIGINS=http://localhost:3000
RESEND_API_KEY=
ALGOLIA_APP_ID=
ALGOLIA_ADMIN_KEY=
SANITY_WEBHOOK_SECRET=
BCRYPT_ROUNDS=12
```

---

## DB collections

| Collection | Purpose |
|---|---|
| `users` | Auth identity. Roles: ADMIN / EDITOR. |
| `refresh_tokens` | Token registry (SHA-256 hash stored). TTL index on `expiresAt`. |
| `newsletter_subscribers` | Subscription lifecycle (PENDING / CONFIRMED / UNSUBSCRIBED) |
| `contact_messages` | Inbound contact form. Admin read-only. |
| `audit_logs` | Append-only. Never update or delete this collection. |
| `content_metadata` | Sanity shadow copy for server-side queries + Algolia sync state |

All schemas: `strict: true`, `timestamps: true`. `toJSON` strips `__v`, renames `_id → id`. Sensitive fields (`passwordHash`, `confirmToken`) are `select: false`.

---

## Error codes

| Code | HTTP | When |
|---|---|---|
| `INVALID_CREDENTIALS` | 401 | Wrong email or password |
| `ACCOUNT_LOCKED` | 401 | 5 failed attempts → 30min lockout |
| `TOKEN_EXPIRED` | 401 | Access token past expiry |
| `TOKEN_REVOKED` | 401 | Refresh token reused → all sessions killed |
| `ALREADY_EXISTS` | 409 | Duplicate email on register |
| `VALIDATION_ERROR` | 422 | Zod fail — `details[]` has per-field errors |
| `NOT_FOUND` | 404 | Resource missing |

---

## Security notes

- `/auth/login` and `/auth/forgot-password` return identical responses regardless of email existence (enumeration prevention)
- 5 failed logins → `lockedUntil = now + 30min`
- Refresh token reuse → `TOKEN_REVOKED` + all sessions nuked
- `mongo-sanitize` strips `$`-prefixed keys before any route handler runs
- Rate limits: auth 10/15min, password reset 5/hr, contact 3/hr (Redis-backed, in-memory fallback in dev)

---

## Dev setup

```bash
# frontend
npm install
npm run dev        # localhost:3000

# backend
cd server
npm install
cp .env.example .env
npm run dev        # localhost:5000
```

## Tests

```bash
npx jest src/__tests__/unit/authStore.test.js
npx jest server/__tests__/unit/validators.test.js
npx jest server/__tests__/integration/auth.routes.test.js
```

---

## Sprint status

| Sprint | What | Status |
|---|---|---|
| 1–2 | Setup, SCSS design system, routing | ✓ |
| 3 | Home, Research, Markets, About, Contact pages | ✓ |
| 4 | Analysis detail, Newsletter, Legal, 404 | ✓ |
| 5 | Express + MongoDB + auth endpoints | ✓ |
| 6 | QA — 3C + 6H + 6M + 4L bugs fixed | ✓ |
| 7 | Auth flow, Zustand, apiClient, middleware, tests | ✓ |
| 8 | Resend email, Sanity CMS, Playwright E2E, mobile menu focus trap | todo |

Production readiness: **82/100**

Remaining blockers: Resend integration (reset password + newsletter confirm), Sanity replacing mock data, mobile menu `aria-modal` focus trap (M1).

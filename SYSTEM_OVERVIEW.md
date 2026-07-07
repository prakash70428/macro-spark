# MacroSpark — System Architecture

---

## 👤 User / Visitor

```
Browser → macrospark.vercel.app
```

---

## 🖥️ Frontend — Vercel (Next.js)

```
┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  ┌──────────────────────┐  ┌───────────────────────┐
│    About    │  │    Blogs    │  │      Articles       │  │       Research       │  │    Quant Projects     │
│─────────────│  │─────────────│  │─────────────────────│  │──────────────────────│  │───────────────────────│
│ MacroSpark  │  │ data.js mein│  │ PDF daalo:          │  │ PDF daalo:           │  │ .py daalo:            │
│ ke baare    │  │ object add  │  │ public/articles/    │  │ public/research/     │  │ public/quant/         │
│ mein        │  │ karo        │  │ + data.js update    │  │ + data.js update     │  │ + data.js update      │
└─────────────┘  └─────────────┘  └─────────────────────┘  └──────────────────────┘  └───────────────────────┘
```

---

## ⚙️ Backend — Railway (Express.js)

```
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│       Auth API       │  │       Security       │  │      Validation      │
│──────────────────────│  │──────────────────────│  │──────────────────────│
│ /api/auth/register   │  │ Rate Limiting        │  │ Zod schema check     │
│ /api/auth/login      │  │ JWT Tokens           │  │ XSS Protection       │
│ /api/auth/logout     │  │ bcrypt passwords     │  │ Sanitization         │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

---

## 🗄️ Database — MongoDB Atlas

```
┌─────────────────────────────────────┐  ┌─────────────────────────────────────┐
│          Users Collection           │  │              Sessions               │
│─────────────────────────────────────│  │─────────────────────────────────────│
│ naam, email, hashed password        │  │ Refresh tokens                      │
│ role, createdAt                     │  │ (HttpOnly cookie mein store hota)   │
└─────────────────────────────────────┘  └─────────────────────────────────────┘
```

---

## 📦 Client Content Add Karne Ka Flow

### Blog Add Karna

```
1. src/app/blogs/data.js kholo
2. BLOGS array mein naya object add karo:
   {
     slug:     'blog-ka-url',
     title:    'Blog Title',
     excerpt:  'Short description...',
     date:     'Jun 27, 2026',
     readTime: '5 min read',
     category: 'FX',
   }
3. Git push karo → Vercel automatic deploy kar dega
```

### Article / Research PDF Add Karna

```
1. PDF file yahan daalo:
   └── public/
       ├── articles/  ← articles ke liye
       └── research/  ← research papers ke liye

2. Respective data.js mein entry add karo:
   src/app/articles/data.js   ← articles ke liye
   src/app/research/page.jsx  ← research ke liye

3. Git push karo → Vercel automatic deploy kar dega
```

### Quant Project (.py) Add Karna

```
1. .py file yahan daalo:
   └── public/
       └── quant/  ← .py files yahan

2. src/app/quant-projects/data.js mein entry add karo:
   {
     id:          'project-naam',
     title:       'Project Title',
     description: 'Kya karta hai...',
     category:    'Backtesting',
     tags:        ['pandas', 'numpy'],
     file:        '/quant/file-name.py',
     fileName:    'file-name.py',
   }

3. Git push karo → Vercel automatic deploy kar dega
```

---

## 🔐 User Register / Login Flow

```
  User                  Frontend               Backend              MongoDB
   │                       │                      │                    │
   │── /register page ────▶│                      │                    │
   │   naam + email        │                      │                    │
   │   + password          │                      │                    │
   │                       │── POST /api/auth ───▶│                    │
   │                       │   register           │                    │
   │                       │                      │── password hash ──▶│
   │                       │                      │   bcrypt           │
   │                       │                      │                    │── save user ──▶ Atlas
   │                       │◀── JWT token ────────│                    │
   │◀── /dashboard ────────│                      │                    │
   │    redirect           │                      │                    │
```

---

## 🚀 Deployment

| Layer    | Platform      | URL                        |
| -------- | ------------- | -------------------------- |
| Frontend | Vercel        | macrospark.vercel.app      |
| Backend  | Railway       | macrospark-api.railway.app |
| Database | MongoDB Atlas | Cloud (free M0 cluster)    |

### Environment Variables (Backend — Railway mein set karna)

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
CLIENT_URL=https://macrospark.vercel.app
```

### Environment Variables (Frontend — Vercel mein set karna)

```
NEXT_PUBLIC_API_URL=https://macrospark-api.railway.app
```

---

_Client ko sirf `public/` folder aur `data.js` files touch karni hain — baaki sab automatic._

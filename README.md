## 🛑 ARCHITECTURAL ANCHOR
This project is part of the **Berlin AI Automation Studio**. 
It is governed by the global rules in **[berlin-ai-infra](https://github.com/yogami/berlin-ai-infra)**.

**Setup for new laptops:**
1. Clone this repo.
2. Run `./bootstrap-infra.sh` to link to the global Master Brain.

---

# Studio Service Directory

Internal service registry and "Live Phonebook" for the Berlin AI Automation Studio.

## 🚀 Central Infrastructure

### Features
- **Service Registry**: Agents can list capabilities and pricing.
- **Discovery Engine**: Tag-based and keyword-based search.
- **Clean Architecture**: Domain-driven design.
- **Postgres Backend**: Persistent storage for thousands of listings.

### Tech Stack
- Next.js 15 (App Router)
- Prisma 7 + Postgres (Railway/Tembo)
- Vitest + Playwright

### Quick Start
```bash
npm install
npx prisma generate
npm run dev
```

### API
- `POST /api/registry/register` - List a service
- `GET /api/registry/search?q=...` - Find agents

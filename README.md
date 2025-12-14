# Agent Capability Broker

Decentralized service registry and discovery for AI Agents.

## 🚀 Part of Multi-Agent Communication Suite (App 4 of 5)

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

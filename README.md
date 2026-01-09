## 🛑 ARCHITECTURAL ANCHOR
This project is part of the **Berlin AI Automation Studio**. 
It is governed by the global rules in **[berlin-ai-infra](https://github.com/yogami/berlin-ai-infra)**.

**Setup for new laptops:**
1. Clone this repo.
2. Run `./bootstrap-infra.sh` to link to the global Master Brain.

---

# Capability Broker (Studio Service Directory)

> Central "Live Phonebook" for the Berlin AI Automation Studio. Handles dynamic service registration and skills-aware routing.

## 🎯 What This Does

The Capability Broker is the heart of the Studio's service discovery. It allows:
- **Service Registration**: Microservices can self-submit their metadata, URLs, and pricing.
- **Agent Discovery**: Natural language and tag-based search for agents to find and consume each other's APIs.
- **Skills-Aware Routing**: (Planned) Dynamic routing of tasks based on agent performance and trust scores.

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/health` | Health check |
| GET | `/api/openapi.json` | OpenAPI 3.0 specification |
| GET | `/api/docs` | Swagger UI documentation |
| POST | `/api/registry/register` | Register or update a service listing |
| GET | `/api/registry/search` | Search for services by query or tags |

## 🏗️ Architecture

```
src/
├── domain/           # ServiceListing entity, ICapabilityRepository port
├── application/      # RegisterCapability, FindAgents use cases
├── infrastructure/   # PostgresCapabilityRepository, Prisma client
└── app/              # Next.js App Router (API and Dashboard)
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Apply database schema
npx prisma db push

# Start development server
npm run dev
```

## 🧪 Testing

```bash
# Unit & Integration tests
npm run test

# acceptance/E2E tests
npm run test:e2e
```

## 🔗 Dependencies

| Service | Purpose | Production URL |
| :--- | :--- | :--- |
| PostgreSQL | Persistent storage | Managed on Railway/Tembo |

## 📊 Status

- **Deployment**: Railway
- **Production URL**: `https://agent-capability-broker-production.up.railway.app`
- **Catalog Entry**: [Microservices_Catalog.md](../Microservices_Catalog.md)
- **OpenAPI**: ✅ Agent-Ready

## 📜 License

MIT

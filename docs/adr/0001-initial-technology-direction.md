# ADR-0001: Initial Technology Direction

- Status: Accepted
- Date: 2026-09-05
- Issue: #17

## Context

Mahabharata AI needs a maintainable foundation for a source-aware, multilingual knowledge product. The first delivery must support a web experience, an application API, structured domain data, search, and a future grounded AI layer.

## Decision

Use a TypeScript Next.js web application and a Python FastAPI API in a monorepo. Use PostgreSQL as the initial system of record. Encapsulate search, vector retrieval, and AI providers behind application interfaces so infrastructure providers remain replaceable.

## Rationale

- TypeScript provides a strong contract for the web application.
- Python provides a mature ecosystem for data, retrieval, evaluation, and AI workloads.
- PostgreSQL supports relational domain data, provenance, and initial full-text search without introducing unnecessary infrastructure in the first slice.
- Provider adapters reduce coupling to a specific AI or vector vendor.
- A monorepo keeps the early product boundary explicit and simplifies coordinated changes.

## Consequences

Positive:
- Clear separation between presentation, application services, domain concepts, and infrastructure.
- Strong support for future retrieval and evaluation workloads.
- Small initial operational footprint.

Negative:
- Two primary language ecosystems increase tooling complexity.
- A dedicated search/vector platform will require a later migration if PostgreSQL is no longer sufficient.
- API contracts require discipline to prevent frontend/backend drift.

## Revisit When

Reassess search and vector infrastructure after the first retrieval evaluation dataset and after measured scale or relevance requirements exceed the PostgreSQL baseline.

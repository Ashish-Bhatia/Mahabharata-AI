# Mahabharata AI Architecture

## Status

Proposed for Sprint 0. See ADR-0001 for the initial technology direction.

## System Boundaries

```text
Web UI
  |
  v
Application API
  |---- Domain / knowledge services
  |---- Search and retrieval services
  |---- Grounded AI service
  |---- Source and provenance services
  |
  v
Data layer
  |---- Canonical knowledge store
  |---- Search index
  |---- Vector index
  |---- Source/content store
```

## Repository Shape

- `apps/web`: user-facing web application
- `apps/api`: application API
- `packages/domain`: shared domain contracts and schemas
- `packages/evaluation`: retrieval and AI evaluation datasets and runners
- `data`: development-only fixtures and schemas, never proprietary source dumps
- `docs`: architecture, ADRs, product and engineering documentation
- `.github`: workflows, issue templates, PR templates, and repository automation

## Technology Direction

- Web: Next.js + TypeScript
- API: Python + FastAPI
- Validation/contracts: OpenAPI generated from API schemas plus typed frontend contracts
- Data: PostgreSQL as the initial system of record
- Search: PostgreSQL full-text search initially, with a dedicated search engine introduced when scale or relevance testing requires it
- Semantic retrieval: pluggable vector store behind a retrieval interface
- AI: provider abstraction behind a grounded-answer service
- Testing: pytest for API/domain code, Vitest/Playwright for web code and end-to-end flows
- CI: GitHub Actions

## Design Rules

1. Domain concepts do not depend on UI frameworks.
2. AI responses must flow through retrieval and provenance-aware services for factual product experiences.
3. External AI providers are accessed through an adapter interface.
4. Source provenance is retained with content and exposed through application contracts.
5. Multilingual fields use explicit language metadata. Transliteration is a first-class representation.
6. Secrets and environment-specific configuration remain outside source control.
7. Every lasting architecture choice is recorded in `docs/adr/`.

## First Vertical Slice

The first end-to-end slice is searchable character profiles:

1. Load canonical character fixtures.
2. Persist character and source metadata.
3. Search by name across supported representations.
4. Retrieve a character profile and relationships.
5. Return provenance metadata.
6. Render the result in the web application.
7. Validate the flow with automated tests in CI.

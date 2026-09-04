# Mahabharata AI Project Plan

## 1. Vision

Mahabharata AI is a one-stop application for exploring, understanding, searching, and interacting with the Mahabharata through a governed AI product.

The product should support authoritative content, contextual exploration, conversational experiences, structured knowledge, and source-aware answers.

## 2. Delivery Model

Agile Scrum will be the default development methodology.

- Work is managed as GitHub Issues.
- Each Issue represents a deliverable, feature, defect, research task, or technical task.
- Work is developed on feature branches.
- Pull Requests are required for changes to the main branch.
- PRs must reference the relevant Issue.
- CI checks must pass before merge.
- Definition of Done applies to every completed Issue.
- The GitHub repository is the system of record for product scope, decisions, code, documentation, and delivery status.

## 3. Product Principles

1. Source-aware: factual answers should identify their underlying source material where practical.
2. Traceable: important product and architecture decisions belong in GitHub.
3. Testable: acceptance criteria must be explicit before implementation.
4. Incremental: deliver a usable vertical slice before expanding breadth.
5. Secure: secrets never enter source control. Configuration is environment-driven.
6. Maintainable: prefer modular architecture, automated tests, typed interfaces, and clear ownership boundaries.
7. Sanskrit-aware and multilingual: the data model should support Sanskrit, Hindi, English, transliteration, and future languages without redesign.

## 4. Product Scope

### Phase 0: Foundation

- Repository governance
- Architecture baseline
- Technology decision record
- CI/CD baseline
- Development standards
- Initial domain and content model

### Phase 1: Core Experience

- Application shell and navigation
- Mahabharata knowledge model
- Character profiles
- Events and relationships
- Search
- Source/content ingestion pipeline
- Basic AI question answering with source attribution

### Phase 2: Deep Knowledge

- Timeline and chronology views
- Family trees and relationship graph
- Places and geography
- Parvas, sections, and passages
- Cross-references
- Advanced retrieval and citation controls

### Phase 3: Conversational AI

- Context-aware Mahabharata assistant
- Conversation history
- Answer grounding and refusal behavior for unsupported claims
- Explain-answer/source experience
- Personalization without compromising source integrity

### Phase 4: One-Stop Platform

- Quizzes and learning journeys
- Story mode
- Character comparison
- Thematic exploration
- Multilingual experience
- Admin/content quality workflows
- Observability and production hardening

## 5. Architecture Workstreams

1. Product and UX
2. Frontend
3. Backend/API
4. Data and knowledge graph
5. Content ingestion and validation
6. Retrieval and AI
7. Search
8. Testing and quality engineering
9. DevOps and cloud infrastructure
10. Security, privacy, and governance

## 6. Agile Cadence

Use two-week sprints unless the team explicitly changes the cadence through a GitHub decision record.

Sprint flow:

1. Backlog refinement
2. Sprint planning
3. Development on feature branches
4. Continuous CI validation
5. PR review
6. Merge to main
7. Sprint review/demo
8. Retrospective
9. Backlog reprioritization

## 7. Definition of Ready

An Issue is ready for implementation when:

- The user or system outcome is clear.
- Acceptance criteria are testable.
- Dependencies are identified.
- Major technical uncertainty is resolved or captured as a separate spike.
- The scope fits within a sprint or has been decomposed.

## 8. Definition of Done

An Issue is done when:

- Acceptance criteria pass.
- Automated tests are added or updated where applicable.
- Documentation is updated where behavior or architecture changed.
- CI passes.
- Code review is complete.
- Security and data-handling considerations are addressed.
- The change is merged into main.

## 9. Branch and PR Policy

Branch naming:

- `feature/<issue-number>-<short-name>`
- `fix/<issue-number>-<short-name>`
- `chore/<issue-number>-<short-name>`
- `spike/<issue-number>-<short-name>`

Commit style:

- Use imperative, concise commit messages.
- Keep commits focused.

Pull Requests:

- Link the Issue.
- State the problem, solution, testing, and operational impact.
- Keep PRs small enough to review.
- Do not merge with failing required checks.

## 10. Initial Backlog

### Epic A: Foundation and Governance

- Repository governance and contribution workflow
- Architecture baseline and ADR process
- CI quality gates
- Environment/configuration strategy
- Observability baseline

### Epic B: Domain Knowledge

- Canonical entity model
- Character and relationship model
- Event and timeline model
- Source and passage model
- Place model
- Content provenance and validation

### Epic C: Search and Retrieval

- Content ingestion pipeline
- Full-text search
- Semantic retrieval
- Hybrid retrieval evaluation
- Citation and source attribution

### Epic D: Application Experience

- Application shell
- Search experience
- Character experience
- Timeline experience
- Relationship graph
- Passage/source reader

### Epic E: AI Assistant

- Grounded Q&A service
- Prompt and policy layer
- Conversation context
- Citation generation
- Evaluation dataset and quality metrics

### Epic F: Learning and Exploration

- Quiz engine
- Story mode
- Character comparison
- Thematic exploration

## 11. Quality Gates

Minimum gates for production-bound changes:

- Build succeeds.
- Unit tests pass.
- Integration tests pass where relevant.
- Static analysis passes.
- Dependency/security checks pass.
- AI evaluation checks pass for retrieval or prompt changes.
- No secrets or credentials are committed.

## 12. Success Metrics

Track these metrics as the product matures:

- Search success rate
- Retrieval precision and recall
- Grounded answer rate
- Citation correctness
- Unsupported-claim rate
- Automated test coverage for critical paths
- CI success rate
- Mean PR cycle time
- Production error rate
- User task completion rate

## 13. Immediate Sprint 0 Goal

Establish a production-grade engineering foundation and a thin vertical slice plan.

Sprint 0 deliverables:

1. Repository governance documentation
2. Architecture decision record template
3. Issue and PR workflow
4. CI baseline
5. Initial domain model
6. Initial application architecture
7. First vertical-slice acceptance criteria
8. Prioritized Product Backlog

## 14. Decision Governance

Architecture and product decisions with lasting impact must be recorded in `docs/adr/` using ADRs.

Changes to scope, architecture, data provenance, AI behavior, security posture, or delivery methodology must be represented in GitHub Issues and/or ADRs.

GitHub is the authoritative project record.

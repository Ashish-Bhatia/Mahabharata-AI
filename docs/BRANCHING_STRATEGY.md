# Branching Strategy

## Status

Final

## Model

Mahabharata AI uses trunk-based development with `main` as the single permanent branch.

We do not use a permanent `develop` branch.

## Branches

| Branch | Purpose | Lifetime | Target |
|---|---|---|---|
| `main` | Production-ready source of truth | Permanent | N/A |
| `feature/<issue>-<name>` | New functionality | Short-lived | `main` |
| `fix/<issue>-<name>` | Normal defect correction | Short-lived | `main` |
| `hotfix/<issue>-<name>` | Critical production correction | Very short-lived | `main` |
| `release/<version>` | Release stabilization when required | Short-lived | `main` |

## Naming

Use the GitHub issue number in every development branch.

Examples:

- `feature/9-character-search`
- `fix/42-search-filter`
- `hotfix/57-authentication-failure`
- `release/v0.2.0`

Use lowercase kebab-case for the descriptive portion.

## Pull Request Policy

- Direct pushes to `main` are prohibited once branch protection is enabled.
- All changes enter `main` through a Pull Request.
- The PR must reference the GitHub Issue it implements or fixes.
- Automated checks must pass before merge.
- Review approval is required before merge.
- Review conversations must be resolved before merge.
- Branches should be kept small and short-lived.
- Rebase or update a branch from `main` before merge when required to resolve divergence.
- Squash merge is the default merge method for feature and fix branches.
- Delete the source branch after merge.

## Review Levels

Normal changes require at least one approval.

The following require two approvals when multiple reviewers are available:

- Architecture changes
- Security-sensitive changes
- Data model changes
- Production infrastructure changes
- Changes affecting source provenance or citation integrity

## Releases

Releases are represented by annotated Git tags using Semantic Versioning:

- `v0.1.0` for the first usable release
- `v0.2.0` for backward-compatible feature additions
- `v1.0.0` for the first stable major release

A `release/*` branch is created only when release stabilization needs a controlled branch. It is not part of normal feature development.

## Emergency Fixes

Critical production defects use `hotfix/<issue>-<name>`.

The hotfix follows the normal PR process and is merged into `main`. A release tag is created after validation.

## Explicitly Not Used

- No permanent `develop` branch
- No permanent `staging` branch
- No long-lived feature branches
- No direct commits to protected `main`

## Rationale

The project follows Agile development and aims for small, incremental vertical slices. Keeping `main` as the integration branch reduces branch divergence, merge overhead, and delayed integration. Release branches remain an exception for explicit stabilization needs.

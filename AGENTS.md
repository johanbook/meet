# AGENTS.md

Guidance for working in this repository. Keep this file brief and up to date.

## Git workflow

### Commits

- **Conventional Commits**, enforced locally by commitlint via the husky
  `commit-msg` hook. Format: `type(scope): subject` — e.g.
  `feat(api): add endpoint`, `fix(web-ui): …`, `chore(deps): bump nginx …`.
- **Scope is required** and must be one of the directories in `./services/`
  (`api`, `auth-api`, `auth-ui`, `web-ui`, `homepage`, `mobile-app`),
  `console`, or `repo`. Omit scope only for changes that touch the whole
  repository, e.g. `chore(repo): remove watchtower`.
- TYPEs follow conventional-commits defaults: `feat`, `fix`, `chore`,
  `docs`, `ci`, `refactor`, etc.
- A `pre-commit` hook runs lint-staged: `eslint --fix` on JS/TS and
  `prettier --write` on all other files.

### Branching and merging

- `main` is the only long-lived branch. Work happens on short-lived feature
  branches (current convention: `type/…`, e.g. `fix/token-session-refresh`;
  older branches used plain kebab-case words like `database-refactor`).
- PRs are **squash-merged** into `main` — main history is linear, and the
  squashed subject carries the PR number, e.g. `chore(repo): remove
  watchtower (#2299)`. Do not create merge commits on `main`.

### CI and automation

- One GitHub Actions workflow per service (`.github/workflows/<service>.yaml`),
  triggered on push/PR touching that service's path. Pipeline: lint → test →
  build and push Docker image to `ghcr.io/johanbook/meet/…` on `main`.
- Dependabot runs weekly with grouped updates; its commits are conventionally
  formatted `chore(deps): …` / `chore(deps-dev): …`.

### Releases

- Semver tags (`v2.x.y`). Note: release-please was removed (#2218, July 2026);
  `CONTRIBUTING.md` still references it and is stale. Releases are manual now —
  no release automation exists in the repo.
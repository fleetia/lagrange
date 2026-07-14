# Lagrange Repository Rules

## Repository identity

- All human commits, pushes, pull requests, releases, and GitHub write operations for this repository must use `ansible-starlight-space`.
- Commit author and committer must both be `ansible-starlight-space <46233501+ansible-starlight-space@users.noreply.github.com>`.
- Never use a Stibee personal or company account for this repository.
- `github-actions[bot]` is allowed only for automated Changesets release work. It is not a valid identity for manual development commits.

## Required local Git configuration

Before committing, confirm the repository-local values:

```bash
git config --local user.name ansible-starlight-space
git config --local user.email 46233501+ansible-starlight-space@users.noreply.github.com
git config --local credential.https://github.com.username ansible-starlight-space
```

The `origin` HTTPS URL must include the repository identity:

```text
https://ansible-starlight-space@github.com/fleetia/lagrange.git
```

## Commit and remote-write gate

Before every commit, verify both identities with `git var GIT_AUTHOR_IDENT` and `git var GIT_COMMITTER_IDENT`.

Before every push, pull request, release, or other GitHub write:

1. Run `gh auth status --hostname github.com`.
2. If `ansible-starlight-space` is not the active account, switch with `gh auth switch --hostname github.com --user ansible-starlight-space`.
3. Perform the write only after `gh api user --jq .login` returns `ansible-starlight-space`.
4. If the active account was switched temporarily, restore the previous account after the repository operation.

Do not rewrite already-published history to repair an identity mismatch without explicit user approval. Stop before the remote write and report the mismatch instead.

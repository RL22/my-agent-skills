# CLAUDE.md

Self-authored Agent Skills, published at https://github.com/RL22/my-agent-skills. Each skill is a folder under `skills/` with a `SKILL.md`. The skills are meant to run in any agent (Claude Code, Codex, Cursor, OpenCode), so keep them agent-neutral.

## Layout

- `skills/<name>/` is the source of truth. Edit skills here.
- `.claude/skills` is a symlink to `../skills`, so Claude Code loads every skill when you work in this repo. Don't copy files into it.
- Optional subfolders in a skill: `references/` (docs loaded on demand), `scripts/` (executables), `assets/` (templates), `examples/`, `tests/`.

## Skill conventions

- Frontmatter needs `name` (must match the folder name) and `description` (what the skill does + trigger phrases). An optional `license:` overrides the repo's MIT license.
- Keep `SKILL.md` lean. Move long material into `references/` and link it from `SKILL.md`.
- Reference bundled files by paths relative to the skill folder, not `~/.agents/skills/...` or `~/.claude/skills/...`.
- No personal data, credentials, or real people in fixtures. Read user-specific paths from env vars (e.g. `SPRINTZ_CONTENT_DIR`, `SPRINTZ_JOB_SEARCH_DIR`).

## When adding, removing, or renaming a skill

1. Create or rename `skills/<name>/` and update the `name` in its frontmatter.
2. Update the skills table in `README.md`.
3. Run the skill's tests if it has any (e.g. `cd skills/img-gen && pytest`, `cd skills/content-ideas/scripts && pytest tests`).

## Commits

Don't commit generated output, `.venv/`, `__pycache__/`, `.env*`, or cost logs. These are already in `.gitignore`.

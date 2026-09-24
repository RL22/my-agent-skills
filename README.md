# My Agent Skills

Self-authored [Agent Skills](https://agentskills.io) that work across Claude Code, Codex, Cursor, OpenCode and similar agents. Each skill is a folder under `skills/` with a `SKILL.md`.

## Skills

| Skill | Description |
| --- | --- |
| [`absorb`](skills/absorb/SKILL.md) | Ingest external media (video, article, thread) to extract architectural patterns, audit a target asset, and orchestrate upgrades via map-gra... |
| [`content-ideas`](skills/content-ideas/SKILL.md) | Your For You page for content creators. Scrapes tracked competitors across social media platforms, scores what's performing, and turns it in... |
| [`content-outline`](skills/content-outline/SKILL.md) | Generate a waterfall-ready content script outline from a YouTube URL, article link, raw idea, or markdown file. Produces a structured outlin... |
| [`elg-engine`](skills/elg-engine/SKILL.md) | Generate authentic quintuple-perspective social posts (builder, gtm, talent, visionary, product) from git diffs, PRDs, and changelogs with a... |
| [`eval-engine`](skills/eval-engine/SKILL.md) | Design, benchmark, and run agent evaluations across 3 tiers: Easy Mode (binary verifiers), Hard Mode (isolated digital clone environments), ... |
| [`failure-ledger`](skills/failure-ledger/SKILL.md) | Extract root causes from the runtime failure ledger and transcripts, compile positive rules into AGENTS.md, and prevent recurring execution ... |
| [`growth-brand`](skills/growth-brand/SKILL.md) | Sprintz Brand & Positioning team — positioning refinement, offer packaging, pricing tests, competitor research, messaging consistency review... |
| [`growth-content`](skills/growth-content/SKILL.md) | Sprintz Content Engine team — content waterfall: outlines with recording cues, long-form scripts, derivative assets (shorts, posts, newslett... |
| [`growth-convert`](skills/growth-convert/SKILL.md) | Sprintz Conversion & Funnel team — site teardowns/CRO audits, page copy and section builds, conversion hypotheses, cold/warm outreach drafts... |
| [`growth-os`](skills/growth-os/SKILL.md) | Sprintz Growth OS orchestrator — routes marketing/growth work to operating teams (brand, content, convert), enforces the shared workflow con... |
| [`gws-gmail-cleanup`](skills/gws-gmail-cleanup/SKILL.md) | Audit and clean Gmail storage using Google Workspace CLI. Use when the user wants to install or verify gws, connect Gmail, audit inbox stora... |
| [`img-brandkit`](skills/img-brandkit/SKILL.md) | Premium brand-kit image generation and visual-world presentation prompter. Generates structured 3x3 and 2x3 identity boards, logo systems, a... |
| [`img-gen`](skills/img-gen/SKILL.md) | Image generation and editing. Triggers on requests to create, edit, or modify visual assets (img, photo, logo, banner, /img-gen). |
| [`job-search-operator`](skills/job-search-operator/SKILL.md) | Evaluate and score job descriptions; create tailored applications, resumes, and cover letters; draft LinkedIn or recruiter outreach; discove... |
| [`linkedin-scout`](skills/linkedin-scout/SKILL.md) | Automated LinkedIn discovery of people, job postings, companies, feed posts, and DM threads via passive CDP Voyager GraphQL sniffing, Select... |
| [`map-graph`](skills/map-graph/SKILL.md) | Architect complex tasks into directed agent graphs (DAGs) with model tier routing, state schemas, and guardrails. Trigger on /map-graph, "gr... |
| [`model-delegation`](skills/model-delegation/SKILL.md) | Execute runtime cross-CLI subprocess calls via delegate.sh across agy (Gemini), codex (GPT), and claude (Claude). Routes high-volume reads, ... |
| [`og-image`](skills/og-image/SKILL.md) | Design and generate Open Graph / social preview images (1200x630 cards) using a brand-agnostic atomic design system and @vercel/og (Satori/I... |
| [`programmatic-brand-assets`](skills/programmatic-brand-assets/SKILL.md) | Use when designing logos, favicons, PWA icons, app icons, brand marks, or brand asset packages from SVG, Canvas, p5.js, or deterministic geo... |
| [`skillvault`](skills/skillvault/SKILL.md) | Establish ~/.agents/skills as the single source of truth for reusable agent skills, evaluate candidate skills with SIFT, and retrofit old ag... |
| [`virtual-staging`](skills/virtual-staging/SKILL.md) | Virtual staging for real estate. Enforces multi-angle fidelity via strict masking (PWA) and exact-manifest prompts. Preserves original archi... |
| [`writing-for-humans`](skills/writing-for-humans/SKILL.md) | Draft, revise, or review clear, specific, ethical Sprintz writing for humans. Invoke when the user says "final draft", "write for human", or... |

## Install

Copy or symlink any skill folder into your agent's skills directory (for example `~/.agents/skills/` or `~/.claude/skills/`):

```bash
ln -s "$PWD/skills/absorb" ~/.agents/skills/absorb
```

## Configuration

The `growth-*` skills read brand and strategy documents from a private workspace. Set `SPRINTZ_HOME` to your own workspace root (they were written against `~/Sprintz`). `content-outline` and `linkedin-scout` also honor `SPRINTZ_CONTENT_DIR` and `SPRINTZ_JOB_SEARCH_DIR`. Point these at your own directories, or edit the paths in each `SKILL.md`.

## Licensing

Repository code is MIT (see `LICENSE`). A skill's own `license:` frontmatter takes precedence; `elg-engine` is Apache-2.0.

`linkedin-scout` automates a logged-in LinkedIn session. Review LinkedIn's terms and use it only on your own account and data. All fixtures in this repo are fictional.

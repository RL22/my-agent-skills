#!/usr/bin/env node
// One page at desktop, tablet and phone widths, side by side, at a single shared scale.
// Captures three snapshots on first run (or with --recapture), then compiles from them — so re-running is
// deterministic, exactly like `trace`.
//   node responsive.mjs <url|file.html> -o <dir>/<name> [--overrides o.json] [--recapture] [--scale 0.42]
// Writes <name>.{desktop,tablet,phone}.snap.json (+ .png screenshots) and <name>.json (the board spec).
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile, NOTE_GUTTER } from './trace.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const USAGE = 'usage: responsive.mjs <url|file.html> -o <dir>/<name> [--overrides o.json] [--recapture] [--scale 0.42]';
export const BREAKPOINTS = [
  { key: 'desktop', label: 'Desktop', args: ['--width', '1280', '--height', '800'] },
  { key: 'tablet', label: 'Tablet', args: ['--width', '768', '--height', '1024'] },
  { key: 'phone', label: 'Phone', args: ['--mobile'] },
];

// Overrides: top-level keys apply to every breakpoint; `breakpoints: { phone: {…} }` adds or replaces keys for one.
// Notes without `breakpoint` land on every frame; with it, only on that frame.
function overridesFor(ov, key) {
  const { breakpoints = {}, notes = [], ...base } = ov;
  const own = breakpoints[key] || {};
  const merge = (a, b) => (Array.isArray(a) || Array.isArray(b) ? [...(a || []), ...(b || [])] : a && b && typeof a === 'object' ? { ...a, ...b } : b ?? a);
  const out = { ...base };
  for (const [k, v] of Object.entries(own)) out[k] = merge(base[k], v);
  out.notes = [...notes.filter((n) => !n.breakpoint || n.breakpoint === key), ...(own.notes || [])];
  return out;
}

export function composeResponsive(snaps, ov = {}, scale = 0.42) {
  if (!(Number.isFinite(scale) && scale > 0)) throw new Error(`scale must be a positive number (got ${scale})`);
  const M = 44, gap = 60, top = M + (ov.title ? 60 : 0);
  const items = [];
  let x = M;
  snaps.forEach((snap, i) => {
    const bp = BREAKPOINTS[i];
    const o = overridesFor(ov, bp.key);
    const left = o.notes.some((n) => n.side === 'left') ? NOTE_GUTTER : 0;
    const right = o.notes.some((n) => (n.side ?? 'right') === 'right') ? NOTE_GUTTER : 0;
    x += left;
    items.push({ type: 'heading', id: `${bp.key}-label`, text: `${bp.label} · ${snap.viewport.width}px`, size: 18, x, y: top });
    const spec = compile(snap, { ...o, title: undefined }, { scale, origin: { x, y: top + 40 }, prefix: `${bp.key}-` });
    items.push(...spec.items);
    x += Math.round(snap.viewport.width * scale) + right + gap; // frame width is the device width
  });
  return {
    paper: ov.paper ?? 'grid',
    seed: ov.seed ?? 7,
    ...(ov.title ? { title: ov.title } : {}),
    source: { url: snaps[0].url, capturedAt: snaps.map((s) => s.capturedAt), traced: 'responsive.mjs v1' },
    items,
  };
}

function main() {
  const argv = process.argv.slice(2);
  const a = { scale: 0.42 };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '-o') a.out = argv[++i];
    else if (k === '--overrides') a.overrides = argv[++i];
    else if (k === '--recapture') a.recapture = true;
    else if (k === '--scale') { a.scale = Number(argv[++i]); if (!(Number.isFinite(a.scale) && a.scale > 0)) { console.error('--scale must be a positive number'); process.exit(1); } }
    else if (k === '-h' || k === '--help') { console.log(USAGE); process.exit(0); }
    else if (k.startsWith('-')) { console.error(`unknown option ${k}\n${USAGE}`); process.exit(1); }
    else rest.push(k);
  }
  if (rest.length !== 1 || !a.out) { console.error(USAGE); process.exit(1); }
  const base = resolve(a.out.replace(/\.json$/, ''));
  try {
    const snaps = BREAKPOINTS.map((bp) => {
      const file = `${base}.${bp.key}.snap.json`;
      if (a.recapture || !existsSync(file)) execFileSync('node', [join(HERE, 'snapshot.mjs'), rest[0], '-o', file, ...bp.args], { stdio: ['ignore', 'ignore', 'inherit'] });
      return JSON.parse(readFileSync(file, 'utf8'));
    });
    const ov = a.overrides ? JSON.parse(readFileSync(a.overrides, 'utf8')) : {};
    const spec = composeResponsive(snaps, ov, a.scale);
    writeFileSync(`${base}.json`, JSON.stringify(spec, null, 1) + '\n');
    console.log(JSON.stringify({ out: `${base}.json`, snapshots: BREAKPOINTS.map((b) => `${base}.${b.key}.snap.json`), items: spec.items.length }));
  } catch (e) {
    console.error(`responsive error: ${e.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();

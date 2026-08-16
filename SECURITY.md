# Security Policy & Dependency Baseline

Security and dependency rules for this bilingual Astro 5 + React 19 portfolio
website. Every task that installs packages or writes code MUST follow these rules.

## 1. Pin dependency versions

- Install packages with exact versions (`--save-exact`); `package.json` must not
  contain `^` or `~` version ranges.
- Commit `package-lock.json` for reproducible installs.
- Reference install commands (run inside the project root):

```bash
npm install --save-exact astro@5 react@19 react-dom@19 framer-motion lucide-react nanostores @nanostores/react
npm install --save-dev --save-exact @types/react @types/react-dom typescript
npm install --save-exact @fontsource/plus-jakarta-sans @fontsource/inter
```

## 2. Audit and inspect dependencies

- Run `npm audit` after any dependency change and before any release.
- If high/critical vulnerabilities are reported, do NOT proceed until they are
  resolved (update, replace, or document in this file why they are acceptable).
- Before adding a third-party dependency, inspect it for suspicious scripts,
  hidden prompt injection, and unexpected postinstall/build behavior (e.g. in
  its source, package tarball, or postinstall hook). `npm audit` only catches
  known CVEs — it is not a substitute for this review.

## 3. Review code for injection risks

For every component, check:

- No `eval()`, `new Function()`, or `dangerouslySetInnerHTML`
- No inline `<script>` that interpolates dynamic content
- Validate any value read from `localStorage` before using it in DOM attributes
- No fetch requests to untrusted third-party URLs
- No hidden iframes, tracking pixels, or obfuscated strings
- Prefer self-hosted fonts/CDN assets to avoid external tracking and CSP issues

## 4. Keep dependencies up to date

- Run `npm audit` and `npm update` monthly.

## 5. Accepted vulnerabilities (baseline, 2026-08-15)

`npm audit` run after the initial dependency install reports 4
vulnerabilities: 2 high, 2 low.

- **Astro <=7.0.9** (incl. pinned 5.18.2): XSS advisories (`define:vars`
  and unescaped spread props, view-transition animation properties,
  unescaped slot names) and a host-header SSRF in prerendered error pages.
- **esbuild** (transitive): arbitrary file read via the dev server on
  Windows only — not applicable on macOS.
- **sharp** (transitive): libvips CVEs (CVE-2026-33327/33328/35590/35591).

These are accepted in this context: this is a static site deployed to
GitHub Pages — no backend, no SSR, and no dev server exposed in production;
no end-user input is rendered through the affected Astro paths, and the
vulnerable code paths (Astro dev/build internals, esbuild, sharp) are not
reachable by end users of the static output. The only upstream fix is a
breaking upgrade to `astro@7` with Tailwind v4, which contradicts the
approved plan and requires reworking the Tailwind configuration and
utility classes.

Per Section 4, keep monitoring `npm audit` for Astro 7 / Tailwind v4
updates and upgrade when feasible.

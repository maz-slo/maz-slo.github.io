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

## 2. Audit dependencies for known vulnerabilities

- Run `npm audit` after any dependency change and before any release.
- If high/critical vulnerabilities are reported, do NOT proceed until they are
  resolved (update, replace, or document in this file why they are acceptable).

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

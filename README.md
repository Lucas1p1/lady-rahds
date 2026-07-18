# The Dual Lens — Personal Portfolio

A premium, minimal, futuristic portfolio built for a Medical Laboratory
Scientist and entrepreneur, combining a "science" identity (soft light blue)
with a "fashion/business" identity (soft pink), bridged by aurora gradients,
glassmorphism, and a recurring 3D motif that morphs from a molecule into a
silk ribbon.

## Stack
- Next.js 16 (App Router, Turbopack) + TypeScript + React 19
- Tailwind CSS v4 (CSS-first config — see `app/globals.css`'s `@theme` block, no `tailwind.config.ts`)
- Motion (the current package name for what was Framer Motion; imported as `motion/react`)
- React Three Fiber 9 + drei 10 (the `MorphScene` signature object)
- ESLint 9 with the flat config format (`eslint.config.mjs`)

All dependencies are pinned to their latest non-deprecated major versions as of this writing. A couple of notes if you upgrade further down the line:
- **ESLint 10**: `eslint-config-next@16.2.10`'s bundled `eslint-plugin-react` isn't compatible with ESLint 10 yet (a `context.getFilename` API break). This project pins ESLint to `9.39.4` until that catches up — bump once Next's config updates.
- **Tailwind v4**: there's no `tailwind.config.ts` anymore. All design tokens (colors, fonts, shadows) live in the `@theme` block at the top of `app/globals.css`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Personalize the site

Everything you'd want to change lives in **one file**:

```
lib/data.ts
```

Update your name, role, bio, skills, experience, projects, fashion gallery,
certifications, email, and social links there — every component reads from
this file, so you don't need to touch component code to update content.

### Fonts
`app/layout.tsx` loads Fraunces (display), Inter (body), and JetBrains Mono
via `next/font/google`. Swap these for other Google Fonts if you'd like a
different voice — just keep a serif/display + clean sans pairing to preserve
the premium feel.

### Colors
All design tokens (lab blue, silk pink, ink neutrals, shadows) are defined
in the `@theme { ... }` block at the top of `app/globals.css`. Adjust the
`--color-*` hex values there to retune the palette globally — Tailwind v4
picks them up automatically and generates matching utility classes
(e.g. `bg-lab-500`, `text-silk-600`). The aurora gradients themselves are
plain CSS in the `.aurora-bg` rule just below the theme block.

### The 3D motif
`components/three/MorphScene.tsx` renders the signature object — a blue
"molecule" that dissolves into a pink "silk ribbon" as a `progress` prop
moves from 0 → 1. It's reused at different progress values in the Hero,
Fashion Business, and Contact sections. Tune node count, distortion, and
colors directly in that file.

### Real imagery
Right now, Projects and Fashion gallery cards use gradient placeholders
instead of real photos (kept that way since no images were provided). To
add real photography:
1. Drop images into `public/images/`.
2. Replace the gradient `<div>` placeholders in `components/Projects.tsx`
   and `components/FashionBusiness.tsx` with `next/image` components.

## Accessibility & performance notes
- Respects `prefers-reduced-motion` (see `app/globals.css`).
- Custom cursor is disabled on touch devices automatically.
- All interactive elements have visible focus states.
- The R3F canvas is loaded client-only via `next/dynamic` with `ssr: false`
  to avoid hydration issues and keep the initial server response light.
- Consider lazy-loading `MorphScene` further with `IntersectionObserver` if
  you add more 3D instances later, to keep first paint fast.

## Deploying
This is a standard Next.js app — deploys cleanly to Vercel:

```bash
npm run build
```

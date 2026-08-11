# Tracxn Homepage — v8

Design iteration **v8**, forked from v7f. React + Vite, deployed on Vercel.
Dev server runs on **port 5207** (`homepage-v8` in the root `.claude/launch.json`).

## What changed in v8 (vs v7f)

v8 carries the v7f edits (hero illustration + light-blue removed from the heading
gradients) and reworks the layout of two sections.

### 1. Offerings — Apollo-style horizontal tabs
`src/components/Features.jsx` + `src/components/FeaturesTabs.css` (new).

"Identify, analyze, and track the world's private markets" moves from a vertical
left-rail + tall scroll column to a **horizontal tab bar over one stretched,
full-width content panel** — the pattern from Apollo's "Turn hours of prospecting
into minutes" section.

- Five offerings sit as horizontal tabs across the top.
- Below them, a single panel whose cards live on a horizontal track: switching a
  tab **slides the card sideways** (translateX).
- The active tab carries a **loading bar** that fills over the dwell window; its
  `animationend` is what auto-advances to the next tab (so the bar and the
  advance can never drift apart), looping through all five.
- Hover/focus pauses the cycle. `prefers-reduced-motion` disables the bar and the
  slide and falls back to a plain timer.
- Below 900px the tab bar becomes a horizontal scroller; below 860px each card
  stacks copy over media.

### 2. "Built for the entire Private Market Ecosystem" — offerings rail
`src/components/CustomerSegments.jsx` + `.css`.

Reverts to the older offerings layout: the eight audiences are a **vertical list
on the left (a sticky rail)**, and what Tracxn offers each audience sits in a
**small card on the right**. The page scrolls vertically through the cards and
the rail highlights whichever card is in view (`react-intersection-observer`,
the same scroll-rail mechanic Features used before v8). Each card carries a
one-line proposition plus three offering points and links to the audience's
solutions page. Below 820px the rail is hidden and the titled cards stand alone.

---

<details>
<summary>Inherited from v7f</summary>

Hero shows `public/herobanner.svg` (isometric illustration) instead of the
curation-video iframe, card-free on the hero gradient. The lightest blue
(`#66CCFF`) is removed from the three animated heading gradients so the moving
highlight peaks on deep navy. See v7f / v7e history for the rest.

</details>

## Develop

```bash
npm install
npm run dev   # port 5207
npm run build
```

### Section preview harness

`preview.html?s=features` / `?s=segments` render a single section at scroll 0.

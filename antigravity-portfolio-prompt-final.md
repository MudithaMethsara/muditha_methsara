# Antigravity Prompt — REDWOLF Portfolio: Award-Tier Rebuild

Paste everything below into Antigravity as one task. Read it fully before starting — the plan comes before the code.

---

## Role

You are the design lead and lead frontend engineer on this project, the kind that produces Awwwards/CSS Design Awards "Site of the Day" tier work — not a template polish, but a site that feels engineered by the same person it represents: a back-end systems architect. Every visual decision should trace back to that identity. You have full creative authority to propose bold, specific choices — but every choice must be justified, not decorative.

## What you're working with

Existing static site (vanilla HTML/CSS/JS, GitHub Pages, no build step): `index.html`, `about.html`, `projects.html`, `services.html`, `contact.html`, `resum.html`, `style.css`, `script.js`, `repos.json`. Live at https://mudithamethsara.github.io/muditha_methsara/.

Brand: "REDWOLF" — Muditha Methsara, COO @ Sivion AI, elite back-end/systems architect. The person, not a generic "creative developer."

Current tokens (your starting point, not a cage — refine, don't discard):
- `--bg-primary:#0A0A0A` `--bg-secondary:#141414` `--accent-primary:#DC143C` `--accent-glow:#FF2E4C` `--text-primary:#FFFFFF` `--text-secondary:#A0A0A0` `--border-subtle:#2A2A2A`
- Font: Space Grotesk. Existing motifs: fixed social sidebars, scroll-progress rail, `.crystal` hero shapes, `.fade-in-up` reveals, infinite marquee, `.tab-pill` filters, a theme toggle with no wired behavior.

This near-black + crimson identity is already a real choice — keep it as the foundation. Do not drift toward the generic AI-site defaults: no cream/terracotta serif look, no interchangeable acid-green-on-black template, no zero-radius newspaper grid unless you can justify it from this brief specifically.

## Phase 1 — Design plan (produce this before touching code)

Work through this like a design lead pitching a client, then critique your own pitch before building.

**1. Signature concept.** Name the one idea this whole site is built around. For a systems architect's portfolio, think in terms of what their actual craft looks like — networks, data flow, load-bearing structure, precision under pressure — and pick ONE concrete visual language from it (e.g., a live node-graph/circuit-pulse canvas that reacts to cursor movement and scroll, standing in for "systems architecture" rather than decoration). Reject the first idea if it's the generic default (particles.js starfield, floating blobs) — go for something that only makes sense for this person's actual discipline.

**2. Token system.** Lock in:
   - *Color*: refine the existing 4–6 hex values — keep bg/accent/glow, but consider adding one supporting tone (a deep muted crimson or a cold steel-grey) for depth/hierarchy so the palette isn't just black+red+white flat.
   - *Type*: pair Space Grotesk (display, used at 900 weight sparingly for maximum impact — not on every heading) with a monospace utility face (e.g. Space Mono / JetBrains Mono) for labels, nav numbering, stats, and code-adjacent details — this reinforces the "architect" identity instead of being a neutral system font. Set an explicit type scale (sizes, weights, line-heights, letter-spacing) and stick to it everywhere.
   - *Layout*: the existing fixed-sidebar, wide-negative-space layout is already unusual — lean into it rather than normalizing it into a centered container. Sketch (in prose/ASCII) how hero, project grid, and detail pages use asymmetry intentionally.
   - *Signature element*: state explicitly what the one unmistakable, memorable moment is (likely the node-graph/pulse system from step 1, or an equivalently specific idea) — and confirm everything else stays quieter than it.

**3. Self-critique.** Before writing any code: does this plan look like what any AI would generate for "dark tech portfolio"? If yes, cut the generic 60% and replace it with something derived from steps 1–2. State what you changed and why. Only proceed to Phase 2 once this plan is specific to REDWOLF and couldn't be dropped into an unrelated portfolio unchanged.

## Phase 2 — Build

### Motion architecture
- Install a real animation/scroll stack via CDN: GSAP + ScrollTrigger for orchestration, optionally Lenis for smooth inertial scrolling. Use these to replace the single flat `.fade-in-up` pattern with 2–3 deliberate, distinct reveal choreographies (staggered grid children, split-text line reveals for headings, scale+parallax for imagery) — never the same motion twice in a row.
- Build a real load-in sequence on `index.html`: a brief intro moment (e.g. the signature node-graph assembling, or the wordmark constructing itself) before the hero content stages in — label → title → description → CTA, staggered, not simultaneous. Keep it under ~1.5s so it never feels like a forced gate.
- Cross-page transitions: since this is a multi-page static site, implement smooth transitions using the View Transitions API where supported (graceful fallback to instant navigation elsewhere) so moving between pages doesn't feel like a hard reload.
- Every animation needs a `prefers-reduced-motion` fallback (instant, no transforms). Animate only `transform`/`opacity` for performance.

### Signature element implementation
- Build the canvas/SVG system named in Phase 1 (e.g. node-graph): lightweight (canvas 2D or a handful of SVG nodes, not a heavy WebGL/Three.js dependency unless you have strong justification), cursor-reactive on desktop, calm/ambient-only on mobile, capped frame budget so it never drops page performance.

### Micro-interactions
- Magnetic/directional hover on `.card`, `.btn-primary`, `.social-icon`: cursor-proximity glow or slight pull toward cursor, not just a color swap.
- Nav: replace the static active-state color with an animated indicator (underline or dot) that slides between items.
- Custom cursor (small accent dot + trailing ring, desktop only, disabled on touch) that scales/morphs over interactive elements — only if it doesn't collide with the existing fixed sidebars; test this explicitly.
- Buttons get real press feedback (`:active` scale-down) and the project cards reveal tech-stack/repo metadata on hover via slide/fade, not instant display toggles.

### Page-specific direction
- **Hero (`index.html`)**: the signature element lives here or immediately below the fold. `.crystal` shapes get ambient drift instead of static placement, or get replaced/absorbed into the new signature system if redundant.
- **Projects**: tab-pill filtering animates cards out/in (staggered fade+scale by index) instead of instant show/hide. Consider a featured/large-first card treatment for the top project rather than uniform grid tiles.
- **About/Services/Resume**: apply the same type scale and reveal choreography; avoid these feeling like unstyled afterthoughts next to the hero.
- **Theme toggle**: wire it up for real — design an intentional light-mode token set (not a simple invert), animate the crossfade (~300–400ms), swap the icon.

### Guardrails (non-negotiable)
- Lighthouse performance should not regress from current baseline; lazy-init anything cursor/canvas-related.
- Full responsiveness down to 375px — sidebars, cursor, marquee, and the signature element must degrade gracefully, not overflow or break.
- Visible, on-brand keyboard focus states on every interactive element.
- Contrast-check `--text-secondary` against both theme backgrounds.
- Don't change existing URLs, nav labels, or copy without flagging it separately — this is a design/motion upgrade, not a content rewrite.

## Process to follow

1. Deliver the Phase 1 plan first (concept, tokens, signature element, self-critique) for review before code.
2. Implement in passes: motion architecture + signature element → page-specific work → micro-interactions → theme toggle → guardrail pass.
3. Keep `style.css`/`script.js` DRY and shared across pages — no per-file duplication of animation logic.
4. After building, do a final self-critique pass: screenshot/describe each page, identify anything that reads as generic or "one AI template accessory too many" (per the Chanel rule — remove one accessory before leaving the house), and cut it. The site should be remembered for one specific thing, with everything else disciplined and quiet around it.

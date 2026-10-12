# AGENTS.md

Byte Buddies is a kids' digital-literacy learning game (TanStack Start + React 19 + Tailwind 4, deployed on Netlify). It is fully client-side gameplay: no API routes, no database.

## Structure

```
src/
  data/worlds.ts          # ALL learning content: worlds, lesson cards, activities (typed union)
  lib/progress.ts         # Player progress store (localStorage + useSyncExternalStore), stars/unlock rules
  lib/sfx.ts              # Web Audio sound effects, speech synthesis (speak), shuffle helper, mute
  lib/img.ts              # Builds Netlify Image CDN URLs for /public/img artwork
  components/Header.tsx   # Sticky header: logo, star count, player, sound toggle
  components/Bit.tsx      # Bit the robot guide with speech bubble + read-aloud
  components/Confetti.tsx, Stars.tsx
  components/games/       # One component per activity kind: Quiz, Sort, Match, Sequence, Binary
  routes/index.tsx        # Home: hero + name/avatar onboarding, world map, badge shelf, grown-ups info
  routes/world.$worldId.tsx  # World flow: intro → lesson cards → activities → reward screen
public/img/               # Generated PNG artwork (mascot + one per world). Always reference via img()
```

## Conventions & decisions

- Content is data-driven. To add a game type: add it to the `Activity` union in `worlds.ts`, create `components/games/<Kind>Game.tsx` taking `GameProps<A>` (`onMistake`, `onComplete`), and add a case in `ActivityView` in the world route.
- Mistakes are counted across a whole world; `starsFor()` maps them to 1–3 stars. Best score is kept.
- A world unlocks when the previous world has at least one star (`isUnlocked`).
- Shuffling uses `Math.random`, so it only happens inside games that mount after a click (never during SSR) to avoid hydration mismatches.
- The world route is keyed by `worldId` so navigating to the next world resets its state.
- Tailwind classes for world themes are literal strings in `worlds.ts` (`theme.*`) so Tailwind can detect them.
- Kid-friendly UI: large tap targets, `.btn-chunky` press effect, animations defined in `styles.css` and disabled under `prefers-reduced-motion`.
- Progress lives only in localStorage by design (no accounts/PII). If accounts are added later, replace `lib/progress.ts` with a server-backed store (Netlify Database) keeping the same hook API.

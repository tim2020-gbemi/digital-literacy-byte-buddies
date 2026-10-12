# Byte Buddies 🤖

**Byte Buddies** is a playful learning game that teaches kids (about ages 5–10) digital literacy: what a computer is, how it works inside, what people use computers for, how the internet works, and how to stay safe online.

Kids pick an explorer name and buddy, then follow **Bit the robot** through five worlds. Each world has short story cards (with a "read it to me" button for early readers) and several mini-games. Kids earn up to 3 stars per world and a badge for their badge shelf.

| World | What kids learn | Mini-games |
|---|---|---|
| 🖥️ Meet the Computer | What a computer is, parts, hardware vs software | Computer or Not? · Parts Party · Touch It or Not? |
| ⚙️ Inside the Machine | Input → Process → Storage → Output, CPU, memory, binary | Computer Steps · In or Out? · Light Up the Number |
| 🌍 Computers Everywhere | How computers help at school, work and play | Who Uses It? · Computer Helpers Quiz |
| 🛰️ Internet Galaxy | The internet, websites, browsers, data packets, checking facts | Send a Message · Galaxy Quiz |
| 🛡️ Safety Shield | Private info, strong passwords, asking a grown-up, kindness | Safe or Not Safe? · Password Power |

## Tech

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing) on Netlify
- Tailwind CSS 4, Fredoka + Nunito fonts, lucide-react icons
- Web Audio API for sound effects and the browser Speech Synthesis API for read-aloud
- Illustrations generated with Gemini via Netlify AI Gateway, served through the Netlify Image CDN
- Progress (name, avatar, stars) is stored in the browser's localStorage: no accounts, nothing collected

## Run locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

## Adding content

All lessons and games are data in `src/data/worlds.ts`. Add a lesson card or a new activity (`quiz`, `sort`, `match`, `sequence`, `binary`) to a world and it appears automatically.

## Ideas for later

- Parent/teacher accounts that sync progress across devices and show a class dashboard
- More worlds (coding basics, files & folders, typing practice) and difficulty levels by age
- Translations and printable certificates

# LinkedIn Tycoon

A free, browser-based pixel-art career-simulation RPG. Create a character, explore a small city, network with NPCs, take on job interviews, shop for gear, and climb a career ladder. It runs entirely in the browser with no account, backend, or downloads.

**[Play it here](https://sammytourani.github.io/Linkedin-Tycoon/)**

## What it is

LinkedIn Tycoon is a single-player game built with [Phaser 3](https://phaser.io/) and bundled with [Vite](https://vitejs.dev/). Everything runs client-side in the browser, and your progress is saved locally with `localStorage` — there is no server and no online multiplayer.

## Features

- **Character customization** — pick your character's appearance before starting.
- **Movement and exploration** — walk around a pixel-art city and enter different locations.
- **NPC interaction and networking** — talk to characters and build in-game connections.
- **Job interviews** — travel to LinkedIn HQ and answer interview questions.
- **Shopping** — spend in-game coins on items.
- **In-game phone** — open a phone UI for messages, the leaderboard, and stats.
- **Leaderboard** — a local, in-game ranking generated from your own stats (not a live online ranking).
- **Inventory** — track items you own.
- **Achievements** — unlock achievements as you progress.
- **Progression systems** — energy, coins, and XP.
- **Save / load** — progress persists in the browser via `localStorage`.
- **Audio** — background music and sound effects.

## Tech stack

- **Game engine:** Phaser 3
- **Build tool / dev server:** Vite
- **Language:** JavaScript (ES6+)
- **Markup / styling:** HTML5 + CSS3
- **Hosting:** GitHub Pages (via GitHub Actions)

## Run locally

Requires [Node.js](https://nodejs.org/) and npm.

```bash
# Clone the repository
git clone https://github.com/SammyTourani/Linkedin-Tycoon.git
cd Linkedin-Tycoon

# Install dependencies
npm install

# Start the dev server (opens automatically in your browser)
npm run dev
```

The dev server opens automatically and prints its local URL in the terminal (configured to run on port 3003).

### Build for production

```bash
npm run build
```

The optimized build is written to the `dist/` folder.

## Controls

| Key            | Action                       |
| -------------- | ---------------------------- |
| `W` `A` `S` `D` / Arrow keys | Move                |
| `E`            | Interact with NPCs / objects |
| `ESC`          | Close menus / dialogue       |

Menus such as the phone, leaderboard, inventory, and shop are also reachable through the on-screen UI in-game.

## Status

Single-player and client-side only. There is no backend or online ranking — the leaderboard and saved progress live entirely in your browser.

## License

MIT — see [LICENSE](LICENSE).

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines, and [DEPLOYMENT.md](DEPLOYMENT.md) for deployment notes.

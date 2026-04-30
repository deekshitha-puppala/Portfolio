# Puppala Deekshitha — Portfolio

A multi-page React portfolio with a **terminal-meets-editorial** aesthetic — deep charcoal background, electric cyan + warm amber accents, Space Mono for headings, DM Sans for body. Built with React Router and Framer Motion.

> Live identity: **Puppala Deekshitha** · B.Tech CSE-IoT (2026) · DevOps Intern @ Cognizant

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Pages](#pages)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Customising Content](#customising-content)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Tech Stack

| Layer       | Tooling                                  |
| ----------- | ---------------------------------------- |
| Framework   | React 18                                 |
| Routing     | React Router v6                          |
| Animations  | Framer Motion (page transitions, scroll reveals, hover, stagger) |
| Build tool  | Vite 5                                   |
| Styling     | Plain CSS (custom properties + Google Fonts) |
| Fonts       | Space Mono · DM Sans                     |

No icon libraries — emoji & unicode only.

---

## Pages

| Route            | Page              | Highlights                                                |
| ---------------- | ----------------- | --------------------------------------------------------- |
| `/`              | Home              | Animated name with blinking cursor, role cycler, floating particles, scroll indicator |
| `/about`         | About             | Two-column bio, animated stat counters (CGPA 9.04, etc.), language & sport pills |
| `/skills`        | Skills            | DevOps pills, programming skill bars (animated width), AI/ML & core CS chips |
| `/experience`    | Experience        | Vertical timeline with alternating left/right slide-in cards |
| `/projects`      | Projects          | SmartPix · DrumKit · ATM Simulation — glassmorphism cards |
| `/certificates`  | Certifications    | Glowing cyan-bordered grid                                |
| `/hackathons`    | Hackathons        | UX-Plosion · Felicity · IoT Conference                    |
| `/publications`  | Research & Papers | Animated empty state — "Research coming soon..."          |
| `/social`        | Social Footprints | LinkedIn · GitHub · HackerRank · CodeChef · Email + NSS card |
| `/resume`        | Résumé            | Full structured résumé in theme + Download (print) button |
| `/contact`       | Contact           | Split layout, working form with loading state, location card |

Page transitions use `AnimatePresence` with a slide + fade.

---

## Project Structure

```
Portfolio_Deek/
├── index.html              # Vite entry HTML, ⚡ favicon
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite + React plugin config
├── README.md               # You are here
└── src/
    ├── main.jsx            # React root + BrowserRouter
    ├── index.css           # Theme tokens, fonts, layout, animations, responsive
    └── App.jsx             # ALL components + routes (single file)
```

`App.jsx` contains: `Navbar`, `Footer`, `Home`, `About`, `Skills`, `Experience`, `Projects`, `Certificates`, `Hackathons`, `Publications`, `Social`, `Resume`, `Contact`, plus helpers (`RoleCycler`, `FloatingParticles`, `StatCard`, `SkillBar`, `TimelineCard`).

---

## Prerequisites

- **Node.js 18+** (LTS recommended) — bundles `npm`.
  Install from <https://nodejs.org/en/download> or via `winget install OpenJS.NodeJS.LTS`.
- A modern browser (Chrome, Edge, Firefox, Safari).

Verify install:

```bash
node -v
npm -v
```

---

## Getting Started

Clone or open the project, then from the project root:

```bash
# 1. Install dependencies (one-time, ~30s–2min)
npm install

# 2. Start the dev server
npm run dev
```

Vite will open your browser at **http://localhost:5173/** with hot reload.

Stop the server with **Ctrl + C**.

---

## Available Scripts

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR on port 5173          |
| `npm run build`   | Produce a production build in `dist/`                |
| `npm run preview` | Preview the production build locally                 |

---

## Customising Content

All content lives in **constants at the top of `src/App.jsx`** — edit these arrays to update the site:

| Constant              | Drives                            |
| --------------------- | --------------------------------- |
| `NAV_ITEMS`           | Top nav links                     |
| `PROGRAMMING_SKILLS`  | Animated skill bars (Skills page) |
| `DEVOPS_SKILLS`       | DevOps pill grid                  |
| `AI_SKILLS`           | AI/ML pill grid                   |
| `CONCEPT_SKILLS`      | Core CS pill grid                 |
| `PROJECTS`            | Project cards                     |
| `CERTIFICATIONS`      | Cert cards                        |
| `HACKATHONS`          | Hackathon cards                   |
| `SOCIALS`             | Social platform cards             |
| `ROLES`               | Cycling hero subtitle             |

The **résumé section** is hand-marked-up inside the `Resume` component (education table, internship bullets, skills summary). Update those JSX blocks directly.

### Theme tokens

The colour palette lives in `:root` of `src/index.css`:

```css
--bg: #0a0a0f;
--cyan: #00f5ff;
--amber: #ffb347;
--text: #ffffff;
```

Change a token, the whole site re-themes.

---

## Deployment

This builds to a static `dist/` — host it anywhere.

### Vercel

```bash
npm i -g vercel
vercel
```

Vercel auto-detects Vite. For client-side routing, add a `vercel.json`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

### Netlify

Push to GitHub, click **Add new site → Import existing project** on Netlify. Build command: `npm run build`, publish directory: `dist`. Add a `_redirects` file in `public/` containing:

```
/*    /index.html   200
```

### GitHub Pages

```bash
npm run build
# then publish dist/ via the gh-pages branch (or use the gh-pages npm package)
```

---

## Troubleshooting

| Symptom                                        | Fix                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| `npm is not recognized`                        | Close & reopen the terminal after installing Node.js                |
| Port 5173 already in use                       | Vite will auto-pick the next free port — check the terminal output  |
| Blank page after deploy, only `/` works        | Add SPA rewrite rule (see Deployment) — direct routes 404 otherwise |
| Fonts not loading                              | Check that `https://fonts.googleapis.com` isn't blocked on your network |
| `npm install` fails behind a corporate proxy   | `npm config set proxy http://user:pass@proxy:port` then retry       |

---

## License

Personal portfolio — content (bio, résumé, project descriptions) © Puppala Deekshitha.
Code structure free to use for your own portfolio.

---

**Built with care · `> one pipeline at a time_`**

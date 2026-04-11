# Robocars

**Algorithms to live by. Intelligence for autonomous fleets.**

Part of the [12 Cities](https://github.com/abduljaleel) venture ecosystem.

## What it does

Robocars is a fleet intelligence and supervision platform for operators of autonomous or semi-autonomous vehicles. The human-in-the-loop control plane for safe fleet operations.

### Core Features

- **Fleet Dashboard** — Vehicle status grid with real-time status indicators (active/idle/maintenance/offline) and mission tracking
- **Supervision Console** — Split-screen real-time view with fleet grid and selected vehicle telemetry, intervention buttons (Pause, Reroute, Return to Base)
- **Mission Management** — Create, monitor, and review missions with route assignment, duration tracking, and performance scoring
- **Behavior Analytics** — Intervention rate trends, performance distributions, incident classification, and vehicle comparison
- **Route Intelligence** — Route library with distance, duration, risk scoring, and usage statistics

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **UI:** Tailwind CSS v4 + shadcn/ui
- **Auth & Database:** Supabase (Auth, Postgres, RLS)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Add your Supabase URL and anon key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 12 Cities Role

**Domain:** robocars.co.nz | **Tier:** 3 (Frontier) | **Layer:** Intelligence

## License

Private — 12 Cities Venture System

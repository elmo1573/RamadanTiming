# Islah-e-Nafs — Ramadan Timings

A clean, elegant web app for accurate Suhoor and Iftar times during Ramadan. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Auto Location Detection** — Uses browser geolocation or manual city search
- **Today's Timings** — Large, clear display of Suhoor (Fajr) and Iftar (Maghrib)
- **Next 3 Days** — Quick preview of upcoming fasting times
- **Full 30-Day Calendar** — Printable Ramadan poster with all timings
- **Download as Image** — Export the full calendar as a PNG
- **Islamic Aesthetic** — Soft beige, teal & gold theme with geometric patterns
- **Mobile-First** — Responsive design that works on all devices

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- AlAdhan API (Hanafi School, Method 2)
- html2canvas (for image export)

## Project Structure

```
src/
├── app/           # Next.js pages and layout
├── components/    # UI components (LocationSetup, Dashboard, RamadanPoster, Spinner)
├── lib/           # API calls, location logic, TypeScript types
└── styles/        # Global styles
public/
└── islah-logo.png # Brand logo (add your own)
```

## Setup

```bash
npm install
npm run dev
```

Add your logo at `public/islah-logo.png` for the poster footer branding.

## Deployment

Ready for Vercel — just push and deploy. No environment variables needed.

## API

All prayer times from [AlAdhan API](https://aladhan.com/prayer-times-api) using:
- **Method 2** (ISNA)
- **School 1** (Hanafi)

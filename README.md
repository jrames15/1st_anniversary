# Happy 1st Anniversary ❤️

A premium, interactive anniversary website — an emotional journey built with love.

## Quick Start

```bash
cd anniversary-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customize Your Gift

### Photos (Memories)

Edit `src/data/memories.ts` — replace the `src` URLs with your own photos:

1. Add photos to `public/photos/` (e.g. `public/photos/us-1.jpg`)
2. Update each memory entry: `src: "/photos/us-1.jpg"`

### Love Letter

Edit `src/data/letter.ts` — change the letter text and signature to your own words.

### Songs (Flower Garden)

Edit `src/data/songs.ts` — update titles, Spotify links, and flower positions.

### Background Music

Edit the `playlist` array in `src/components/anniversary/MusicPlayer.tsx`:

1. Add MP3 files to `public/audio/`
2. Set `src: "/audio/your-song.mp3"`

Music only starts after user interaction (tap play or fill hearts).

## Deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) for free — connect your Git repo and deploy.

## Tech Stack

- Next.js 16 · React 19 · TypeScript
- Tailwind CSS 4
- Framer Motion · GSAP · Lenis
- Howler.js · React Photo View

Made with love for Bebii 💕

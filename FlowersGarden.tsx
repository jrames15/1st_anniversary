"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Pause, Play } from "lucide-react";
import { songFlowers, SongFlower } from "@/data/songs";
import { FlowerIcon } from "./FlowerIcon";
import { playSoftPop, resumeAudioContext } from "@/lib/sound";

export function FlowersGarden() {
  const [activeSong, setActiveSong] = useState<SongFlower | null>(null);
  const [bloomedIds, setBloomedIds] = useState<Set<string>>(new Set());

  const handleFlowerClick = async (song: SongFlower) => {
    await resumeAudioContext();
    playSoftPop();
    setBloomedIds((prev) => new Set(prev).add(song.id));
    setActiveSong(song);
  };

  return (
    <section id="flowers" className="section-anchor relative min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <p className="font-[family-name:var(--font-great-vibes)] text-3xl text-rose-gold">
          our garden
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold md:text-5xl">
          Flowers & Songs
        </h2>
        <p className="mt-3 font-[family-name:var(--font-cormorant)] text-lg text-foreground/70">
          Each bloom holds a melody that reminds me of you
        </p>
      </motion.div>

      <div className="relative mx-auto h-[60vh] min-h-[420px] max-w-5xl overflow-hidden rounded-3xl glass">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #87CEEB 0%, #EAF6FF 30%, #D8F2D0 60%, #5a8f4a 100%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#4a7c3f] to-transparent opacity-80" />

        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-60"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -15, -5, 0],
            }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: `${20 + i * 30}%`, top: `${15 + i * 5}%` }}
          >
            🦋
          </motion.div>
        ))}

        {songFlowers.map((song, index) => (
          <motion.button
            key={song.id}
            data-cursor-bloom
            className="interactive-flower absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${song.position.x}%`, top: `${song.position.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.15, y: -8 }}
            onClick={() => handleFlowerClick(song)}
            aria-label={`Bloom ${song.title} by ${song.artist}`}
          >
            <FlowerIcon
              type={song.flower}
              color={song.color}
              blooming={bloomedIds.has(song.id)}
              size={56}
            />
            <span className="mt-1 block whitespace-nowrap font-[family-name:var(--font-poppins)] text-[10px] text-white drop-shadow-md md:text-xs">
              {song.title}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeSong && (
          <MusicCard song={activeSong} onClose={() => setActiveSong(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function MusicCard({ song, onClose }: { song: SongFlower; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass relative w-full max-w-sm overflow-hidden rounded-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={song.cover}
            alt={`${song.title} cover`}
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>

        <h3 className="text-center font-[family-name:var(--font-playfair)] text-2xl font-semibold">
          {song.title}
        </h3>
        <p className="text-center font-[family-name:var(--font-poppins)] text-sm text-foreground/60">
          {song.artist}
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <motion.button
            data-cursor-bloom
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPlaying(!playing)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sakura to-rose-gold text-white shadow-lg"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
          </motion.button>

          {song.spotifyUrl && (
            <a
              href={song.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-bloom
              className="flex items-center gap-2 rounded-full bg-[#1DB954] px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              <ExternalLink size={16} />
              Spotify
            </a>
          )}
        </div>

        {playing && song.spotifyUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 overflow-hidden rounded-xl"
          >
            <iframe
              src={`https://open.spotify.com/embed/track/${song.spotifyUrl.split("/").pop()}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`${song.title} Spotify embed`}
              className="rounded-xl border-0"
            />
          </motion.div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-foreground/50 hover:text-foreground/80"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Music, Pause, Play } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  cover: string;
  spotifyUrl: string;
}

const playlist: Track[] = [
  {
    title: "love.",
    artist: "Wave to Earth",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0224f8c3ad20b7c6cfecb5832e",
    spotifyUrl: "https://open.spotify.com/track/5mtTAScDytxMMqZj14NmlN",
  },
];

interface MusicPlayerProps {
  enabled: boolean;
}

export function MusicPlayer({ enabled }: MusicPlayerProps) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const track = playlist[currentTrack];

  const handlePlayPause = () => {
    setExpanded(true);
    setShowEmbed((visible) => !visible);
  };

  if (!enabled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md md:left-auto md:right-6 md:mx-0"
    >
      <motion.div
        layout
        className="glass overflow-hidden rounded-2xl shadow-xl"
      >
        <div className="h-1 bg-gradient-to-r from-sakura via-rose-gold to-gold" />

        <div className="flex items-center gap-3 p-3 md:p-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl"
            aria-label="Toggle player details"
          >
            <Image src={track.cover} alt={track.title} fill className="object-cover" sizes="48px" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate font-[family-name:var(--font-playfair)] text-sm font-semibold">
              {track.title}
            </p>
            <p className="truncate font-[family-name:var(--font-poppins)] text-xs text-foreground/60">
              {track.artist}
            </p>
          </div>

          <motion.button
            data-cursor-bloom
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sakura to-rose-gold text-white"
            aria-label={showEmbed ? "Hide Spotify player" : "Show Spotify player"}
          >
            {showEmbed ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/20 px-4 pb-4"
            >
              <div className="flex items-center gap-2 py-3">
                <Music size={14} className="text-foreground/40" />
                <a
                  href={track.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-foreground/60 transition-colors hover:text-foreground"
                >
                  Open on Spotify
                  <ExternalLink size={12} />
                </a>
              </div>

              {showEmbed && (
                <iframe
                  className="h-[152px] w-full rounded-xl"
                  src={`https://open.spotify.com/embed/track/${track.spotifyUrl.split("/").pop()}?utm_source=generator&theme=0`}
                  title={`${track.title} Spotify embed`}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              )}

              <div className="mt-3 flex gap-2">
                {playlist.map((t, i) => (
                  <button
                    key={t.title}
                    onClick={() => {
                      setCurrentTrack(i);
                      setShowEmbed(true);
                    }}
                    className={`rounded-lg px-2 py-1 text-xs transition-colors ${
                      i === currentTrack
                        ? "bg-sakura/40 text-foreground"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

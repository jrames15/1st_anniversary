"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSoftPop, playUnlockChime, resumeAudioContext } from "@/lib/sound";
import { HeartBurst } from "./HeartBurst";

interface WelcomeScreenProps {
  onUnlock: () => void;
}

export function WelcomeScreen({ onUnlock }: WelcomeScreenProps) {
  const [filledHearts, setFilledHearts] = useState<boolean[]>([false, false, false]);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [unlocking, setUnlocking] = useState(false);
  const burstIdRef = useRef(0);

  const allFilled = filledHearts.every(Boolean);

  const handleHeartClick = useCallback(
    async (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
      if (filledHearts[index] || unlocking) return;

      // Capture the current target synchronously because React may pool the
      // synthetic event and clear it after an `await` — accessing
      // `e.currentTarget` after an `await` can be null.
      const target = e.currentTarget as HTMLButtonElement | null;
      const rect = target ? target.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      await resumeAudioContext();
      playSoftPop();

      setBursts((prev) => [...prev, { id: burstIdRef.current++, x, y }]);

      const next = [...filledHearts];
      next[index] = true;
      setFilledHearts(next);

      if (next.every(Boolean)) {
        setTimeout(async () => {
          await resumeAudioContext();
          playUnlockChime();
          setUnlocking(true);
          setTimeout(onUnlock, 1800);
        }, 400);
      }
    },
    [filledHearts, unlocking, onUnlock]
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: unlocking ? 0 : 1, scale: unlocking ? 1.1 : 1, filter: unlocking ? "blur(8px)" : "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-screen items-center justify-center px-4 py-20"
    >
      {bursts.map((b) => (
        <HeartBurst key={b.id} x={b.x} y={b.y} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative max-w-lg rounded-3xl px-8 py-12 text-center md:px-14 md:py-16"
        style={{ animation: allFilled ? "pulse-glow 2s ease-in-out infinite" : undefined }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4 font-[family-name:var(--font-great-vibes)] text-3xl text-rose-gold md:text-4xl"
        >
          Hello my Bebii ❤️
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-shimmer md:text-6xl"
        >
          Happy 1st Anniversary
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 font-[family-name:var(--font-cormorant)] text-lg text-foreground/70 md:text-xl"
        >
          I made something special just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-4 md:gap-6"
        >
          {filledHearts.map((filled, i) => (
            <motion.button
              key={i}
              data-cursor-bloom
              onClick={(e) => handleHeartClick(i, e)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="group relative text-4xl transition-transform md:text-5xl"
              aria-label={filled ? "Heart filled" : `Fill heart ${i + 1}`}
            >
              <AnimatePresence mode="wait">
                {filled ? (
                  <motion.span
                    key="filled"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    ❤️
                  </motion.span>
                ) : (
                  <motion.span
                    key="empty"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    className="opacity-70 group-hover:opacity-100"
                  >
                    🤍
                  </motion.span>
                )}
              </AnimatePresence>

              {filled && (
                <motion.span
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 rounded-full bg-sakura/30 blur-md"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: allFilled ? 1 : 0.5 }}
          transition={{ delay: 1.3 }}
          className="mt-8 text-sm text-foreground/50"
        >
          {allFilled ? "✨ Unlocking your surprise..." : "Tap each heart to open your gift"}
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {unlocking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  opacity: 0,
                  scale: 1 + Math.random(),
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1.5, delay: i * 0.03 }}
                className="absolute text-2xl"
              >
                {["🌸", "💕", "✨", "💖"][i % 4]}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

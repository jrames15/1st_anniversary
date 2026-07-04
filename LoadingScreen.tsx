"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const completedRef = useRef(false);

  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: `${10 + i * 8}%`,
        rotateFrom: Math.random() * 360,
        rotateTo: Math.random() * 360 + 180,
        duration: 3 + Math.random() * 2,
        delay: i * 0.3,
      })),
    []
  );

  const completeLoading = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setFadeOut(true);
    window.setTimeout(onComplete, 800);
  }, [onComplete]);

  useEffect(() => {
    const duration = 2800;
    const start = Date.now();
    let frameId = 0;
    const fallbackId = window.setTimeout(completeLoading, duration + 1500);

    const tick = () => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);

      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick);
      } else {
        completeLoading();
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(fallbackId);
    };
  }, [completeLoading]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-sky/40 via-blush/60 to-cream"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center"
          >
            <p
              className="mb-2 font-[family-name:var(--font-great-vibes)] text-3xl text-rose-gold md:text-5xl"
            >
              a love story
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-shimmer md:text-6xl">
              Our Story
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/40 md:w-64">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sakura via-rose-gold to-gold"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-[family-name:var(--font-poppins)] text-sm tracking-widest text-foreground/60">
              {progress}%
            </p>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {petals.map((petal) => (
              <motion.span
                key={petal.id}
                className="absolute text-lg opacity-40"
                initial={{
                  x: petal.x,
                  y: "110%",
                  rotate: petal.rotateFrom,
                }}
                animate={{
                  y: "-10%",
                  rotate: petal.rotateTo,
                }}
                transition={{
                  duration: petal.duration,
                  repeat: Infinity,
                  delay: petal.delay,
                  ease: "linear",
                }}
              >
                🌸
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

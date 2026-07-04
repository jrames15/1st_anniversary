"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DreamyBackground } from "./DreamyBackground";
import { CustomCursor } from "./CustomCursor";
import { LoadingScreen } from "./LoadingScreen";
import { WelcomeScreen } from "./WelcomeScreen";
import { MainNavigation, SectionId } from "./MainNavigation";
import { FlowersGarden } from "./FlowersGarden";
import { MemoriesScrapbook } from "./MemoriesScrapbook";
import { LoveLetter } from "./LoveLetter";
import { MusicPlayer } from "./MusicPlayer";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

type AppPhase = "loading" | "welcome" | "main";

export function AnniversaryExperience() {
  const [phase, setPhase] = useState<AppPhase>("loading");
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const handleLoadingComplete = useCallback(() => setPhase("welcome"), []);
  const handleUnlock = useCallback(() => setPhase("main"), []);

  const handleNavigate = useCallback((section: SectionId) => {
    setActiveSection(section);
    setTimeout(() => {
      const el = document.getElementById(section);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  return (
    <SmoothScrollProvider enabled={phase === "main"}>
      <DreamyBackground nightMode={activeSection === "letter"} />
      <CustomCursor />

      {phase === "loading" && <LoadingScreen onComplete={handleLoadingComplete} />}

      <AnimatePresence mode="wait">
        {phase === "welcome" && (
          <motion.div key="welcome">
            <WelcomeScreen onUnlock={handleUnlock} />
          </motion.div>
        )}

        {phase === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="px-4 py-16 text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-[family-name:var(--font-great-vibes)] text-3xl text-rose-gold md:text-4xl"
              >
                welcome to our world
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-shimmer md:text-5xl"
              >
                Happy 1st Anniversary, Bebii
              </motion.h1>
            </header>

            <MainNavigation onNavigate={handleNavigate} />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <FlowersGarden />
              <MemoriesScrapbook />
              <LoveLetter />
            </motion.div>

            <footer className="px-4 py-20 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mx-auto max-w-md"
              >
                <p className="font-[family-name:var(--font-great-vibes)] text-4xl text-rose-gold">
                  I love you endlessly
                </p>
                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-foreground/60">
                  Made with all my heart — James ❤️
                </p>
                <div className="mt-6 flex justify-center gap-2 text-2xl">
                  {["🌸", "💕", "✨", "💖", "🌸"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <MusicPlayer enabled={phase !== "loading"} />
    </SmoothScrollProvider>
  );
}

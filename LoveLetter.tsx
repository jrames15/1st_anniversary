"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { letterLines, letterSignature } from "@/data/letter";

gsap.registerPlugin(useGSAP);

export function LoveLetter() {
  const [phase, setPhase] = useState<"envelope" | "opening" | "letter">("envelope");
  const [visibleLines, setVisibleLines] = useState(0);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (phase !== "opening") return;

      const tl = gsap.timeline({
        onComplete: () => {
          setPhase("letter");
        },
      });

      if (flapRef.current) {
        tl.to(flapRef.current, {
          rotateX: 180,
          duration: 1.2,
          ease: "power2.inOut",
        });
      }

      if (paperRef.current) {
        tl.fromTo(
          paperRef.current,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: -60, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          "-=0.4"
        );
      }
    },
    { scope: envelopeRef, dependencies: [phase] }
  );

  useEffect(() => {
    if (phase !== "letter") return;

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= letterLines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [phase]);

  const handleOpen = () => {
    if (phase !== "envelope") return;
    setPhase("opening");
  };

  return (
    <section id="letter" className="section-anchor relative min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <p className="font-[family-name:var(--font-great-vibes)] text-3xl text-rose-gold">
          from my heart
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold md:text-5xl">
          Love Letter
        </h2>
      </motion.div>

      <div className="mx-auto flex max-w-2xl items-center justify-center">
        <AnimatePresence mode="wait">
          {(phase === "envelope" || phase === "opening") && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              <div ref={envelopeRef} className="relative mx-auto h-52 w-80 md:h-60 md:w-96">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blush to-sakura shadow-xl" />

                <div
                  ref={paperRef}
                  className="paper-texture absolute left-4 right-4 top-8 z-10 h-40 rounded-sm opacity-0 shadow-md md:h-48"
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="font-[family-name:var(--font-great-vibes)] text-2xl text-rose-gold">
                      A letter for you...
                    </span>
                  </div>
                </div>

                <div
                  ref={flapRef}
                  className="absolute left-0 right-0 top-0 z-20 origin-top"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="h-28 w-full"
                    style={{
                      background: "linear-gradient(135deg, #FFC1D6 50%, #FFD6E7 50%)",
                      clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                    }}
                  />
                  <div className="absolute left-1/2 top-8 -translate-x-1/2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-gold shadow-lg">
                      <span className="font-[family-name:var(--font-playfair)] text-xs font-bold text-white">
                        J♥B
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-3/5 rounded-b-lg bg-gradient-to-t from-sakura/80 to-blush/60" />
              </div>

              {phase === "envelope" && (
                <motion.button
                  data-cursor-bloom
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleOpen}
                  className="mx-auto mt-8 block rounded-full bg-gradient-to-r from-rose-gold to-gold px-8 py-3 font-[family-name:var(--font-poppins)] text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
                >
                  Open the envelope ✉️
                </motion.button>
              )}
            </motion.div>
          )}

          {phase === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="paper-texture relative w-full max-w-xl rounded-lg p-8 shadow-2xl md:p-12"
            >
              <div className="absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-gold/40" />
              <div className="absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-gold/40" />
              <div className="absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-gold/40" />
              <div className="absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-gold/40" />

              <span className="absolute -right-4 top-8 text-3xl opacity-60">🌹</span>
              <span className="absolute -left-3 bottom-12 text-2xl opacity-50">🦋</span>
              <span className="absolute right-8 bottom-4 text-xl opacity-40">🌸</span>

              <div className="space-y-3">
                {letterLines.slice(0, visibleLines).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-foreground/85 md:text-xl ${
                      line === "" ? "h-4" : ""
                    } ${i === 0 ? "font-[family-name:var(--font-great-vibes)] text-2xl text-rose-gold" : ""}`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {visibleLines >= letterLines.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 text-right"
                >
                  <p className="font-[family-name:var(--font-great-vibes)] text-2xl text-rose-gold">
                    {letterSignature.closing}
                  </p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="mt-2 font-[family-name:var(--font-allura)] text-3xl text-foreground"
                  >
                    {letterSignature.name}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

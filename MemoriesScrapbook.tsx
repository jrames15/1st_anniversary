"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { memories } from "@/data/memories";

export function MemoriesScrapbook() {
  return (
    <section id="memories" className="section-anchor relative min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto mb-12 max-w-3xl text-center"
      >
        <p className="font-[family-name:var(--font-great-vibes)] text-3xl text-rose-gold">
          captured moments
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold md:text-5xl">
          Our Memories
        </h2>
        <p className="mt-3 font-[family-name:var(--font-cormorant)] text-lg text-foreground/70">
          A scrapbook of every beautiful moment we&apos;ve shared
        </p>
      </motion.div>

      <PhotoProvider
        maskOpacity={0.85}
        bannerVisible={false}
        speed={() => 300}
        easing={(type) =>
          type === 2
            ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
            : "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30, rotate: memory.rotation }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -12, rotate: 0, scale: 1.02 }}
              className="group relative"
              style={{ rotate: `${memory.rotation}deg` }}
            >
              {memory.tape && (
                <div
                  className={`tape absolute z-10 h-6 w-16 opacity-80 ${
                    memory.tape === "top"
                      ? "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rotate-[-2deg]"
                      : memory.tape === "left"
                        ? "left-2 top-4 rotate-[-45deg]"
                        : "right-2 top-4 rotate-[45deg]"
                  }`}
                />
              )}

              {memory.doodle && (
                <span className="absolute -right-2 -top-4 z-10 text-2xl opacity-0 transition-opacity group-hover:opacity-100">
                  {memory.doodle}
                </span>
              )}

              <PhotoView src={memory.src}>
                <button
                  data-cursor-bloom
                  className="polaroid relative w-full cursor-pointer text-left transition-shadow duration-300 group-hover:shadow-[0_20px_40px_rgba(61,44,62,0.2)]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={memory.src}
                      alt={memory.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 font-[family-name:var(--font-great-vibes)] text-xl text-rose-gold">
                    {memory.caption}
                  </p>
                  <p className="font-[family-name:var(--font-poppins)] text-xs tracking-wide text-foreground/50">
                    {memory.date}
                  </p>

                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs backdrop-blur-sm">
                      Tap to view ✨
                    </span>
                  </span>
                </button>
              </PhotoView>

              <div className="pointer-events-none absolute -bottom-2 -left-2 text-lg opacity-20">
                🌸
              </div>
            </motion.div>
          ))}
        </div>
      </PhotoProvider>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mt-16 max-w-md text-center"
      >
        <div className="paper-texture rounded-lg p-6 shadow-md">
          <p className="font-[family-name:var(--font-allura)] text-2xl text-rose-gold">
            &ldquo;Every picture is a love letter written in light&rdquo;
          </p>
        </div>
      </motion.div>
    </section>
  );
}

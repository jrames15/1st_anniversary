"use client";

import { motion } from "framer-motion";

export function HeartBurst({ x, y }: { x: number; y: number }) {
  const particles = Array.from({ length: 8 });

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 40 + Math.random() * 30;

        return (
          <motion.span
            key={i}
            initial={{ x, y, opacity: 1, scale: 0.5 }}
            animate={{
              x: x + Math.cos(angle) * distance,
              y: y + Math.sin(angle) * distance,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute text-sm"
          >
            {i % 2 === 0 ? "💗" : "🌸"}
          </motion.span>
        );
      })}
    </div>
  );
}

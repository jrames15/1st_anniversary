"use client";

import { motion } from "framer-motion";

export type SectionId = "flowers" | "memories" | "letter";

interface MainNavigationProps {
  onNavigate: (section: SectionId) => void;
}

const cards = [
  {
    id: "flowers" as const,
    emoji: "🌸",
    title: "Flowers",
    subtitle: "A garden of our songs",
    gradient: "from-sakura/40 to-blush/60",
  },
  {
    id: "memories" as const,
    emoji: "📸",
    title: "Our Memories",
    subtitle: "Moments we treasure",
    gradient: "from-lavender/40 to-sky/60",
  },
  {
    id: "letter" as const,
    emoji: "💌",
    title: "Love Letter",
    subtitle: "Words from my heart",
    gradient: "from-sage/40 to-cream/80",
  },
];

export function MainNavigation({ onNavigate }: MainNavigationProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-12 sm:grid-cols-3"
    >
      {cards.map((card, index) => (
        <motion.button
          key={card.id}
          data-cursor-bloom
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.15, duration: 0.8 }}
          whileHover={{ y: -12, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate(card.id)}
          className={`group glass relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6 text-left transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(183,110,121,0.25)] md:p-8`}
          style={{ animation: `float ${6 + index}s ease-in-out infinite` }}
        >
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/20 blur-2xl transition-all duration-500 group-hover:scale-150" />

          <span className="mb-4 block text-4xl">{card.emoji}</span>
          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-foreground md:text-2xl">
            {card.title}
          </h3>
          <p className="mt-1 font-[family-name:var(--font-poppins)] text-sm text-foreground/60">
            {card.subtitle}
          </p>

          <motion.div
            className="mt-4 h-0.5 w-0 bg-gradient-to-r from-rose-gold to-gold transition-all duration-500 group-hover:w-full"
          />
        </motion.button>
      ))}
    </motion.nav>
  );
}

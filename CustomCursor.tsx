"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailItem {
  id: number;
  x: number;
  y: number;
  type: "heart" | "petal";
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const idRef = useRef(0);
  const lastTrailRef = useRef(0);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const now = Date.now();
      if (now - lastTrailRef.current > 80) {
        lastTrailRef.current = now;
        const type = Math.random() > 0.7 ? "petal" : "heart";
        const item: TrailItem = {
          id: idRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          type,
        };
        setTrail((prev) => [...prev.slice(-12), item]);
      }
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("button, a, [data-cursor-bloom], .interactive-flower")
      );
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [trail, isTouchDevice]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {trail.map((item) => (
          <motion.span
            key={item.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none fixed z-[9998] text-sm"
            style={{ left: item.x, top: item.y }}
          >
            {item.type === "heart" ? "💗" : "🌸"}
          </motion.span>
        ))}
      </AnimatePresence>

      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: hovering ? 2 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div
          className={`h-4 w-4 rounded-full border-2 border-white transition-shadow duration-300 ${
            hovering ? "shadow-[0_0_20px_rgba(255,193,214,0.8)]" : ""
          }`}
        />
        {hovering && (
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-sakura/50"
          />
        )}
      </motion.div>
    </>
  );
}

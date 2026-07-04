"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: "petal" | "sparkle" | "heart" | "firefly";
  wobble: number;
}

const COLORS = ["#FFC1D6", "#FFD6E7", "#DCCCF6", "#EAF6FF", "#FFF8F2", "#D8F2D0"];

function createParticle(width: number, height: number, type?: Particle["type"]): Particle {
  const types: Particle["type"][] = ["petal", "petal", "petal", "sparkle", "heart"];
  const particleType = type ?? types[Math.floor(Math.random() * types.length)];

  return {
    x: Math.random() * width,
    y: Math.random() * height - height * 0.2,
    size: particleType === "sparkle" ? 2 + Math.random() * 3 : 8 + Math.random() * 10,
    speedX: (Math.random() - 0.5) * 0.8,
    speedY: 0.3 + Math.random() * 1.2,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.03,
    opacity: 0.3 + Math.random() * 0.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    type: particleType,
    wobble: Math.random() * Math.PI * 2,
  };
}

function drawPetal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  color: string,
  opacity: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = opacity;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(size * 0.5, -size * 0.3, size, -size * 0.1, size * 0.3, size * 0.5);
  ctx.bezierCurveTo(0, size * 0.8, -size * 0.3, size * 0.5, 0, 0);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  opacity: number
) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  opacity: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  const s = size * 0.4;
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.5, s * 0.3, 0, s * 1.2);
  ctx.bezierCurveTo(s * 1.5, s * 0.3, s, -s * 0.5, 0, s * 0.3);
  ctx.fill();
  ctx.restore();
}

function drawFirefly(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  opacity: number,
  time: number
) {
  const glow = 0.3 + Math.sin(time * 0.003 + x) * 0.3;
  ctx.save();
  ctx.globalAlpha = opacity * glow;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
  gradient.addColorStop(0, "rgba(255, 215, 100, 0.9)");
  gradient.addColorStop(0.5, "rgba(255, 193, 100, 0.3)");
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, size * 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function DreamyBackground({ nightMode = false }: { nightMode?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        Math.floor((window.innerWidth * window.innerHeight) / 12000),
        80
      );
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(window.innerWidth, window.innerHeight)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const animate = () => {
      if (reducedMotion) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      time += 16;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p, i) => {
        p.wobble += 0.02;
        p.x += p.speedX + Math.sin(p.wobble) * 0.3;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > h + 20 || p.x < -20 || p.x > w + 20) {
          particlesRef.current[i] = createParticle(w, h);
          particlesRef.current[i].y = -20;
        }

        switch (p.type) {
          case "petal":
            drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
            break;
          case "sparkle":
            drawSparkle(ctx, p.x, p.y, p.size * 0.5, p.color, p.opacity);
            break;
          case "heart":
            drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity * 0.6);
            break;
          case "firefly":
            drawFirefly(ctx, p.x, p.y, p.size * 0.5, p.opacity, time);
            break;
        }
      });

      if (nightMode) {
        particlesRef.current
          .filter((p) => p.type !== "firefly")
          .slice(0, 5)
          .forEach((p) => {
            drawFirefly(ctx, p.x, p.y, 2, 0.8, time);
          });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [nightMode]);

  return (
    <>
      <div
        className="dreamy-sky pointer-events-none fixed inset-0 -z-20 transition-all duration-[3000ms]"
        style={{
          background: nightMode
            ? "linear-gradient(180deg, #1a1025 0%, #2d1f3d 40%, #3d2c4e 100%)"
            : "linear-gradient(180deg, #EAF6FF 0%, #FFD6E7 35%, #FFF8F2 70%, #D8F2D0 100%)",
        }}
      />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-20 top-[10%] h-32 w-64 rounded-full bg-white/30 blur-3xl"
          style={{ animation: "float 12s ease-in-out infinite" }}
        />
        <div
          className="absolute -right-10 top-[30%] h-40 w-72 rounded-full bg-lavender/30 blur-3xl"
          style={{ animation: "float 15s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute bottom-[20%] left-[30%] h-36 w-80 rounded-full bg-sakura/25 blur-3xl"
          style={{ animation: "float 18s ease-in-out infinite 4s" }}
        />

        <div
          className="absolute left-[5%] top-[15%] opacity-20"
          style={{ animation: "float 8s ease-in-out infinite" }}
        >
          <CloudSVG />
        </div>
        <div
          className="absolute right-[10%] top-[8%] scale-75 opacity-15"
          style={{ animation: "float 10s ease-in-out infinite 3s" }}
        >
          <CloudSVG />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,0.5) 100px, rgba(255,255,255,0.5) 101px)",
          }}
        />
      </div>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-[5]"
        aria-hidden="true"
      />
    </>
  );
}

function CloudSVG() {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60" fill="white">
      <ellipse cx="40" cy="35" rx="35" ry="20" />
      <ellipse cx="70" cy="30" rx="30" ry="22" />
      <ellipse cx="95" cy="38" rx="22" ry="15" />
    </svg>
  );
}

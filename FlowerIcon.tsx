"use client";

import { FlowerType } from "@/data/songs";

interface FlowerIconProps {
  type: FlowerType;
  color: string;
  blooming?: boolean;
  size?: number;
}

export function FlowerIcon({ type, color, blooming = false, size = 64 }: FlowerIconProps) {
  const bloomScale = blooming ? 1.15 : 1;

  switch (type) {
    case "rose":
      return <RoseFlower color={color} size={size} scale={bloomScale} />;
    case "tulip":
      return <TulipFlower color={color} size={size} scale={bloomScale} />;
    case "daisy":
      return <DaisyFlower color={color} size={size} scale={bloomScale} />;
    case "sunflower":
      return <SunflowerFlower color={color} size={size} scale={bloomScale} />;
    case "sakura":
      return <SakuraFlower color={color} size={size} scale={bloomScale} />;
    case "lily":
      return <LilyFlower color={color} size={size} scale={bloomScale} />;
    default:
      return <RoseFlower color={color} size={size} scale={bloomScale} />;
  }
}

function FlowerWrapper({
  size,
  scale,
  children,
}: {
  size: number;
  scale: number;
  children: React.ReactNode;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `scale(${scale})`, transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
    >
      {children}
    </svg>
  );
}

function RoseFlower({ color, size, scale }: { color: string; size: number; scale: number }) {
  const petals = 5;
  return (
    <FlowerWrapper size={size} scale={scale}>
      <ellipse cx="50" cy="85" rx="8" ry="20" fill="#5a8f4a" />
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="45"
          rx="18"
          ry="28"
          fill={color}
          transform={`rotate(${(360 / petals) * i} 50 50)`}
          opacity={0.9}
        />
      ))}
      <circle cx="50" cy="50" r="8" fill="#8B4513" opacity="0.6" />
    </FlowerWrapper>
  );
}

function TulipFlower({ color, size, scale }: { color: string; size: number; scale: number }) {
  return (
    <FlowerWrapper size={size} scale={scale}>
      <rect x="47" y="55" width="6" height="35" rx="3" fill="#5a8f4a" />
      <path d="M50 55 C35 45, 30 25, 50 15 C70 25, 65 45, 50 55" fill={color} />
      <path d="M50 55 C40 40, 42 28, 50 20 C58 28, 60 40, 50 55" fill={color} opacity="0.7" />
    </FlowerWrapper>
  );
}

function DaisyFlower({ color, size, scale }: { color: string; size: number; scale: number }) {
  const petals = 8;
  return (
    <FlowerWrapper size={size} scale={scale}>
      <line x1="50" y1="55" x2="50" y2="85" stroke="#5a8f4a" strokeWidth="3" />
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="38"
          rx="8"
          ry="18"
          fill={color}
          transform={`rotate(${(360 / petals) * i} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="10" fill="#FFD93D" />
    </FlowerWrapper>
  );
}

function SunflowerFlower({ color, size, scale }: { color: string; size: number; scale: number }) {
  const petals = 12;
  return (
    <FlowerWrapper size={size} scale={scale}>
      <line x1="50" y1="60" x2="50" y2="88" stroke="#5a8f4a" strokeWidth="4" />
      {Array.from({ length: petals }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="32"
          rx="6"
          ry="16"
          fill={color}
          transform={`rotate(${(360 / petals) * i} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="#8B4513" />
      {Array.from({ length: 8 }).map((_, i) => (
        <circle
          key={i}
          cx={50 + Math.cos((i / 8) * Math.PI * 2) * 6}
          cy={50 + Math.sin((i / 8) * Math.PI * 2) * 6}
          r="2"
          fill="#5C3317"
        />
      ))}
    </FlowerWrapper>
  );
}

function SakuraFlower({ color, size, scale }: { color: string; size: number; scale: number }) {
  const petals = 5;
  return (
    <FlowerWrapper size={size} scale={scale}>
      {Array.from({ length: petals }).map((_, i) => (
        <path
          key={i}
          d="M50 50 Q55 30, 50 18 Q45 30, 50 50"
          fill={color}
          transform={`rotate(${(360 / petals) * i} 50 50)`}
          opacity="0.85"
        />
      ))}
      <circle cx="50" cy="50" r="5" fill="#FFB7C5" />
    </FlowerWrapper>
  );
}

function LilyFlower({ color, size, scale }: { color: string; size: number; scale: number }) {
  return (
    <FlowerWrapper size={size} scale={scale}>
      <line x1="50" y1="55" x2="50" y2="88" stroke="#5a8f4a" strokeWidth="3" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M50 55 C45 35, 48 20, 50 12 C52 20, 55 35, 50 55"
          fill={color}
          transform={`rotate(${angle} 50 50)`}
          opacity="0.9"
        />
      ))}
      <circle cx="50" cy="50" r="4" fill="#FFD700" opacity="0.5" />
    </FlowerWrapper>
  );
}

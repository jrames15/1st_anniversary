export interface MemoryPhoto {
  id: string;
  src: string;
  caption: string;
  date: string;
  rotation: number;
  tape?: "left" | "right" | "top";
  doodle?: string;
}

export const memories: MemoryPhoto[] = [
  {
    id: "m1",
    src: "/photos/photo_1_2026-06-30_11-57-29.jpg",
    caption: "Sofer Cutiee Us Bebii",
    date: "Our Graduation Picture Bebii",
    rotation: -4,
    tape: "top",
    doodle: "💕",
  },
  {
    id: "m2",
    src: "/photos/photo_2_2026-06-30_11-57-29.jpg",
    caption: "Your smile is my favorite view",
    date: "Pictorial Day nato Bebii",
    rotation: 3,
    tape: "left",
    doodle: "🌸",
  },
  {
    id: "m3",
    src: "/photos/photo_3_2026-06-30_11-57-29.jpg",
    caption: "Year End Partyyy Bebii",
    date: "Cutieee yet kiatan kaayo bebii",
    rotation: -2,
    tape: "right",
    doodle: "✨",
  },
  {
    id: "m4",
    src: "/photos/photo_4_2026-06-30_11-57-29.jpg",
    caption: "Late night talks & laughter",
    date: "My flowers fo you bebiii",
    rotation: 5,
    doodle: "🌙",
  },
  {
    id: "m5",
    src: "/photos/photo_5_2026-06-30_11-57-29.jpg",
    caption: "Our First Photobooth Bebii",
    date: "Dili man ko ma klaro bebii HAHAHA",
    rotation: -3,
    tape: "top",
    doodle: "❤️",
  },
  {
    id: "m6",
    src: "/photos/photo_6_2026-06-30_11-57-29.jpg",
    caption: "Koalaaa si bebiii",
    date: "Soferrr Cutieee my Bebii",
    rotation: 2,
    tape: "left",
    doodle: "🎀",
  },
];

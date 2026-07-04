export type FlowerType =
  | "rose"
  | "tulip"
  | "daisy"
  | "sunflower"
  | "sakura"
  | "lily";

export interface SongFlower {
  id: string;
  flower: FlowerType;
  title: string;
  artist: string;
  cover: string;
  spotifyUrl?: string;
  audioSrc?: string;
  position: { x: number; y: number };
  color: string;
}

export const songFlowers: SongFlower[] = [
  {
    id: "seasons",
    flower: "sakura",
    title: "seasons",
    artist: "Wave to Earth",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e023b975ed7ccd57f3a00d570cf",
    spotifyUrl: "https://open.spotify.com/track/5VBjyOQzqlPNgdRPMM6prF",
    position: { x: 18, y: 55 },
    color: "#FFC1D6",
  },
  {
    id: "love",
    flower: "rose",
    title: "love.",
    artist: "Wave to Earth",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0224f8c3ad20b7c6cfecb5832e",
    spotifyUrl: "https://open.spotify.com/track/5mtTAScDytxMMqZj14NmlN",
    position: { x: 38, y: 42 },
    color: "#FF8FAB",
  },
  {
    id: "surf",
    flower: "tulip",
    title: "surf.",
    artist: "Wave to Earth",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02108c3579e29c47829d0953fe",
    spotifyUrl: "https://open.spotify.com/track/4ZYtt5NWf3BiNTnhLmy3qg",
    position: { x: 58, y: 58 },
    color: "#DCCCF6",
  },
  {
    id: "bad",
    flower: "daisy",
    title: "bad",
    artist: "Wave to Earth",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0224f8c3ad20b7c6cfecb5832e",
    spotifyUrl: "https://open.spotify.com/track/5TZKpQFKCbIlWGD8DzHbC6",
    position: { x: 72, y: 38 },
    color: "#FFF8F2",
  },
  {
    id: "evening-glow",
    flower: "sunflower",
    title: "evening glow",
    artist: "Wave to Earth",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0224f8c3ad20b7c6cfecb5832e",
    spotifyUrl: "https://open.spotify.com/track/4ti11xaTQ4ZrLBglUyrkMX",
    position: { x: 28, y: 68 },
    color: "#FFD93D",
  },
  {
    id: "sunny-days",
    flower: "lily",
    title: "sunny days",
    artist: "Wave to Earth",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0224f8c3ad20b7c6cfecb5832e",
    spotifyUrl: "https://open.spotify.com/track/3URe1bi21ftFK4zh5nO1P1",
    position: { x: 82, y: 62 },
    color: "#EAF6FF",
  },
];

import type { Metadata, Viewport } from "next";
import {
  Allura,
  Cormorant_Garamond,
  Great_Vibes,
  Inter,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy 1st Anniversary ❤️ | Our Story",
  description:
    "A magical interactive journey celebrating our first year together. Made with love for my Bebii.",
  keywords: ["anniversary", "love", "our story"],
  openGraph: {
    title: "Happy 1st Anniversary ❤️",
    description: "Something special, just for you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFD6E7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} ${inter.variable} ${greatVibes.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

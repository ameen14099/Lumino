import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lumino — Every Book, a Personalized Experience",
  description:
    "Transform any book into an interactive, AI-powered learning experience. Visual concept maps, AI mentors, gamified challenges, and personalized action plans. The Duolingo for self-improvement books.",
  keywords: [
    "book summary",
    "AI learning",
    "self improvement",
    "Atomic Habits",
    "interactive books",
    "personalized learning",
  ],
  openGraph: {
    title: "Lumino — Every Book, a Personalized Experience",
    description:
      "Transform any book into an interactive, AI-powered learning experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollRail from "@/components/ScrollRail";
import AmbientBackground from "@/components/AmbientBackground";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-family",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-family",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-family",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rahmat Dawood — Medical Laboratory Scientist & Founder",
  description:
    "Portfolio of a Medical Laboratory Scientist and entrepreneur working at the intersection of science, research, business, and luxury fashion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased bg-canvas text-ink-900">
        <AmbientBackground />
        <CustomCursor />
        <ScrollRail />
        {children}
      </body>
    </html>
  );
}

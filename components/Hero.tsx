"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { profile } from "@/lib/data";

const headline = "Where science meets style.".split(" ");

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center"
      data-cursor-zone="science"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-10 grid md:grid-cols-5 gap-10 items-center pt-24">
        <div className="md:col-span-3">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-xs text-white/70 mb-6"
          >
            {profile.role}
          </motion.p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-8 text-white">
            {headline.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block mr-3 ${
                  word === "science"
                    ? "text-lab-300"
                    : word === "style."
                    ? "gradient-text italic font-medium"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-lg text-white/80 max-w-xl mb-10 leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-white text-ink-900 text-sm tracking-wide hover:opacity-90 transition"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-white/40 bg-white/10 backdrop-blur text-white text-sm tracking-wide hover:bg-white/20 transition"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* Empty right column for balance */}
        <div className="md:col-span-2 h-[380px] md:h-[520px]" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>

        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
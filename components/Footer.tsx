"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative pt-24 pb-10 px-6 md:px-10 border-t border-ink-900/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        <div>
          <p className="font-display text-2xl mb-2">
            {profile.name}
            <span className="gradient-text">.</span>
          </p>
          <p className="text-sm text-ink-500 max-w-sm">
            Medical Laboratory Scientist &amp; Founder — building at the
            intersection of science and style.
          </p>
        </div>

        <div className="flex gap-6">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-ink-500 hover:text-ink-900 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-14 pt-6 border-t border-ink-900/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-300">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Designed with precision. Built with care.</p>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 w-11 h-11 rounded-full glass flex items-center justify-center z-40"
            aria-label="Back to top"
            data-cursor-scale
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

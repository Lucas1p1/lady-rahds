"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";

type Zone = "science" | "fashion" | "neutral";

const links: { label: string; href: string; zone: Zone }[] = [
  { label: "About", href: "#about", zone: "science" },
  { label: "Skills", href: "#skills", zone: "neutral" },
  { label: "Experience", href: "#experience", zone: "science" },
  { label: "Projects", href: "#projects", zone: "neutral" },
  { label: "Fashion", href: "#fashion", zone: "fashion" },
  { label: "Certifications", href: "#certifications", zone: "science" },
  { label: "Contact", href: "#contact", zone: "fashion" },
];

const dotColor: Record<Zone, string> = {
  science: "bg-lab-500",
  fashion: "bg-silk-500",
  neutral: "bg-ink-500",
};

export default function Navbar() {
  const [active, setActive] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,1040px)]"
    >
      <nav
        className={`glass rounded-full px-5 py-3 flex items-center justify-between gap-4 transition-shadow duration-300 ${
          scrolled ? "shadow-glass-lg" : "shadow-glass"
        }`}
      >
        <a href="#hero" className="font-display text-sm tracking-wide shrink-0">
          {profile.name.split(" ")[0]}
          <span className="gradient-text">.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-5 text-xs uppercase tracking-widest text-ink-500 shrink-0">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative flex items-center gap-1.5 py-1 transition-colors ${
                    isActive ? "text-ink-900" : "hover:text-ink-900"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                      dotColor[link.zone]
                    } ${isActive ? "opacity-100" : "opacity-0"}`}
                  />
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden lg:inline-flex text-xs uppercase tracking-widest px-4 py-2 rounded-full bg-ink-900 text-white hover:opacity-85 transition-opacity whitespace-nowrap"
          >
            Say Hello
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="lg:hidden w-9 h-9 rounded-full glass flex items-center justify-center"
          >
            {menuOpen ? (
              <X size={16} className="text-ink-900" />
            ) : (
              <Menu size={16} className="text-ink-900" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden mt-3 glass-panel rounded-3xl p-3 shadow-glass-lg"
          >
            <ul className="flex flex-col divide-y divide-ink-300/20">
              {links.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-3 text-sm uppercase tracking-widest transition-colors ${
                        isActive ? "text-ink-900" : "text-ink-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${dotColor[link.zone]}`}
                      />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center text-xs uppercase tracking-widest px-4 py-3 rounded-full bg-ink-900 text-white"
            >
              Say Hello
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

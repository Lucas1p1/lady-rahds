"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/data";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Fashion", href: "#fashion" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(94%,880px)]"
    >
      <nav className="glass rounded-full px-5 py-3 flex items-center justify-between">
        <a href="#hero" className="font-display text-sm tracking-wide">
          {profile.name.split(" ")[0]}
          <span className="gradient-text">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-ink-500">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-ink-900 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden md:inline-flex text-xs uppercase tracking-widest px-4 py-2 rounded-full bg-ink-900 text-white hover:opacity-85 transition-opacity"
        >
          Say Hello
        </a>
      </nav>
    </motion.header>
  );
}

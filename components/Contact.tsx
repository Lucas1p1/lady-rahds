"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState, type MouseEvent } from "react";
import { Copy, Check } from "lucide-react";
import AuroraBackground from "./AuroraBackground";
import { profile } from "@/lib/data";

function MagneticButton({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200 });
  const springY = useSpring(y, { damping: 15, stiffness: 200 });
  const linkRef = useRef<HTMLAnchorElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const buttonClass =
    "px-8 py-4 rounded-full bg-ink-900 text-white text-sm tracking-wide inline-flex items-center gap-2 hover:opacity-90";

  const makeHandleMove =
    (el: HTMLElement | null) => (e: MouseEvent) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
    };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (href) {
    return (
      <motion.a
        ref={linkRef}
        href={href}
        onMouseMove={(e) => makeHandleMove(linkRef.current)(e)}
        onMouseLeave={reset}
        style={{ x: springX, y: springY }}
        className={buttonClass}
        data-cursor-scale
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={(e) => makeHandleMove(btnRef.current)(e)}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={buttonClass}
      data-cursor-scale
    >
      {children}
    </motion.button>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-32"
      data-cursor-zone="fashion"
    >
      <AuroraBackground className="opacity-80" />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="uppercase tracking-[0.3em] text-xs text-ink-500 mb-6"
        >
          Let&apos;s Talk
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-6xl tracking-tight mb-8 leading-tight"
        >
          Let&apos;s build something{" "}
          <span className="gradient-text italic">precise</span> and{" "}
          <span className="gradient-text italic">beautiful</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-ink-500 text-lg mb-10 max-w-xl mx-auto"
        >
          Open to collaborations, speaking, consulting, and partnership
          opportunities — in the lab, in business, or somewhere in between.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href={`mailto:${profile.email}`}>
            Email Me
          </MagneticButton>
          <button
            onClick={copyEmail}
            className="px-6 py-4 rounded-full glass text-sm tracking-wide inline-flex items-center gap-2 hover:bg-white/70 transition-colors"
            data-cursor-scale
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : profile.email}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
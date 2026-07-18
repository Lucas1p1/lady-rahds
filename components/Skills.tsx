"use client";

import { motion } from "motion/react";
import { skillColumns } from "@/lib/data";

function Chip({
  label,
  tone,
  index,
}: {
  label: string;
  tone: "lab" | "silk" | "neutral";
  index: number;
}) {
  const toneClasses = {
    lab: "border-lab-200 bg-lab-50 text-lab-600",
    silk: "border-silk-200 bg-silk-50 text-silk-600",
    neutral: "border-ink-900/10 bg-white text-ink-700",
  }[tone];

  return (
    <motion.li
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, delay: index * 0.05, type: "spring", damping: 22 }}
      whileHover={{ y: -4 }}
      className={`inline-flex px-4 py-2 rounded-full border text-sm font-medium ${toneClasses} shadow-glass cursor-default`}
    >
      {label}
    </motion.li>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-32 px-6 md:px-10 bg-canvas/70 backdrop-blur-sm"
      data-cursor-zone="neutral"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-ink-500 mb-4">
            Capabilities
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            Two disciplines. One standard.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-xl mb-5 text-lab-600">
              {skillColumns.scientific.label}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {skillColumns.scientific.items.map((item, i) => (
                <Chip key={item} label={item} tone="lab" index={i} />
              ))}
            </ul>
          </motion.div>

          <div className="flex md:flex-col items-center justify-center gap-4 md:gap-6 py-6 md:py-0">
            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-lab-300 via-transparent to-silk-300" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-2xl px-5 py-4 text-center"
            >
              <p className="text-xs uppercase tracking-widest text-ink-500 mb-3">
                {skillColumns.intersection.label}
              </p>
              <ul className="space-y-2">
                {skillColumns.intersection.items.map((item) => (
                  <li key={item} className="text-sm gradient-text font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-silk-300 via-transparent to-lab-300" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display text-xl mb-5 text-silk-600">
              {skillColumns.creative.label}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {skillColumns.creative.items.map((item, i) => (
                <Chip key={item} label={item} tone="silk" index={i} />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

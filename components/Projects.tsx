"use client";

import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { useState } from "react";
import { projects } from "@/lib/data";

const filters = [
  { key: "all", label: "All" },
  { key: "research", label: "Research & Lab" },
  { key: "business", label: "Business & Creative" },
] as const;

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section
      id="projects"
      className="relative py-32 px-6 md:px-10"
      data-cursor-zone="neutral"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-ink-500 mb-4">
              Selected Work
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              Projects worth the detail
            </h2>
          </div>

          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-colors ${
                  filter === f.key
                    ? "bg-ink-900 text-white border-ink-900"
                    : "border-ink-900/15 text-ink-500 hover:border-ink-900/40"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <LayoutGroup>
          <motion.ul layout className="grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.li
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, type: "spring", damping: 24 }}
                  whileHover={{ y: -6 }}
                  className={`group relative rounded-[24px] overflow-hidden glass-panel p-6 flex flex-col justify-between min-h-[220px] ${
                    project.size === "large" ? "md:col-span-2 md:row-span-2 min-h-[320px]" : ""
                  }`}
                >
                  <div
                    className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-40 transition-opacity group-hover:opacity-70 ${
                      project.category === "research" ? "bg-lab-300" : "bg-silk-300"
                    }`}
                  />
                  <div className="relative z-10">
                    <span
                      className={`inline-block text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
                        project.category === "research"
                          ? "bg-lab-100 text-lab-600"
                          : "bg-silk-100 text-silk-600"
                      }`}
                    >
                      {project.category === "research" ? "Research & Lab" : "Business & Creative"}
                    </span>
                    <h3 className="font-display text-2xl mb-2">{project.title}</h3>
                    <p className="text-ink-500 text-sm leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                  <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-3 py-1 rounded-full bg-white/70 text-ink-700 border border-ink-900/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}

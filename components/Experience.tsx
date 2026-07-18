"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { experience } from "@/lib/data";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative py-32 px-6 md:px-10"
      data-cursor-zone="science"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[0.3em] text-xs text-ink-500 mb-4">
            Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            A path through both worlds
          </h2>
        </motion.div>

        <div ref={ref} className="relative pl-10 md:pl-0">
          {/* Timeline spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-ink-900/10" />
          <motion.div
            style={{ scaleY: pathLength }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 origin-top bg-gradient-to-b from-lab-400 to-silk-400"
          />

          <ul className="space-y-16">
            {experience.map((item, i) => (
              <TimelineItem key={item.role + item.year} item={item} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof experience)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const fromLeft = index % 2 === 0;
  const accent = item.category === "science" ? "lab" : "silk";

  return (
    <motion.li
      initial={{ opacity: 0, x: fromLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, type: "spring", damping: 22 }}
      className="relative md:grid md:grid-cols-2 md:gap-10"
    >
      <div
        className={`absolute left-4 md:left-1/2 top-1 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow-glow ${
          accent === "lab" ? "bg-lab-400" : "bg-silk-400"
        }`}
      />

      <div className={fromLeft ? "md:pr-14 md:text-right" : "md:col-start-2 md:pl-14"}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="glass rounded-2xl px-6 py-5 text-left w-full hover:bg-white/70 transition-colors"
        >
          <p className="text-xs uppercase tracking-widest text-ink-500 mb-1">
            {item.year}
          </p>
          <h3 className="font-display text-xl mb-1">{item.role}</h3>
          <p
            className={`text-sm font-medium mb-2 ${
              accent === "lab" ? "text-lab-600" : "text-silk-600"
            }`}
          >
            {item.org}
          </p>
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            className="overflow-hidden"
          >
            <p className="text-ink-500 text-sm pt-2 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        </button>
      </div>
    </motion.li>
  );
}

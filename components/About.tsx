"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { about, profile } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 md:px-10"
      data-cursor-zone="science"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-2"
        >
          <div className="relative aspect-[4/5] rounded-[28px] glass-panel overflow-hidden">
            <Image
              src="/video/the-rahds.JPEG"
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="glass rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-widest text-ink-500">
                  Based in
                </p>
                <p className="font-display text-lg">{profile.location}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="md:col-span-3">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="uppercase tracking-[0.3em] text-xs text-lab-600 mb-6"
          >
            About
          </motion.p>

          <div className="space-y-5 mb-10">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="text-ink-700 text-lg leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl px-6 py-5 border-l-4 border-silk-400"
          >
            <p className="font-display italic text-xl">“{about.quote}”</p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
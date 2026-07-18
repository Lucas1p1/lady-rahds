"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { fashion } from "@/lib/data";

export default function FashionBusiness() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="fashion"
      className="relative py-20 overflow-hidden"
      data-cursor-zone="fashion"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #FFF6FA 0%, #FFFFFF 50%, #FFF6FA 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-5 gap-10 items-center mb-16">
        <div className="md:col-span-3">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.3em] text-xs text-silk-600 mb-4"
          >
            The Atelier
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl tracking-tight mb-6"
          >
            Beauty, Fragrance &amp; Modest Wear
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-ink-500 text-lg max-w-xl leading-relaxed"
          >
            {fashion.intro}
          </motion.p>
        </div>
        <div className="md:col-span-2 h-64 hidden md:block" />
      </div>

      <motion.div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto pb-6 px-6 md:px-10 snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {fashion.gallery.map((item, i) => (
          <GalleryCard key={item.title} item={item} index={i} />
        ))}
      </motion.div>

      <p className="text-center text-xs text-ink-300 mt-4 tracking-wide">
        Drag to explore the collections →
      </p>
    </section>
  );
}

function GalleryCard({
  item,
  index,
}: {
  item: { title: string; caption: string; image: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="relative snap-start shrink-0 w-[280px] md:w-[340px] aspect-[3/4] rounded-[24px] overflow-hidden glass-panel group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-silk-100 via-white to-lab-50" />
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 280px, 340px"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="glass rounded-2xl px-4 py-3">
          <h3 className="font-display text-lg mb-1">{item.title}</h3>
          <p className="text-xs text-ink-500">{item.caption}</p>
        </div>
      </div>
    </motion.div>
  );
}
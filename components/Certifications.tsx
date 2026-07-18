"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { certifications } from "@/lib/data";

function Badge({ cert }: { cert: (typeof certifications)[number] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="relative shrink-0 w-64 h-32 [perspective:800px] mr-6"
      aria-label={`${cert.name}, ${cert.issuer}`}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 glass rounded-2xl p-5 flex flex-col justify-center [backface-visibility:hidden]">
          <p className="text-[10px] uppercase tracking-widest text-lab-600 mb-2">
            Certified
          </p>
          <h3 className="font-display text-base leading-snug">{cert.name}</h3>
        </div>
        <div className="absolute inset-0 glass rounded-2xl p-5 flex flex-col justify-center items-start [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm text-ink-700 mb-1">{cert.issuer}</p>
          <p className="text-xs text-ink-500">Issued {cert.year}</p>
        </div>
      </motion.div>
    </button>
  );
}

export default function Certifications() {
  const doubled = [...certifications, ...certifications];

  return (
    <section
      id="certifications"
      className="relative py-20"
      data-cursor-zone="science"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-12 text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-ink-500 mb-4">
          Credentials
        </p>
        <h2 className="font-display text-4xl md:text-5xl tracking-tight">
          Certifications
        </h2>
      </div>

      <div className="overflow-hidden">
        <div className="marquee-track">
          {doubled.map((cert, i) => (
            <Badge key={`${cert.name}-${i}`} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

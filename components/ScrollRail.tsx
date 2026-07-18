"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 120,
    mass: 0.3,
  });

  return (
    <div className="scroll-rail hidden md:block">
      <div className="absolute inset-0 rounded-full bg-ink-900/5" />
      <motion.div
        className="absolute inset-0 rounded-full origin-top"
        style={{
          scaleY,
          background: "linear-gradient(180deg, #4FA3E3, #E35FA6)",
        }}
      />
    </div>
  );
}

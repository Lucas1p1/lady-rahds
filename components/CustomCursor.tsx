"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 300, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 8);
      y.set(e.clientY - 8);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const zone = el?.closest("[data-cursor-zone]") as HTMLElement | null;
      const zoneType = zone?.dataset.cursorZone ?? "neutral";
      const node = cursorRef.current;
      if (!node) return;

      if (zoneType === "science") {
        node.style.backgroundColor = "rgba(79,163,227,0.55)";
        node.style.border = "1px solid rgba(79,163,227,0.8)";
      } else if (zoneType === "fashion") {
        node.style.backgroundColor = "rgba(227,95,166,0.55)";
        node.style.border = "1px solid rgba(227,95,166,0.8)";
      } else {
        node.style.backgroundColor = "rgba(11,13,18,0.45)";
        node.style.border = "1px solid rgba(11,13,18,0.6)";
      }

      const isInteractive = el?.closest("a, button, [data-cursor-scale]");
      node.style.transform = isInteractive ? "scale(2.2)" : "scale(1)";
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor"
      style={{ x: springX, y: springY }}
    />
  );
}

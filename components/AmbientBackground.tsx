"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import AuroraBackground from "./AuroraBackground";
import MorphScene from "./three/MorphSceneClient";

/**
 * Fixed, full-viewport ambient layer that sits behind every section.
 * It stays pinned while the page scrolls, so once the user scrolls
 * past the Hero's opaque video, the same drifting aurora + floating
 * molecule/sparkle scene from the Hero continues through the rest
 * of the site.
 *
 * The WebGL scene is fully unmounted while the Hero is on screen: it
 * would only be rendering behind the Hero's opaque video anyway, and
 * running it there just competes with the video decoder for GPU time
 * and causes the video to stutter/drop frames. It mounts back in once
 * the user scrolls past the Hero.
 */
export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  // Gently sweep the morph progress across the full page scroll so the
  // shape keeps drifting/morphing as you move through the sections.
  const morphProgress = useTransform(scrollYProgress, [0, 1], [0.15, 0.95]);
  const [progress, setProgress] = useState(morphProgress.get());
  useMotionValueEvent(morphProgress, "change", (v) => setProgress(v));

  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      // No hero on this page (or not mounted yet) - safe to show.
      setShowScene(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only render the 3D scene once the Hero is mostly scrolled away.
        setShowScene(entry.intersectionRatio < 0.4);
      },
      { threshold: [0, 0.4, 1] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
      data-cursor-zone="neutral"
    >
      <AuroraBackground className="opacity-60" />
      {showScene && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <MorphScene progress={progress} className="w-full h-full" />
        </motion.div>
      )}
    </div>
  );
}
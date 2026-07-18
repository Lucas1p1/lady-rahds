"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  // Avoid rendering a mismatched icon before hydration knows the real theme
  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="w-9 h-9 rounded-full glass flex items-center justify-center"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 rounded-full glass flex items-center justify-center hover:opacity-80 transition-opacity"
    >
      {isDark ? (
        <Sun size={16} className="text-ink-900" />
      ) : (
        <Moon size={16} className="text-ink-900" />
      )}
    </button>
  );
}
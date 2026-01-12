"use client";

import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const MIN_DISPLAY_MS = 3000;
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const finishedRef = useRef<boolean>(false);
  const fadeTimeoutRef = useRef<number | null>(null);
  const safetyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const finishWithMinimumDelay = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      fadeTimeoutRef.current = window.setTimeout(() => {
        setIsFading(true);
        window.setTimeout(() => setIsVisible(false), 400);
      }, remaining) as unknown as number;
    };

    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        finishWithMinimumDelay();
      } else {
        const onLoad = () => finishWithMinimumDelay();
        window.addEventListener("load", onLoad);
        // Absolute safety in case the load event never fires
        safetyTimeoutRef.current = window.setTimeout(finishWithMinimumDelay, 10000) as unknown as number;
        return () => {
          window.removeEventListener("load", onLoad);
          if (safetyTimeoutRef.current) window.clearTimeout(safetyTimeoutRef.current);
          if (fadeTimeoutRef.current) window.clearTimeout(fadeTimeoutRef.current);
        };
      }
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--primary-background)] transition-opacity ${
        isFading ? "preloader-fade-out" : ""
      }`}
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated knife */}
        <div className="knife-animate" aria-hidden>
          <svg
            width="120"
            height="40"
            viewBox="0 0 120 40"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <title>Knife</title>
            {/* Blade */}
            <path
              d="M10 26 L80 26 L110 14 L70 14 Z"
              fill="var(--foreground)"
            />
            {/* Edge highlight */}
            <rect x="12" y="24" width="60" height="2" fill="var(--primary-background)" opacity="0.5" />
            {/* Handle */}
            <path d="M10 14 L32 14 C37 14 40 17 40 22 C40 27 37 30 32 30 L10 30 Z" fill="var(--main-color)" />
            {/* Rivets */}
            <circle cx="22" cy="20.5" r="2" fill="var(--primary-background)" />
            <circle cx="28" cy="25" r="2" fill="var(--primary-background)" />
          </svg>
        </div>
        <span className="text-sm tracking-widest uppercase text-[color:var(--foreground)] opacity-70">
          Preparing your cuts…
        </span>
      </div>
    </div>
  );
}


"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number; // ms
  durationMs?: number; // ms
  direction?: RevealDirection;
  threshold?: number;
  triggerOnce?: boolean;
};

export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  durationMs = 600,
  direction = "up",
  threshold = 0.15,
  triggerOnce = true,
}: RevealProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (triggerOnce) observer.unobserve(entry.target);
          } else if (!triggerOnce) {
            setInView(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  const Component = as as any;

  return (
    <Component
      ref={ref as any}
      data-reveal={direction}
      className={`reveal ${inView ? "in" : ""} ${className ?? ""}`}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${Math.max(0, delay)}ms`,
      }}
    >
      {children}
    </Component>
  );
}



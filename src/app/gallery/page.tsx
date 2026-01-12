"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Merriweather } from "next/font/google";
import Reveal from "../_components/animation/Reveal";
import { gallery } from "./data";
import { Cta } from "../_components";

const merriweather = Merriweather({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const updateCarousel = (newIndex: number) => {
    if (animating) return;
    setAnimating(true);
    const length = gallery.length;
    setCurrentIndex((newIndex + length) % length);
    setTimeout(() => setAnimating(false), 700);
  };

  // Swipe gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 50
    ) {
      if (touchStartX.current > touchEndX.current) updateCarousel(currentIndex + 1);
      else updateCarousel(currentIndex - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
      else if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, animating]);

  // 3D card styles
  const getCardStyle = (i: number): React.CSSProperties => {
    const length = gallery.length;
    const offset = (i - currentIndex + length) % length;

    const base: React.CSSProperties = {
      transformStyle: "preserve-3d",
      transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
      pointerEvents: "auto",
    };

    switch (offset) {
      case 0:
        return { ...base, transform: "translateX(0) scale(1.15)", zIndex: 20 };
      case 1:
        return { ...base, transform: "translateX(200px) rotateY(-8deg) scale(0.95)", zIndex: 10 };
      case 2:
        return { ...base, transform: "translateX(400px) rotateY(-15deg) scale(0.8)", zIndex: 5 };
      case length - 1:
        return { ...base, transform: "translateX(-200px) rotateY(8deg) scale(0.95)", zIndex: 10 };
      case length - 2:
        return { ...base, transform: "translateX(-400px) rotateY(15deg) scale(0.8)", zIndex: 5 };
      default:
        return { ...base, opacity: 0, scale: 0.75, pointerEvents: "none" };
    }
  };

  return (
    <Reveal>
      <div
        className="relative min-h-screen overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* TOP SECTION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10 pt-16 sm:pt-20 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto">

          {/* TEXT */}
          <div
            className={`${merriweather.className} w-full sm:w-1/2 text-center sm:text-left`}
          >
            <h1 className="text-[32px] sm:text-[44px] lg:text-[56px] font-normal text-[#5a0202]">
              Fresh Meat Collections
            </h1>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-black max-w-md mx-auto sm:mx-0">
              Carefully sourced, hygienically prepared, and freshly cut to deliver
              premium quality meat you can trust every day.
            </p>
          </div>

          {/* IMAGE */}
          <div className="w-full sm:w-1/2 h-[45vh] sm:h-[60vh] lg:h-[75vh] flex items-center justify-center">
            <img
              src="/assets/gallery/gallery-main-1.png"
              alt="Fresh Meat Collection"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="relative w-full max-w-[1400px] h-[380px] sm:h-[420px] mt-20 sm:mt-28 mb-20 sm:mb-28 mx-auto flex items-center justify-center px-4">
          <div className="relative w-full flex justify-center items-center h-full" style={{ perspective: 2000 }}>
            {gallery.map((item, i) => (
              <div
                key={i}
                className="absolute bg-[#1f1f1f] rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                onClick={() => updateCarousel(i)}
                style={{
                  width: "clamp(220px,22vw,300px)",
                  height: "clamp(320px,30vw,420px)",
                  ...getCardStyle(i),
                }}
              >
                <img
                  src={item.img}
                  alt={`Product ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* ARROWS */}
          <button
            onClick={() => updateCarousel(currentIndex - 1)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white sm:bg-[#970303] text-[#970303] sm:text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:scale-110 transition z-50"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() => updateCarousel(currentIndex + 1)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white sm:bg-[#970303] text-[#970303] sm:text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:scale-110 transition z-50"
          >
            <FaChevronRight />
          </button>
        </div>

        <Cta />
      </div>
    </Reveal>
  );
};

export default Gallery;

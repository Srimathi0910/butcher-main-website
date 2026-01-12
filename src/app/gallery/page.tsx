"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Merriweather } from "next/font/google";
import Reveal from "../_components/animation/Reveal";
import { gallery } from "./data";

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
      touchAction: "manipulation",
    };

    switch (offset) {
      case 0:
        return { ...base, transform: "translateX(0px) scale(1.15)", zIndex: 20 };
      case 1:
        return { ...base, transform: "translateX(200px) rotateY(-8deg) scale(0.95)", zIndex: 10 };
      case 2:
        return { ...base, transform: "translateX(400px) rotateY(-15deg) scale(0.8)", zIndex: 5 };
      case length - 1:
        return { ...base, transform: "translateX(-200px) rotateY(8deg) scale(0.95)", zIndex: 10 };
      case length - 2:
        return { ...base, transform: "translateX(-400px) rotateY(15deg) scale(0.8)", zIndex: 5 };
      default:
        return { ...base, transform: "scale(0.75)", opacity: 0, zIndex: 1, pointerEvents: "none" };
    }
  };

  // Arrow handlers
  const prev = () => updateCarousel(currentIndex - 1);
  const next = () => updateCarousel(currentIndex + 1);

  return (

    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden  select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full h-[80vh] relative top-4 overflow-hidden">
        <img
          src="/assets/gallery/gallery-main-1.png"
          alt="Landing"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className={`${merriweather.className} text-[40px] sm:text-[56px] font-normal text-[#FFFFFF] text-center drop-shadow-[0_0_30px_rgba(151,3,3,0.4)]`}
          >
            OUR PRODUCTS
          </h1>
        </div>
      </div>

      <div className="relative w-full max-w-[1400px] h-[400px] mt-24 mb-24 flex items-center justify-center">
        {/* CARDS */}
        <div className="relative w-full flex justify-center items-center h-full" style={{ perspective: 2000 }}>
          {gallery.map((member, i) => (
            <div
              key={i}
              className="absolute bg-[#1f1f1f] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] cursor-pointer"
              onClick={() => updateCarousel(i)}
              style={{
                width: 300,
                height: 420,
                ...getCardStyle(i),
              }}
            >
              <img
                src={member.img}
                alt={`Product ${i + 1}`}
                className="w-full h-full object-cover brightness-90"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* ARROWS */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white sm:bg-[#970303] text-[#970303] sm:text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl shadow-lg hover:scale-110 transition-all z-[50]"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white sm:bg-[#970303] text-[#970303] sm:text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl shadow-lg hover:scale-110 transition-all z-[50]"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00bfff] blur-[120px] opacity-10 top-[10%] left-[10%] animate-[float1_24s_ease-in-out_infinite_alternate]"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#1f1f1f] blur-[120px] opacity-10 bottom-[10%] right-[10%] animate-[float2_30s_ease-in-out_infinite_alternate]"></div>

      <style>{`
        @keyframes float1 {
          0% { transform: translate(10%,10%) rotate(0deg); }
          100% { transform: translate(-10%,-10%) rotate(360deg); }
        }
        @keyframes float2 {
          0% { transform: translate(-15%,5%) rotate(0deg); }
          100% { transform: translate(15%,-5%) rotate(-360deg); }
        }

        @media (max-width: 640px) {
          .relative > div[style*="perspective"] > div {
            width: 250px !important;
            height: 350px !important;
          }
        }
      `}</style>
    </div>

  );
};

export default Gallery;

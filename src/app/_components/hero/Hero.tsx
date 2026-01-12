"use client";

import Image from "next/image";
import HeroBadge1 from "../../../../public/assets/hero/hero-badge-1.png"; 
import HeroBadge2 from "../../../../public/assets/hero/hero-badge-2.png"; 
import HeroMain from "../../../../public/assets/hero/hero-main-img.png"; 
import PrimaryButton from "../primary-button/PrimaryButton";
import Link from "next/link";
import { useRef, useState } from "react";


const highlights = [
  "100% HALAL CERTIFIED",
  "FRESH CUTS DAILY",
  "STRICT HYGIENE",
  "LOCALLY SOURCED"
]

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 .. 0.5
    setParallax({ x: relX, y: relY });
  };

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 });

  const mainTransform = {
    transform: `translate3d(${parallax.x * 10}px, ${parallax.y * 8}px, 0) scale(1.01)`,
  } as const;
  const badge1Transform = {
    transform: `translate3d(${parallax.x * -8}px, ${parallax.y * -6}px, 0) rotate(${parallax.x * -6}deg)`,
  } as const;
  const badge2Transform = {
    transform: `translate3d(${parallax.x * 12}px, ${parallax.y * 10}px, 0) rotate(${parallax.x * 6}deg)`,
  } as const;

  return (
    <section className="container">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex max-md:flex-col gap-6 items-start py-12 relative"
        >
           <div className="max-md:w-[100px] max-md:h-[100px] will-change-transform transition-transform duration-300" style={badge1Transform}>
                <Image src={HeroBadge1} width={200} height={200} alt="Hero badge "/>
            </div>
            <div className="-mt-6 md:mt-6">
                <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold max-w-[600px] xl:max-w-4xl ">Fresh Halal Meat Delivered Daily in Derby</h1>
                <p className="font-merriweather text-sm md:text-md lg:text-lg mt-3  max-w-md">From tender chicken and lamb to premium beef, goat, and fish prepared fresh every day.</p>
                <div className="mt-6 cursor-pointer transition-transform duration-300 hover:scale-[1.03]" >
                    <Link href={'/#services'} className=" cursor-pointer"><PrimaryButton text="Explore our meats" /></Link>
                </div>
            </div> 
            <div className="max-md:hidden absolute -bottom-20 right-10 will-change-transform transition-transform duration-300" style={badge2Transform}>
            <Image src={HeroBadge2} width={200} height={200} alt="Hero badge" className="" />
            </div>
        </div>
        <div className="mt-6  md:mt-12 lg:mt-22 will-change-transform transition-transform duration-300" style={mainTransform}>
            <Image src={HeroMain} width={1300} height={680} alt="Meat image" className=" object-cover object-center mx-auto" />
        </div>
        <div className="max-md:grid max-md:grid-cols-2 flex  lg:grid-cols-4 justify-between max-w-[1300px] mx-auto font-lato text-main-color items-center mt-3">
            {
                highlights.map((highlight, index) => (
                        <p key={index} className="text-sm self-center md:text-md lg:text-lg transition-transform duration-200 hover:scale-[1.03]">{highlight}</p>
                ))
            }
        </div>
        
    </section>
  )
}

export default Hero;
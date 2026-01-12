"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import logo from "../../../../public/assets/logo-white.png"; // Adjust the path as necessary
import { useWindowSize } from '@uidotdev/usehooks';
import Link from 'next/link';
 


type WindowSize = {
    width: number | null;
    height: number | null;
}

const Navbar = () => {

    const [mobileNav, setMobileNav] = useState(false);
      
    const windowSize: WindowSize = useWindowSize();
    
    // Close on ESC
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileNav(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);
    
    // Lock scroll when menu open
    useEffect(() => {
        if (mobileNav) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileNav]);


  return (
    <header className='bg-main-color font-lato'>
    {
        windowSize.width !==null && windowSize.width > 690 ? (
                <nav className='container flex justify-between items-center'>
                    <div>
                        <Link href={"/"}><Image src={logo} height={80} width={230} alt='Logo' /></Link>
                    </div>
                    <div>
                        <ul className='flex items-center gap-6 uppercase text-white'>
                            <li><Link href="/#about-us">About Us</Link></li>
                            <li><Link href="/recipies">Recipes</Link></li>
                             <li><Link href="/gallery">Gallery</Link></li>
                            <li className='px-3 py-1 text-main-color bg-white rounded-full'><Link href="/#contact-us">Contact</Link></li>
                        </ul>
                    </div>
                </nav>
        ) : (
                <nav className='bg-main-color flex justify-between items-center relative container'>
                    <div>
                        <Link href={"/"}><Image src={logo} height={80} width={180} alt='Logo' /></Link>
                    </div>
                    <div>
                        <button
                            aria-label="Toggle menu"
                            aria-expanded={mobileNav}
                            aria-controls="mobile-menu"
                            onClick={() => setMobileNav(prev => !prev)}
                            className='relative z-[1001] w-10 h-10 flex flex-col items-center justify-center gap-1.5'
                        >
                            <span className={`block h-[1px] w-6 bg-white transition-transform duration-300 ${mobileNav ? 'translate-y-[7px] rotate-45' : ''}`}></span>
                            <span className={`block h-[1px] w-6 bg-white transition-opacity duration-300 ${mobileNav ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`block h-[1px] w-6 bg-white transition-transform duration-300 ${mobileNav ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
                        </button>
                        <div
                            role="dialog"
                            aria-modal="true"
                            className={`${mobileNav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} fixed inset-0 z-[100] bg-main-color/95 backdrop-blur-sm transition-opacity duration-300`}
                            onClick={() => setMobileNav(false)}
                        >
                            <ul
                                id="mobile-menu"
                                className='h-full w-full flex flex-col items-center justify-center gap-8 text-white uppercase tracking-wide'
                                onClick={(e) => e.stopPropagation()}
                            >
                                <li>
                                    <Link href={'/#about-us'} onClick={() => setMobileNav(false)}>About Us</Link>
                                </li>
                                <li>
                                    <Link href={'/recipies'} onClick={() => setMobileNav(false)}>Recipes</Link>
                                </li>
                                <li>
                                    <Link href={'/gallery'} onClick={() => setMobileNav(false)}>Gallery</Link>
                                </li>
                                <li>
                                    <Link href={'/#contact-us'} onClick={() => setMobileNav(false)} className='px-4 py-2 rounded-full bg-white text-main-color'>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        )
    }
    </header>
  )
}

export default Navbar;
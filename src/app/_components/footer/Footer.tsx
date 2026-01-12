"use client"



import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Logo from "../../../../public/assets/logo-white.png";
import Link from 'next/link';

const Footer = () => {

  const [pathname, setPathname] = useState('');


    const slug = usePathname();
    console.log(slug);

  

  return (
    <footer className={` px-6 lg:px-12 bg-main-color `}>
      <div className='container flex justify-between py-1 items-center'>
        <div className='max-md:hidden'>
            <Image src={Logo} height={100} width={200} alt='Logo' />
        </div>
        <p className='text-[12px] md:text-sm font-merriweather max-md:max-w-[200px] text-white'>Designed and developed by <Link href='http://www.omaeva.com' className=' underline' >Omaeva ltd.</Link></p>
        <Link href='/privacy-policy' className='text-[12px] md:text-sm font-merriweather text-white' >Privacy Policy</Link>
      </div>
    </footer>
  )
}

export default Footer;
"use client";

import Image from 'next/image';
import React from 'react';
import ctaImage from "../../../../public/assets/footer-img.png"
import Sectiontitle from '../Sectiontitle';
import PrimaryButton from '../primary-button/PrimaryButton';
import HorizontalLine from '../HorizontalLine';
import Link from 'next/link';
import Reveal from "../animation/Reveal";

const Cta = () => {
  return (
    <section id='contact-us' className='container px-6 pb-12 lg:px-6'>
      <Reveal>
        <div className=' relative max-md:h-[350px] h-[570px] w-full'>
          <video className='absolute inset-0 w-full h-full object-cover' src='/assets/cta/ctavideo.mp4' autoPlay loop muted
                 playsInline/>
        </div>
      </Reveal>
      <div className='grid grid-cols-1 md:grid-cols-2 justify-between mt-12'>
        <div>
          <div>
            <Reveal>
              <Sectiontitle title='Visit us' />
            </Reveal>
            <Reveal delay={50}>
              <p className='font-merriweather mt-3 text-sm md:text-md lg:text-lg max-w-[300px]'> 216 Normanton Rd, Derby DE23 6WA</p>
            </Reveal>
          </div>
          <div className='mt-12'>
            <Reveal>
              <Sectiontitle title='Days Open' />
            </Reveal>
            <Reveal delay={50}>
              <p className='font-merriweather mt-3 text-sm md:text-md lg:text-lg max-w-[300px]'> Open 7 Days: 8 AM – 8 PM</p>
            </Reveal>
          </div>
        </div>
        <div className='flex flex-col max-md:mt-12 items-start'>
          <Reveal>
            <Sectiontitle title='Contact us' />
          </Reveal>
          <Reveal delay={50}>
            <p className='font-merriweather mt-3 mb-6 text-sm md:text-md lg:text-lg max-w-[300px]'>Craving fresh halal meat? From tender chicken and lamb to premium beef and goat, we’ve got it all. Need a special cut or bulk order? Visit us or call today!</p>
          </Reveal>
          <Reveal delay={100}>
            <Link href='tel:07424274823'><PrimaryButton text=' 07424 274823' /></Link>
          </Reveal>
        </div>

      </div>
      <div className="w-full mt-12 aspect-video overflow-hidden rounded-md">
        <Reveal delay={150}>
          <video
            className="w-full h-full object-cover"
            src="/assets/cta/location.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </Reveal>
      </div>

    </section>
  )
}

export default Cta;
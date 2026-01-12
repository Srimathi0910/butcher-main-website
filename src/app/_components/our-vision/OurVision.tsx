"use client";

import React from 'react'
import Sectiontitle from '../Sectiontitle';
import Image from 'next/image';
import visionBadge from "../../../../public/assets/our-vision-badge.png";
import HorizontalLine from '../HorizontalLine';
import Reveal from "../animation/Reveal";


const values = [
  {
    id: 1,
    title: "CRAFT",
    description:
      "At Amal Al-Sham Butchers, every cut is a product of skill, care, and dedication. Our halal meats are prepared with precision, from tender chicken and lamb to premium beef, goat, and fish. Each piece is carefully selected, ensuring freshness and quality while combining traditional butchery techniques with modern standards. Our approach delivers exceptional flavour and uncompromising quality our customers can taste in every bite."
  },
  {
    id: 2,
    title: "HONEST MEAT",
    description:
      "We are committed to honesty, transparency, and halal integrity. All our meat comes from trusted suppliers who follow the highest standards of animal welfare and responsible sourcing. You can shop with confidence, knowing that every product we offer is halal-certified, fresh, and prepared with respect for tradition and quality."
  },
  {
    id: 3,
    title: "LOCAL",
    description:
      "We proudly serve the Derby community and work closely with local suppliers whenever possible. This supports the local economy while ensuring our products are fresh, authentic, and full of flavour. Our ties with local producers help us offer seasonal specials and premium cuts that bring the best of the region to your table."
  }
]

const OurVision = () => {
  return (
    <section id='about-us' className='container px-6 lg:px-22'>
        <Reveal>
          <Sectiontitle title='Our Vision' />
        </Reveal>
        <Reveal delay={50}>
          <div className='max-w-fit ml-auto'>
              <Image src={visionBadge} height={200} width={200} alt='Vision' className=' border-4' />
          </div>
        </Reveal>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
          {
            values.map(value => (
              <Reveal key={value.id} delay={(value.id ?? 0) * 80}>
                <div>
                  <h3 className='font-cinzel font-bold text-lg'>{value.title}</h3>
                  <p className='mt-3 font-merriweather text-sm md:text-md lg:text-lg leading-[170%] text-gray-700'>{value.description}</p>
                </div>
              </Reveal>
            ))
          }
        </div>
        <HorizontalLine />
    </section>
  )
}

export default OurVision;
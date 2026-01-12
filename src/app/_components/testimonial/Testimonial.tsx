"use client";

import React from 'react'
import Sectiontitle from '../Sectiontitle';
import HorizontalLine from '../HorizontalLine';
import Reveal from "../animation/Reveal";
import Image from 'next/image';
import ratingStar from "../../../../public/assets/testimonial/rating-star.png";

const testimonials = [
  {
    id: 1,
    name: "Omar S",
    avatar: '/assets/testimonial/avatar-1.png',
    review:
      "Outstanding quality and friendly service! The cuts are always perfect and delivered fresh. Free local delivery makes shopping here an absolute pleasure.",
  },
  {
    id: 2,
    name: "Fatima K",
    avatar: '/assets/testimonial/avatar-2.png',
    review:
      "Fresh, halal-certified meat every time! The shop is spotless, and the staff are helpful. Love that I can get my order quickly with free delivery nearby.",
  },
  {
    id: 3,
    name: "Imran A",
    avatar: '/assets/testimonial/avatar-3.png',
    review:
      "Amazing variety and great prices! Every cut I've had has been tender and flavorful. The free delivery within 1 mile is such a helpful bonus.",
  },
];

const Testimonial = () => {
  return (
    <section className='container px-6 lg:px-12'>
        <Reveal>
          <Sectiontitle title='What our customers say' />
        </Reveal>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
          {
            testimonials.map( item => (
              <Reveal key={item.id} delay={(item.id ?? 0) * 80}>
                <div>
                  <div>
                    <Image src={item.avatar} height={60} width={60} alt='Avatar' className='' />
                  </div>
                  <h3 className='font-cinzel mt-3 font-bold text-lg'>{item.name}</h3>
                  <p className='mt-3 font-merriweather text-sm md:text-md lg:text-lg leading-[170%] text-gray-700'>{item.review}</p>
                  <div className='flex mt-6 gap-1'>
                    <Image src={ratingStar} width={20} height={20} alt='Testimonial Star' />
                    <Image src={ratingStar} width={20} height={20} alt='Testimonial Star' />
                    <Image src={ratingStar} width={20} height={20} alt='Testimonial Star' />
                    <Image src={ratingStar} width={20} height={20} alt='Testimonial Star' />
                    <Image src={ratingStar} width={20} height={20} alt='Testimonial Star' />
                  </div>
                </div>
              </Reveal>
            ))
          }
        </div>
        <HorizontalLine />
    </section>
  )
}

export default Testimonial;
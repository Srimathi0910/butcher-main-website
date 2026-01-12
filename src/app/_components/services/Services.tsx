"use client";

import Image from "next/image";
import PrimaryButton from "../primary-button/PrimaryButton";
import Sectiontitle from "../Sectiontitle";
import Link from "next/link";
import HorizontalLine from "../HorizontalLine";
import Reveal from "../animation/Reveal";


type ServiceData = {
    id?: number;
    title?: string;
    description?: string;
    image?: string;
}[];


const servicesData = {
    mainPara: "Our extensive selection offers something for everyone from fresh halal chicken, lamb, beef, and goat to quality fish, wings, drumsticks, and whole sheep & lamb. We also provide specialty cuts, freshly prepared meat portions, and seasonal offers, all delivered fresh to your table.",
    services: [
        {
            id: 1,
            title: "Halal Meat",
            description: "Description of service 1",
            image: "/assets/services/service-img-1.png"
        },
        {
            id: 2,
            title: "Special Cuts",
            description: "Description of service 1",
            image: "/assets/services/service-img-2.png"
        },
        {
            id: 3,
            title: "Groceries",
            description: "Description of service 1",
            image: "/assets/services/service-img-7.png"
        },
        {
            id: 4,
            title: "Ready-to-Cook",
            description: "Description of service 1",
            image: "/assets/services/service-img-4.png"
        },
        {
            id: 5,
            title: "Seasonal Offers",
            description: "Description of service 1",
            image: "/assets/services/service-img-5.png"
        },
       
    ]
}

const Services = () => {
  return (
    <section id="services" className="container mt-12 lg:mt-22 p-6 lg:px-22 lg:py-12">
        <Reveal>
          <Sectiontitle title="Our Range" />
        </Reveal>
        <Reveal delay={50}>
          <p className="font-merriweather mt-6 max-w-2xl text-sm md:text-md lg:text-lg">{servicesData.mainPara}</p>
        </Reveal>
        {/* <div className="text-right mt-6">
            <PrimaryButton text="View all" />
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-12 gap-3">
            {
                servicesData.services.map((service) => (
                    <Reveal key={service.id} delay={service.id ? service.id * 60 : 0}>
                      <div className="max-md:mb-6">
                          <div className="max-h-[350px] relative h-[350px] mb-3 w-full text-main-color overflow-hidden">
                              <Image src={service.image} fill alt="Service images" className=" object-cover object-center" />
                          </div>
                          <Link href="" className="mt-3 font-merriweather text-main-color">{service.title}</Link>
                      </div>
                    </Reveal>
                ))
            }
        </div>
        <HorizontalLine />
    </section>
  )
}

export default Services;
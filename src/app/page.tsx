import Image from "next/image";
import { Cta, Hero, OurVision, Services, Testimonial, VisitUs } from "./_components";

export default function Home() {
  return (
   <div className="min-h-screen bg-primary-background">
    
      <Hero />
      <Services />
      <OurVision />
      <VisitUs />
      <Testimonial />
      <Cta />
      
     </div>
  );
}

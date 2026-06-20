import CategoriesSection from "@/Components/Home/CategoriesSection";
import CTASection from "@/Components/Home/CTASection";
import FeaturedLessons from "@/Components/Home/FeaturedLessons";
import HeroSection from "@/Components/Home/HeroSection";
import StatsSection from "@/Components/Home/StatsSection";
import TestimonialsSection from "@/Components/Home/TestimonialsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans ">
      <HeroSection></HeroSection>
      <StatsSection />
      <CategoriesSection />
      <FeaturedLessons />
      <TestimonialsSection></TestimonialsSection>
      <CTASection></CTASection>
    </div>
  );
}

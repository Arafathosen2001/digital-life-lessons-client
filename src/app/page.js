export const dynamic = "force-dynamic";

import CategoriesSection from "@/Components/Home/CategoriesSection";
import CTASection from "@/Components/Home/CTASection";
import FeaturedLessons from "@/Components/Home/FeaturedLessons";
import HeroSection from "@/Components/Home/HeroSection";
import StatsSection from "@/Components/Home/StatsSection";
import TestimonialsSection from "@/Components/Home/TestimonialsSection";
import { getLessons } from "@/lib/getData/data/lessons";
import { getServertSession } from "@/lib/getData/session/serverSesson";
import Image from "next/image";

export default async function Home() {
  const session =await getServertSession();
  const User= session?.user;
  // console.log(User)
  let lessons = [];
try {
  lessons = await getLessons();
} catch (err) {
  console.error("Error fetching lessons:", err);
  lessons = [];
}

  // console.log(lessons)

  const featuredLessons = (lessons || []).filter(
    (lesson) => lesson.featured && lesson.visibility === "public"
  );
  
  // console.log(featuredLessons)
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans ">
      <HeroSection User={User}></HeroSection>
      <StatsSection />
      <CategoriesSection />
      <FeaturedLessons featuredLessons={featuredLessons} />
      <TestimonialsSection></TestimonialsSection>
      <CTASection></CTASection>
    </div>
  );
}

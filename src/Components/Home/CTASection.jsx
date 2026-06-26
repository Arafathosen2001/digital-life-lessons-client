import { getServertSession } from "@/lib/getData/session/serverSesson";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function CTASection() {
  const sesson= await getServertSession();
  const user=sesson?.user;
  const isPremium=user?.isPremium;
  const admin=user?.role;
  // console.log(admin)
  return (
    <section className="py-28 px-6">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white blur-3xl"></div>
          </div>

          <div className="relative px-8 py-20 lg:px-20 text-center">
            <h2 className="text-4xl lg:text-6xl font-black text-white">
              Unlock Your Full Potential
            </h2>

            <p className="text-white/80 max-w-2xl mx-auto mt-6 text-lg">
              Join thousands of learners and gain access
              to premium life lessons, expert insights,
              and exclusive content.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {isPremium && admin == "admin" ? (<><h1 className="flex justify-center items-center px-3 rounded-full bg1  text-xs font-semibold text-white">
                 Alredy Premium ⭐
                </h1></>): (<Link
                href="/pricing"
                size="lg"
                color="default"
                className="flex items-center justify-center border bg1 text-gray-100 rounded-3xl px-5 py-2  hover:scale-105"
              ><FaArrowRight />
                Become Premium
              </Link>)}

              <Link
                href="/lessons"
                variant="bordered"
                size="lg"
                className="flex items-center justify-center border bg2 text-gray-100 rounded-3xl px-5 py-2  hover:scale-105"
              >
                Browse Lessons
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
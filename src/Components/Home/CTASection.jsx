import { Button } from "@heroui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CTASection() {
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
              <Button
                href="/premium"
                size="lg"
                color="default"
                endContent={<FaArrowRight />}
              >
                Become Premium
              </Button>

              <Button
                href="/lessons"
                variant="bordered"
                size="lg"
                className="text-white border-white"
              >
                Browse Lessons
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
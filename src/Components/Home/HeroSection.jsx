import { getServertSession } from "@/lib/getData/session/serverSesson";
import { Button, Link } from "@heroui/react";
// import hero from "../../../public/Image/hero.png"
import Image from "next/image";

export default function HeroSection({User}) {
  
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Learn. Reflect. Grow.
              <br />
              Life a Better Life.
            </h1>

            <p className="mt-5 max-w-md text-slate-500 text-lg">
              Discover powerful life lessons from real experiences
              and stories. Learn, reflect and grow every day.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              {!User ? (<><Link
                href="/auth/signin"
                variant="light"
                className="border bg1 text-gray-100 rounded-3xl px-5 py-2  hover:scale-105"
              >
                Pleass Login
              </Link></>):(<Link
                href="/lessons"
                color="primary"
                className="bg1 font-semibold border p-3"
              >
                Explore Lessons
              </Link>)}

              {/* <Link
                href="/premium"
                variant="bordered"
                className=" bg2 font-semibold border p-3"
              >
                Become Premium
              </Link> */}
            </div>

            {/* Stats */}

            <div className="grid grid-cols-4 gap-6 mt-14">
              <div>
                <h3 className="text-2xl font-bold ">
                  500+
                </h3>
                <p className="text-sm text-slate-500">
                  Life Lessons
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold ">
                  10K+
                </h3>
                <p className="text-sm text-slate-500">
                  Happy Learners
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold ">
                  50+
                </h3>
                <p className="text-sm text-slate-500">
                  Categories
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold ">
                  4.9★
                </h3>
                <p className="text-sm text-slate-500">
                  User Rating
                </p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}

          <div className="flex justify-center">
            <Image src={'/Image/hero.png'} width={500} height={300} alt="Digital Life Lessons" priority  ></Image>
            {/* <img
              src={hero}
              alt="Digital Life Lessons"
              className="w-full max-w-md"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
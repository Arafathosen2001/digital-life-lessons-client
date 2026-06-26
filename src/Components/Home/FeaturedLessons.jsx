import { getServertSession } from "@/lib/getData/session/serverSesson";
import Link from "next/link";
import { FaLock, FaArrowRight } from "react-icons/fa";



export default function FeaturedLessons({featuredLessons}) {
  const {session}=getServertSession();
const user=session?.user;
  return (
    <section className="py-28 from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-5">
        {/* heading */}

        <div className="text-center max-w-3xl mx-auto">
          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
            Featured Lessons
          </span>

          <h2 className="mt-6 text-5xl font-black ">
            Learn From Real Life Experiences
          </h2>

          <p className="mt-5 text-slate-500 text-lg">
            Carefully curated lessons designed to help you
            grow personally, professionally and financially.
          </p>
        </div>

        {/* cards */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">
          {featuredLessons?.map((lesson) => (
            <div
              key={lesson._id}
              className="group overflow-hidden rounded-[30px] border border-slate-200 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >
              {/* image */}

              <div className="relative h-72 overflow-hidden">
                <img
                  src={lesson.image || null}
                  alt={lesson.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className="absolute top-4 left-4 px-4 py-2 rounded-full  backdrop-blur text-sm font-semibold">
                  {lesson.category}
                </span>

                {lesson.accessLevel == "premium" && (
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      <FaLock />
                      Premium
                    </span>
                  </div>
                )}
              </div>

              {/* content */}

              <div className="p-6">
                <h3 className="text-xl font-bold leading-snug">
                  {lesson.title}
                </h3>

                <p className="mt-4 text-slate-500">
                  Discover practical strategies and real
                  experiences that can transform your life.
                </p>

                {lesson.accessLevel == "premium" && user?.isPremium === false ? (<><Link className="flex items-center justify-center border bg2 text-gray-100 rounded-3xl px-5 py-2  hover:scale-105" href={"/pricing"}>Upgrade</Link></>):
                      (<>
                      <Link href={`/lessons/${lesson._id}`} className="flex items-center justify-center border bg1 text-gray-100 rounded-3xl px-5 py-2  hover:scale-105">
                      Read Lesson →
                    </Link>
                      </>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
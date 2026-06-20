import { FaLock, FaArrowRight } from "react-icons/fa";

const lessons = [
  {
    id: 1,
    title: "Mastering Emotional Intelligence",
    category: "Mindset",
    premium: true,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200",
  },
  {
    id: 2,
    title: "Financial Freedom Blueprint",
    category: "Finance",
    premium: false,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200",
  },
  {
    id: 3,
    title: "Deep Work & Productivity",
    category: "Productivity",
    premium: true,
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
  },
  {
    id: 4,
    title: "Building Meaningful Relationships",
    category: "Relationships",
    premium: false,
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1200",
  },
];

export default function FeaturedLessons() {
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
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="group overflow-hidden rounded-[30px] border border-slate-200 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >
              {/* image */}

              <div className="relative h-72 overflow-hidden">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className="absolute top-4 left-4 px-4 py-2 rounded-full  backdrop-blur text-sm font-semibold">
                  {lesson.category}
                </span>

                {lesson.premium && (
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

                <button className="mt-6 flex items-center gap-3 font-semibold text-indigo-600">
                  Read Lesson
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
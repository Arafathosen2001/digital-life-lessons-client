"use client";

import { useMemo, useState } from "react";
import { Input } from "@heroui/react";
import {
  FaSearch,
  FaClock,
  FaLock,
} from "react-icons/fa";
import Link from "next/link";
import { useClientSession } from "@/lib/getData/session/session";

// const lessonsData = [
//   {
//     id: 1,
//     title: "The Power of Positive Thinking",
//     category: "Mindset",
//     difficulty: "Beginner",
//     premium: false,
//     views: 250,
//     createdAt: "2026-06-15",
//     duration: "5 min read",
//     image:
//       "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000",
//   },
//   {
//     id: 2,
//     title: "How to Build Discipline",
//     category: "Personal Growth",
//     difficulty: "Intermediate",
//     premium: true,
//     views: 980,
//     createdAt: "2026-06-12",
//     duration: "7 min read",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000",
//   },
//   {
//     id: 3,
//     title: "Overcoming Fear and Anxiety",
//     category: "Mental Health",
//     difficulty: "Beginner",
//     premium: false,
//     views: 700,
//     createdAt: "2026-06-10",
//     duration: "6 min read",
//     image:
//       "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1000",
//   },
//   {
//     id: 4,
//     title: "Financial Freedom for Beginners",
//     category: "Finance",
//     difficulty: "Advanced",
//     premium: true,
//     views: 1200,
//     createdAt: "2026-06-18",
//     duration: "8 min read",
//     image:
//       "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1000",
//   },
//   {
//     id: 5,
//     title: "Time Management Like a Pro",
//     category: "Productivity",
//     difficulty: "Intermediate",
//     premium: false,
//     views: 500,
//     createdAt: "2026-06-08",
//     duration: "5 min read",
//     image:
//       "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000",
//   },
//   {
//     id: 6,
//     title: "The Art of Letting Go",
//     category: "Life",
//     difficulty: "Beginner",
//     premium: false,
//     views: 400,
//     createdAt: "2026-06-11",
//     duration: "4 min read",
//     image:
//       "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1000",
//   },
// ];

export default function LessonsPageContent({lessonsData}) {
const {session}=useClientSession();
const user=session?.user;
// console.log(user?.isPremium)
 
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("latest");

  const filteredLessons = useMemo(() => {
    let data = [...lessonsData];

    data = data.filter((lesson) => {
      const matchSearch = lesson.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All"
          ? true
          : lesson.category === category;

      const matchDifficulty =
        difficulty === "All"
          ? true
          : lesson.emotionalTone === difficulty;

          const matchType = 
          type === "All" 
            ? true 
            : lesson.accessLevel?.toLowerCase() === type.toLowerCase();

      return (
        matchSearch &&
        matchCategory &&
        matchDifficulty &&
        matchType
      );
    });

    if (sort === "latest") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    if (sort === "popular") {
      data.sort((a, b) => b.views - a.views);
    }

    return data;
  }, [search, category, difficulty, type, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setDifficulty("All");
    setType("All");
    setSort("latest");
  };

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-10">

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">

          {/* Sidebar */}

          <aside className="  border border-slate-200 rounded-3xl p-6 h-fit">

            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">
                Filters
              </h2>

              <button
                onClick={resetFilters}
                className="text-sm text-slate-500 hover:text-black"
              >
                Reset
              </button>
            </div>

            {/* Category */}

            <div className="mt-8">
              <h3 className="font-semibold mb-4">
                Categories
              </h3>

              <div className="space-y-2">
                {[
                  "All",
                  "growth",
                  "career",
                  "relationship",
                  "mindset",
                  "mistakes",
                ].map((item,ind) => (
                  <button
                    key={ind}
                    onClick={() => setCategory(item)}
                    className={`w-full text-left rounded-xl px-4 py-3 transition ${
                      category === item
                        ? "bg-slate-900 text-white"
                        : "hover:bg-gray-50/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}

            <div className="mt-8">
              <h3 className="font-semibold mb-4">
                Difficulty
              </h3>

              <div className="space-y-2">
                {[
                  "All",
                  "motivational",
                  "sad",
                  "realization",
                  "gratitude",
                ].map((item,ind) => (
                  <button
                    key={ind}
                    onClick={() => setDifficulty(item)}
                    className={`w-full text-left rounded-xl px-4 py-3 transition ${
                      difficulty === item
                        ? "bg-slate-900 text-white"
                        : "hover:bg-gray-50/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}

            <div className="mt-8">
              <h3 className="font-semibold mb-4">
                Lesson Type
              </h3>

              <div className="space-y-2">
                {["All", "Free", "Premium"].map(
                  (item,ind) => (
                    <button
                      key={ind}
                      onClick={() => setType(item)}
                      className={`w-full text-left rounded-xl px-4 py-3 transition ${
                        type === item
                          ? "bg-slate-900 text-white"
                          : "hover:bg-gray-50/50"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </aside>

          {/* Content */}

          <div>

            {/* Top Bar */}

            <div className="border border-slate-200 rounded-3xl p-5 flex flex-col md:flex-row gap-4 justify-between">

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search lessons..."
                className="max-w-md"
              />

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="border border-slate-200 rounded-xl px-4"
              >
                <option value="latest" className="bg-gray-50/50">
                  Latest
                </option>

                <option value="popular" className="bg-gray-50/50">
                  Most Popular
                </option>
              </select>
            </div>

            {/* Result Count */}

            <div className="mt-6 text-slate-500">
              Showing {filteredLessons.length} lessons
            </div>

            {/* Cards */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">

              {filteredLessons.map((lesson) => (
                // console.log(lesson),
                <div
                  key={lesson._id}
                  className="  border border-slate-200 rounded-3xl overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative">

                    <img
                      src={lesson?.image || null}
                      alt={lesson.title}
                      className="h-56 w-full object-cover"
                    />

                    {lesson.accessLevel == "premium" && (
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-2 bg-amber-500 text-white text-xs px-3 py-2 rounded-full">
                          <FaLock />
                          Premium
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5">

                    <div className="flex items-center gap-2 justify-between flex-wrap">

                      <span className="border px-3 py-1 rounded-full text-xs">
                        {lesson.category}
                      </span>

                      <span className="border px-3 py-1 rounded-full text-xs text-red-500">
                        {lesson.emotionalTone}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl mt-4">
                      {lesson.title}
                    </h3>

                    <div className="flex items-center gap-2 text-slate-500 mt-4 mb-4 text-sm">
                      <FaClock />
                      {lesson.creatAt}
                    </div>
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
        </div>
      </div>
    </section>
  );
}
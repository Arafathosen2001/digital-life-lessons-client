"use client";

import {
  Button,
  Card,
  Avatar,
  Chip,
  Divider,
  Separator,
} from "@heroui/react";


import { FaBookmark, FaClock, FaFlag, FaHeart } from "react-icons/fa";

export default function LessonDetailsContent() {
  const lesson = {
    title: "The Power of Positive Thinking",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    category: "Mindset",
    emotionalTone: "Inspirational",
    readTime: "5 min read",
    accessLevel: "Free",
  };

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Main Content */}

      <div className="lg:col-span-3">
        <img
          src={lesson.image}
          alt=""
          className="w-full h-[400px] object-cover rounded-3xl"
        />

        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              {lesson.title}
            </h1>
          </div>

          <Button
            color="primary"
            variant="flat"
          >
            <FaBookmark size={18} />
            Add to Favorites
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <Chip>{lesson.category}</Chip>

          <Chip color="secondary">
            {lesson.emotionalTone}
          </Chip>

          <Chip
          >
            <FaClock size={14} />
            {lesson.readTime}
          </Chip>

          <Chip color="success">
            {lesson.accessLevel}
          </Chip>
        </div>

        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-bold mb-4">
            About This Lesson
          </h2>

          <p className="text-default-600 leading-8">
            Positive thinking is more than a feel-good
            attitude. It helps us overcome obstacles,
            maintain motivation and develop resilience
            during difficult times.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            What You Will Learn
          </h2>

          <ul className="space-y-3">
            <li>✓ Understand positive thinking</li>
            <li>✓ Build mental resilience</li>
            <li>✓ Improve daily productivity</li>
            <li>✓ Create better habits</li>
          </ul>
        </section>

        <Separator className="my-8" />

        {/* Actions */}

        <div className="flex flex-wrap gap-3">
          <Button
            color="danger"
            variant="flat"
          >
            <FaHeart size={18} />
            Like
          </Button>

          <Button
            variant="flat"
          >
            <FaBookmark size={18} />
            Save
          </Button>

          <Button
            color="warning"
            variant="flat"
          >
            <FaFlag size={18} />
            Report
          </Button>
        </div>

        {/* Comments */}

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Comments (24)
          </h2>

          <Card>
            <div>
              <div className="flex gap-3">
                <Avatar />

                <div>
                  <h4 className="font-semibold">
                    James Wilson
                  </h4>

                  <p className="text-sm text-default-500">
                    This lesson really helped me.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Sidebar */}

      <div className="space-y-6">
        <Card>
          <div>
            <h3 className="font-bold mb-4">
              About Author
            </h3>

            <div className="flex gap-3">
              <Avatar
                src="https://i.pravatar.cc/150?img=5"
                size="lg"
              />

              <div>
                <h4 className="font-semibold">
                  Sarah Johnson
                </h4>

                <p className="text-sm text-default-500">
                  12 Lessons
                </p>
              </div>
            </div>

            <Button
              className="mt-4"
              variant="flat"
              fullWidth
            >
              View Profile
            </Button>
          </div>
        </Card>

        <Card>
          <div>
            <h3 className="font-bold mb-4">
              Related Lessons
            </h3>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex gap-3"
                >
                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300"
                    alt=""
                    className="w-20 h-16 rounded-lg object-cover"
                  />

                  <p className="text-sm font-medium">
                    How to Build Discipline
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
"use client";

import {
  Card,
  CardBody,
  CardHeader,
} from "@heroui/react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardChart({ lessons }) {
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const dateString = date.toISOString().split("T")[0];

    const count = lessons.filter((lesson) => {
      if (!lesson.createdAt) return false;

      const lessonDate = new Date(lesson.createdAt)
        .toISOString()
        .split("T")[0];

      return lessonDate === dateString;
    }).length;

    last7Days.push({
      day,
      lessons: count,
    });
  }

  return (
    <Card
      shadow="sm"
      className="border border-default-200 h-full"
    >
      <Card.Header className="flex flex-col items-start">
        <h2 className="text-xl font-semibold">
          Weekly Lesson Activity
        </h2>

        <p className="text-default-500 text-sm">
          Lessons created in the last 7 days
        </p>
      </Card.Header>

      <Card.Body>
        <div className="h-[320px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={last7Days}>
              <defs>
                <linearGradient
                  id="colorLesson"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#006FEE"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="#006FEE"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
              />

              <XAxis dataKey="day" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="lessons"
                stroke="#006FEE"
                fill="url(#colorLesson)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
}
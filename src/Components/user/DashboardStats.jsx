"use client";

import { Card } from "@heroui/react";
import {
  FaBookOpen,
  FaHeart,
  FaClock,
  FaCrown,
} from "react-icons/fa6";

export default function DashboardStats({
    totalLessons,
    totalSaved,
    totalRecent,
    premium,
}) {
  const stats = [
    {
      title: "Total Lessons",
      value: totalLessons,
      icon: FaBookOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Saved Lessons",
      value: totalSaved,
      icon: FaHeart,
      color: "text-danger",
      bg: "bg-danger/10",
    },
    {
        title: "Recently Added",
        value: totalRecent,
        icon: FaClock,
        color: "text-warning",
        bg: "bg-warning/10",
      },
    {
      title: "Premium",
      value: premium ? "Active" : "Free",
      icon: FaCrown,
      color: premium ? "text-success" : "text-default-500",
      bg: premium ? "bg-success/10" : "bg-default-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <Card
            key={index}
            shadow="sm"
            className="border border-default-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-sm text-default-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center ${item.bg}`}
              >
                <Icon
                  className={`${item.color} text-2xl`}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
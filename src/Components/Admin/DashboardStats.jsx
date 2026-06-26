"use client";

import { Card } from "@heroui/react";
import {
  FaUsers,
  FaBookOpen,
  FaFlag,
  FaPlusCircle,
} from "react-icons/fa";

export default function DashboardStats({ stats }) {
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <FaUsers size={22} />,
    },
    {
      title: "Public Lessons",
      value: stats?.totalLessons || 0,
      icon: <FaBookOpen size={22} />,
    },
    {
      title: "Reported Lessons",
      value: stats?.totalReports || 0,
      icon: <FaFlag size={22} />,
    },
    {
      title: "Today's Lessons",
      value: stats?.todayLessons || 0,
      icon: <FaPlusCircle size={22} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <Card.Content className="p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-default-500 text-sm">
                  {card.title}
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {card.value}
                </h3>
              </div>

              <div className="text-primary">
                {card.icon}
              </div>
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
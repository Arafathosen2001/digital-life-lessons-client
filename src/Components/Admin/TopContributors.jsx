"use client";

import { Card, Avatar } from "@heroui/react";
import { FaTrophy } from "react-icons/fa";

export default function TopContributors({ contributors = [] }) {
  return (
    <Card>
      <Card.Content className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <FaTrophy className="text-warning" />
          <h2 className="text-xl font-bold">
            Most Active Contributors
          </h2>
        </div>

        <div className="space-y-4">
          {contributors.map((user, index) => (
            <div
              key={user._id}
              className="flex items-center justify-between border border-default-200 rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <div className="font-bold text-lg min-w-[30px]">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `#${index + 1}`}
                </div>

                <Avatar
                  name={user.name}
                  size="sm"
                />

                <div>
                  <p className="font-semibold">
                    {user.name}
                  </p>

                  <p className="text-xs text-default-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  {user.lessonCount}
                </p>

                <p className="text-xs text-default-500">
                  Lessons
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
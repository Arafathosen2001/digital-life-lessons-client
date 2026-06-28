"use client";

import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@heroui/react";

import {
  FaPlus,
  FaBookOpen,
  FaHeart,
  FaUser,
} from "react-icons/fa6";

const actions = [
  {
    title: "Add Lesson",
    description: "Create a new life lesson",
    href: "/dashboard/add-lesson",
    icon: FaPlus,
    color: "primary",
  },
  {
    title: "My Lessons",
    description: "Manage your lessons",
    href: "/dashboard/my-lessons",
    icon: FaBookOpen,
    color: "success",
  },
  {
    title: "My Favorites",
    description: "Saved lessons",
    href: "/dashboard/my-favorites",
    icon: FaHeart,
    color: "danger",
  },
  {
    title: "Profile",
    description: "View your profile",
    href: "/dashboard/profile",
    icon: FaUser,
    color: "secondary",
  },
];

export default function QuickActions() {
  return (
    <Card
      shadow="sm"
      className="border border-default-200 h-full"
    >
      <Card.Header>
        <div>
          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>

          <p className="text-sm text-default-500">
            Jump to your most used pages
          </p>
        </div>
      </Card.Header>

      <Card.Body className="gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.title}
              as={Link}
              href={action.href}
              color={action.color}
              variant="flat"
              className="h-auto p-4 justify-start"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="text-xl">
                  <Icon />
                </div>

                <div className="text-left">
                  <p className="font-semibold">
                    {action.title}
                  </p>

                  <p className="text-xs opacity-70">
                    {action.description}
                  </p>
                </div>
              </div>
            </Button>
          );
        })}
      </Card.Body>
    </Card>
  );
}
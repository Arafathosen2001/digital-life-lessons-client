"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Button } from "@heroui/react";
import {
  HiHome,
  HiPlus,
  HiBookOpen,
  HiHeart,
  HiUser,
  HiOutlineBars3,
} from "react-icons/hi2";
import { useClientSession } from "@/lib/getData/session/session";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const { session } = useClientSession();

  // demo user (later replace with Better Auth)
  // const user = {
  //   name: "Arafat Hosen",
  //   role: "user", // or admin
  //   image: "https://i.pravatar.cc/150?img=3",
  //   isPremium: false,
  // };
  const user = session?.user;

  const menu = [
    { name: "Home", href: "/dashboard", icon: HiHome },
    { name: "Add Lesson", href: "/dashboard/add-lesson", icon: HiPlus },
    { name: "My Lessons", href: "/dashboard/my-lessons", icon: HiBookOpen },
    { name: "Favorites", href: "/dashboard/my-favorites", icon: HiHeart },
    { name: "Profile", href: "/dashboard/profile", icon: HiUser },
  ];

  const adminMenu = [
    { name: "Admin Home", href: "/dashboard/admin", icon: HiHome },
    { name: "Users", href: "/dashboard/admin/manage-users" },
    { name: "Lessons", href: "/dashboard/admin/manage-lessons" },
    { name: "Reports", href: "/dashboard/admin/reported-lessons" },
    { name: "Profile", href: "/dashboard/profile" },
  ];

  const isAdmin = user?.role === "admin";

  const finalMenu = isAdmin ? adminMenu : menu;

  return (
    <div className="flex min-h-screen ">

      {/* Sidebar */}
      <aside
        className={`${open ? "w-64" : "w-20"
          } transition-all duration-300 border-r border-white/10 bg-black/30 backdrop-blur-xl p-4`}
      >
        {/* top */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold">
            {open && "Dashboard"}
          </h1>

          <button onClick={() => setOpen(!open)}>
            <HiOutlineBars3 />
          </button>
        </div>

        {/* user */}
        <div className="flex items-center gap-3 mb-6">
          <Avatar>
            <Avatar.Image alt="John Doe" src={user?.image} />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          {open && (
            <div>
              <p className="text-sm font-semibold">
                {user?.name}
              </p>
              <p className="text-xs opacity-60">
                {user?.role}
              </p>
            </div>
          )}
        </div>

        {/* menu */}
        <nav className="space-y-2">
          {finalMenu.map((item, i) => {
            const Icon = item.icon || HiHome;

            return (
              <Link
                key={i}
                href={item.href}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition"
              >
                <Icon className="text-lg" />
                {open && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
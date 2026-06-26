"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar } from "@heroui/react";
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

  const pathname = usePathname();

  const { session } = useClientSession();
  const user = session?.user;

  const menu = [
    {
      name: "Home",
      href: "/dashboard",
      icon: HiHome,
    },
    {
      name: "Add Lesson",
      href: "/dashboard/add-lesson",
      icon: HiPlus,
    },
    {
      name: "My Lessons",
      href: "/dashboard/my-lessons",
      icon: HiBookOpen,
    },
    {
      name: "Favorites",
      href: "/dashboard/my-favorites",
      icon: HiHeart,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: HiUser,
    },
  ];

  const adminMenu = [
    {
      name: "Admin Home",
      href: "/dashboard/admin",
      icon: HiHome,
    },
    {
      name: "Users",
      href: "/dashboard/admin/manage-users",
      icon: HiUser,
    },
    {
      name: "Lessons",
      href: "/dashboard/admin/manage-lessons",
      icon: HiBookOpen,
    },
    {
      name: "Reports",
      href: "/dashboard/admin/reported-lessons",
      icon: HiHeart,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: HiUser,
    },
  ];

  const isAdmin = user?.role === "admin";
 

  const finalMenu = isAdmin ? (adminMenu) : (menu);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-72" : "w-20"
        } transition-all duration-300 border-r border-white/10 bg-white/5 backdrop-blur-xl p-4 sticky top-0 h-screen`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {open && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl hover:bg-white/10"
          >
            <HiOutlineBars3 size={22} />
          </button>
        </div>

        {/* User */}
        <div className="mb-8 py-3 px-1 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
          <Avatar>
                    <Avatar.Image alt={user?.name || "User"} src={user?.image} />
                    <Avatar.Fallback>
                      {user?.name ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "U"}
                    </Avatar.Fallback>
                  </Avatar>

            {open && (
              <div>
                <h3 className="font-semibold">
                  {user?.name}
                </h3>

                <p className="text-xs text-slate-400 capitalize">
                  {user?.role}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {finalMenu.map((item) => {
            const Icon = item.icon;

            const isActive = (() => {
              if (
                item.href === "/dashboard" ||
                item.href === "/dashboard/admin"
              ) {
                return pathname === item.href;
              }
            
              return pathname.startsWith(item.href);
            })();

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                  
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/20"
                      : "hover:bg-white/10 text-slate-300"
                  }
                `}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-white" />
                )}

                <Icon size={20} />

                {open && (
                  <span className="font-medium">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
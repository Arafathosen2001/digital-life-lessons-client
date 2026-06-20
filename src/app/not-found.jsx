"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { HiArrowLeft, HiHome } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 text-white px-4">

      <div className="text-center max-w-md">

        {/* Big 404 */}
        <h1 className="text-7xl font-black bg-gradient-to-r from-violet-400 to-pink-500 text-transparent bg-clip-text">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-bold mt-4">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-sm opacity-70 mt-2">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Decorative card */}
        <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          <p className="text-sm opacity-80">
            “Even the best learners get lost sometimes. Let’s take you back home.”
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center mt-6">
          <Link
            href="/"
            color="primary"
            className="flex justify-center items-center border rounded-2xl p-4 hover:text-pink-500"
            >
                <HiHome />
            Go Home
          </Link>

          <Link
            href="/dashboard"
            variant="flat"
            className="flex justify-center items-center border rounded-2xl p-4 hover:text-pink-500"
            >
                <HiArrowLeft />
            Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button, Avatar } from "@heroui/react";
import {
  HiBars3,
  HiXMark,
  HiChevronDown,
} from "react-icons/hi2";
import logo from "../../public/Image/logo.png"
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useClientSession } from "@/lib/getData/session/session";

export default function AppNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {session,isPending}=useClientSession();
  // console.log(session)

  // 👉 outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Replace with Better Auth session
  const user = session?.user;


  // const user = {
  //   name: "Arafat Hosen",
  //   image: "https://i.pravatar.cc/150?img=3",
  //   isPremium: false,
  // };

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Public Lessons",
      href: "/lessons",
    },
    {
      label: "About Us",
      href: "/about",
    },
  ];

  if (user) {
    navItems.push(
      {
        label: "Add Lesson",
        href: "/dashboard/add-lesson",
      },
      {
        label: "My Lessons",
        href: "/dashboard/my-lessons",
      }
    );


  }
  const route=useRouter();
  const handelLogout=async()=>{
    await authClient.signOut();
    alert('Sign Out Successfull')
    route.push('/auth/signin')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-default-200 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        {/* Logo */}

        <Link
          href="/"
          className="flex justify-center items-center text-xl font-black md:text-2xl"
        ><Image alt="logo" src={logo} width={70} height={70}></Image>
          Digital Life Lessons
        </Link>

        {/* Desktop Menu */}

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-medium transition hover:opacity-70"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}

        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link
                href="/auth/signin"
                variant="light"
                className="border bg1 text-gray-100 rounded-3xl px-5 py-2  hover:scale-105"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                color="primary"
                className="border bg2 text-gray-100 rounded-3xl px-5 py-2  hover:scale-105"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {user?.isPremium ? (
                <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
                  Premium ⭐
                </span>
              ) :
                (
                  <Link className="border bg2 text-gray-100 rounded-3xl px-5 py-2  hover:scale-105" href={"/pricing"}>Upgrade</Link>
                  // navItems.push({
                  //   label: "Upgrade",
                  //   href: "/pricing",
                  // })
                )}

              <div className="relative" ref={dropdownRef}>

                {/* Avatar button */}
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Avatar>
                    <Avatar.Image alt="John Doe" src={user?.image} />
                    <Avatar.Fallback>JD</Avatar.Fallback>
                  </Avatar>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 top-14 w-60 rounded-xl bg-gray-900 border border-default-200 p-2 shadow-lg text-white">

                    <div className="border-b border-default-100 p-3">
                      <p className="font-semibold">{user.name}</p>
                    </div>

                    <Link
                      href="/dashboard/profile"
                      className="block rounded-lg px-3 py-2 hover:bg-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      href="/dashboard"
                      className="block rounded-lg px-3 py-2 hover:bg-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button onClick={handelLogout} className="w-full rounded-lg px-3 py-2 text-left text-danger hover:bg-danger/10 cursor-pointer">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden"
        >
          {menuOpen ? (
            <HiXMark size={28} />
          ) : (
            <HiBars3 size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="border-t border-default-200 md:hidden">
          <div className="space-y-2 p-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-3 hover:bg-default-100"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                {item.label}
              </Link>
            ))}

            {!user ? (
              <div className="mt-4 flex flex-col gap-3">
                <Button
                  as={Link}
                  href="/login"
                  variant="flat"
                >
                  Login
                </Button>

                <Button
                  as={Link}
                  href="/register"
                  color="primary"
                >
                  Signup
                </Button>
              </div>
            ) : (
              <div className="mt-4 border-t border-default-200 pt-4">
                <Link
                  href="/dashboard"
                  className="block rounded-lg px-3 py-3 hover:bg-default-100"
                >
                  Dashboard
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="block rounded-lg px-3 py-3 hover:bg-default-100"
                >
                  Profile
                </Link>

                <button className="w-full rounded-lg px-3 py-3 text-left text-danger hover:bg-danger/10">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
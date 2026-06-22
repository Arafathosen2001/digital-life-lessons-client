"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { FiMenu, FiX, FiBookOpen, FiUser } from "react-icons/fi";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    // পরে Better Auth থেকে আসবে
    const user = null;
    const isAdmin = false;

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Lessons", href: "/lessons" },
        { name: "Pricing", href: "/pricing" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-default-200 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                        <FiBookOpen size={18} />
                    </div>
                    <span className="font-bold text-lg">
                        Digital Life Lessons
                    </span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-default-600 hover:text-primary transition"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {user && (
                        <Link
                            href={isAdmin ? "/admin" : "/dashboard"}
                            className="text-sm font-medium text-default-600 hover:text-primary"
                        >
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Right Side */}
                <div className="hidden md:flex items-center gap-3">

                    {!user ? (
                        <>
                            <Link href="/auth/signin" variant="light">
                                Login
                            </Link>

                            <Button as={Link} href="/register" color="primary">
                                Get Started
                            </Button>
                        </>
                    ) : (
                        <Button
                            as={Link}
                            href="/dashboard"
                            variant="flat"
                            startContent={<FiUser />}
                        >
                            Profile
                        </Button>
                    )}
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t border-default-200 px-4 py-4 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block text-sm font-medium text-default-700"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {user && (
                        <Link
                            href="/dashboard"
                            onClick={() => setOpen(false)}
                            className="block text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                    )}

                    {!user ? (
                        <div className="flex flex-col gap-2 pt-2">
                            <Button as={Link} href="/login" variant="flat">
                                Login
                            </Button>
                            <Button as={Link} href="/register" color="primary">
                                Get Started
                            </Button>
                        </div>
                    ) : (
                        <Button as={Link} href="/dashboard" color="primary">
                            Dashboard
                        </Button>
                    )}
                </div>
            )}
        </header>
    );
}
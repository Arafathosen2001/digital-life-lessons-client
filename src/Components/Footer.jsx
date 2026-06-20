import Link from "next/link";
import logo from "../../public/Image/logo.png"
import {
    FaFacebook,
    FaGithub,
    FaLinkedin,
    FaBookOpen,
} from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white">
            <div className="max-w-7xl mx-auto px-5 py-14">
                <div className="grid md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 text-2xl font-bold">
                        <Image alt="logo" src={logo} width={70} height={70}></Image>
                            <span>Digital Life Lessons</span>
                        </div>

                        <p className="mt-4 text-slate-400">
                            Learn practical life skills, personal growth,
                            productivity, and success habits from curated
                            lessons designed to improve your everyday life.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3 text-slate-400">
                            <Link href="/">Home</Link>
                            <Link href="/lessons">Lessons</Link>
                            <Link href="/pricing">Pricing</Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Resources
                        </h3>

                        <div className="flex flex-col gap-3 text-slate-400">
                            <Link href="/dashboard">
                                Dashboard
                            </Link>

                            <Link href="/favorites">
                                Favorites
                            </Link>

                            <Link href="/reports">
                                Reports
                            </Link>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Connect
                        </h3>

                        <div className="flex gap-4 text-2xl">
                            <a href="#">
                                <FaFacebook />
                            </a>

                            <a href="#">
                                <FaGithub />
                            </a>

                            <a href="#">
                                <FaLinkedin />
                            </a>
                        </div>

                        <p className="mt-5 text-slate-400">
                            Email:
                            support@digitallifelessons.com
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500">
                    © {new Date().getFullYear()} Digital Life Lessons.
                    All rights reserved.
                </div>
            </div>
        </footer>
    );
}
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

export default function Footer2() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="container mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 gap-10">

          <div>
            <h2 className="text-3xl font-black">
              Digital Life Lessons
            </h2>

            <p className="mt-5 text-gray-400">
              Empowering people through real-world
              experiences and practical wisdom.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              Quick Links
            </h3>

            <div className="space-y-3">
              <Link href="/">Home</Link>
              <br />
              <Link href="/lessons">Lessons</Link>
              <br />
              <Link href="/premium">Premium</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              Resources
            </h3>

            <div className="space-y-3">
              <Link href="/faq">FAQ</Link>
              <br />
              <Link href="/contact">Contact</Link>
              <br />
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4 text-2xl">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
              <FaLinkedin />
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-400">
          © 2026 Digital Life Lessons. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
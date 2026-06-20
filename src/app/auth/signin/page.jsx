"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { HiLockClosed, HiEnvelope } from "react-icons/hi2";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* floating background blobs */}
      <div className="absolute w-72 h-72 bg-purple-500/30 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-blue-500/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      {/* card */}
      <Card className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl">

        <div className="space-y-6 p-8">

          {/* header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">
              Welcome Back
            </h1>
            <p className="text-sm text-white/60">
              Login to continue your journey 🚀
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* email */}
            <div className="relative">
              <HiEnvelope className="absolute left-3 top-3 text-white/50" />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>

            {/* password */}
            <div className="relative">
              <HiLockClosed className="absolute left-3 top-3 text-white/50" />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>

            {/* button */}
            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold"
              isLoading={loading}
            >
              Sign In
            </Button>

          </form>

          {/* footer */}
          <p className="text-center text-sm text-white/60">
            Don’t have an account?{" "}
            <Link href="/auth/register" className="text-blue-400 font-medium">
              Create account
            </Link>
          </p>

        </div>

      </Card>

    </div>
  );
}
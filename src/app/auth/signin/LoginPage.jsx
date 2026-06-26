"use client";

import React, { useEffect, useState } from "react";
import { Input, Button, Card, Link } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "../../../../public/Image/logo.png"
import Image from "next/image";
import { toast } from "react-toastify";


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  useEffect(() => {
    const messg= searchParams.get("message");

    if (messg === "login-required") {
      toast.error("Please login first!");
    }
  }, [searchParams]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: true,
      });

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Invalid email or password.",
        });
      } else {
        setMessage({
          type: "success",
          text: "Login successful! Redirecting...",
        });

        setTimeout(() => {
          router.push(redirectTo);
        }, 1200);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });

      if (error) {
        setMessage({
          type: "error",
          text: error.message || "Google sign-in failed",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Something went wrong with Google login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 px-4 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute w-96 h-96 bg-violet-600/20 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-purple-600/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      <Card className="w-full max-w-md p-8 border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20 text-2xl">
            {logo ? (<Image alt="logo" src={logo} width={70} height={70}></Image>) : ('📘')}
          </div>

          <h1 className="mt-5 text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-5 text-sm rounded-xl border p-3 ${message.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-green-500/10 border-green-500/20 text-green-400"
              }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-5">

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            variant="bordered"
            size="lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            variant="bordered"
            size="lg"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full"
          />

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-violet-400 hover:text-violet-300"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full font-semibold rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:scale-[1.02] transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="h-px flex-1 bg-white/10" />
          <span className="px-4 text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google Button (UI only) */}
        <Button
          onClick={handleGoogleSignIn}
          isDisabled={loading}
          className="w-full rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
        >
          Continue with Google
        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            href={`/auth/register?redirect=${redirectTo}`}
            className="text-violet-400 font-medium"
          >
            Create account
          </Link>
        </p>
      </Card>
    </div>
  );
}
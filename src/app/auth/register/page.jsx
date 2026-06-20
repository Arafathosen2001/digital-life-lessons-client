"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input, Button, Card, Spinner } from "@heroui/react";
import { HiLockClosed, HiUser, HiEnvelope } from "react-icons/hi2";
import { FiUploadCloud } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Clean up the image preview URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle Input Changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      if (preview) URL.revokeObjectURL(preview); // Free memory
      setPreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: "" }); // Clear image error
    }
  };

  // Form Validation
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password = "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
    }

    if (!imageFile) {
      newErrors.image = "Profile image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Image Upload to ImgBB
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Image upload failed");

    const data = await res.json();
    return data.data.url;
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true); // লোডিং শুরু
    try {
      let uploadedImageUrl = "";
      if (imageFile) {
        uploadedImageUrl = await uploadImage(imageFile);
      }

      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: uploadedImageUrl,
        callbackURL: "/",
      }, {
        body: {
          isPremium: "false" // কাস্টম ফিল্ড Better-Auth এর জন্য
        }
      });

      if (error) throw new Error(error.message);

      if (data) {
        alert("Account Created 🚀");
        setForm({ name: "", email: "", password: "" });
        setImageFile(null);
        setPreview("");
        setErrors({});
      }
    } catch (err) {
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false); // কাজ শেষ হলে লোডিং বন্ধ
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black text-white">
      {/* Floating background blobs */}
      <div className="absolute w-72 h-72 bg-purple-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse pointer-events-none" />
      <div className="absolute w-72 h-72 bg-blue-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse pointer-events-none" />

      <Card className="w-full max-w-md border border-white/10 p-6 bg-zinc-900/50 backdrop-blur-md">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r flow-root from-white to-gray-400 bg-clip-text text-transparent">
            Create Account 🚀
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <Input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              startcontent={<HiUser className="text-gray-400" />}
              invalid={!!errors.name}
              errormessage={errors.name}
              variant="bordered"
              className="w-full"
            />

            {/* EMAIL */}
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              startcontent={<HiEnvelope className="text-gray-400" />}
              invalid={!!errors.email}
              errormessage={errors.email}
              variant="bordered"
              className="w-full"
            />

            {/* PASSWORD */}
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              startcontent={<HiLockClosed className="text-gray-400" />}
              invalid={!!errors.password}
              errormessage={errors.password}
              variant="bordered"
              className="w-full"
            />

            {/* IMAGE UPLOAD CONTAINER */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Profile Picture</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center border border-dashed border-white/20 rounded-xl bg-zinc-800 overflow-hidden shrink-0">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FiUploadCloud className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                <label className="flex-1 flex flex-col items-center justify-center h-16 border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-zinc-800/50 transition">
                  <span className="text-sm text-gray-400">Choose Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.image && (
                <p className="text-xs text-danger font-medium mt-1">{errors.image}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              color="primary"
              className="w-full font-semibold mt-2"
              isLoading={loading}      // লোডিং স্পিনার দেখাবে
              isDisabled={loading}     // লোডিং চলাকালীন বাটন ক্লিক বন্ধ থাকবে
            >
              {loading ? <div className="flex items-center gap-2">
    <Spinner color="current" size="sm" />
    <span>Loading...</span>
  </div>: "Sign Up"}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-400 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
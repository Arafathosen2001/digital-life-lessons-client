"use client";

import { useState, useEffect } from "react";
import { useClientSession } from "@/lib/getData/session/session";
// মনে করে আপনার প্রজেক্টের সঠিক better-auth ক্লায়েন্ট পাথটি ইমপোর্ট করবেন
import { authClient } from "@/lib/auth-client"; 
import { Avatar, Card, Input, Button } from "@heroui/react";
import Link from "next/link";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { session, isPending: isSessionPending } = useClientSession();
  const user = session?.user;
  const route=useRouter()
  // ইনপুট স্টেটসমূহ
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(""); // নতুন ছবির প্রিভিউ দেখানোর জন্য
  const [isUpdating, setIsUpdating] = useState(false);

  // সেশন লোড হলে ইনপুটে ডিফল্ট ভ্যালু সেট করার জন্য
  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setPreviewUrl(user?.image || ""); // আগে থেকে থাকা ইমেজ প্রিভিউতে সেট হবে
    }
  }, [user]);

  // ফাইল সিলেক্ট করলে প্রিভিউ দেখানোর ফাংশন
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // লোকাল প্রিভিউ জেনারেট করবে
    }
  };

  // ImgBB-তে ইমেজ আপলোড করার ফাংশন
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
    return data.data.url; // আপলোড হওয়া ইমেজের ডিরেক্ট URL রিটার্ন করবে
  };

  // প্রোফাইল আপডেট ফাংশন
  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }

    try {
      setIsUpdating(true);
      let finalImageUrl = user?.image || "";

      // যদি ইউজার নতুন কোনো ফাইল সিলেক্ট করে, তবেই ImgBB তে আপলোড হবে
      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile);
      }
      
      // Better-Auth এর মাধ্যমে ইউজার ডাটা আপডেট
      const { data, error } = await authClient.updateUser({
        name: name,
        image: finalImageUrl || "",
    });
      if(data){

              toast.success("Profile updated successfully!");
              route.refresh(); 
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isSessionPending) {
    return <div className="text-center mt-10 text-white">Loading session...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-md">
          {/* একটি সুন্দর লক বা ইউজার আইকন (ঐচ্ছিক, দেখতে ভালো লাগবে) */}
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🔒
          </div>
          
          <h2 className="text-xl font-semibold text-white mb-2">
            Access Denied
          </h2>
          
          <p className="text-white/60 text-sm mb-6">
            Please log in to view your profile and manage your account settings.
          </p>
  
          {/* HeroUI Button এর সাথে Next.js Link এর কম্বিনেশন */}
          <Button 
            
            color="primary" 
            variant="solid" 
            className="w-full font-medium border bg1"
          >
            <Link href="/auth/signin?redirect=/" >Log In Now</Link>
            
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Card className="bg-white/5 border border-white/10 p-6">
        <div className="flex flex-col items-center gap-4">
          
          {/* প্রোফাইল ইমেজ ভিউ (নতুন ছবি সিলেক্ট করলে সাথে সাথে আপডেট প্রিভিউ দেখাবে) */}
          <Avatar className="w-24 h-24 text-large">
            <Avatar.Image alt={user.name || "User"} src={previewUrl} />
            <Avatar.Fallback>
              {user?.name ? user?.name.substring(0, 2).toUpperCase() : "US"}
            </Avatar.Fallback>
          </Avatar>

          <div className="text-center">
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="opacity-60">{user?.email}</p>

            {user.premium && (
              <span className="text-yellow-400 text-sm block mt-1">
                Premium ⭐
              </span>
            )}
          </div>

          {/* প্রোফাইল আপডেট ফর্ম */}
          <div className="w-full space-y-4 mt-4">
            {/* নাম পরিবর্তনের ইনপুট */}
            <Input 
              label="Update Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="bordered"
              className={"w-full"}
            />
            
            {/* ফাইল সিলেক্ট করার ইনপুট */}
            <Input 
              type="file"
              label="Select Profile Photo" 
              placeholder="Choose an image"
              accept="image/*"
              onChange={handleFileChange}
              variant="bordered"
              className={"w-full"}
            />

            {/* আপডেট বাটন */}
            <Button 
              color="primary" 
              className="w-full"
              isLoading={isUpdating}
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
          </div>

        </div>
      </Card>
    </div>
  );
}
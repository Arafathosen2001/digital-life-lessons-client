"use client";

import { Avatar, Card,Input, Button } from "@heroui/react";

export default function ProfilePage() {
  const user = {
    name: "Arafat Hosen",
    email: "arafat@example.com",
    image: "https://i.pravatar.cc/150?img=3",
    premium: true,
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Card className="bg-white/5 border border-white/10">
        <div className="flex flex-col items-center gap-4">

          <Avatar src={user.image} size="lg" />

          <div className="text-center">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="opacity-60">{user.email}</p>

            {user.premium && (
              <span className="text-yellow-400 text-sm">
                Premium ⭐
              </span>
            )}
          </div>

          <div className="w-full space-y-3 mt-4">
            <Input label="Update Name" />
            <Input label="Update Photo URL" />

            <Button color="primary" className="w-full">
              Update Profile
            </Button>
          </div>

        </div>
      </Card>

    </div>
  );
}
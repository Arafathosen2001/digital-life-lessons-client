"use client";

import { useState } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Label,
  Description,
  ListBox,
} from "@heroui/react";

export default function AddLessonPage() {
  const [loading, setLoading] = useState(false);

  // আসল কোডে useUser() বা useAuth() থেকে নেবে
  const isPremium = false;

  const categories = [
    { id: "growth", label: "Personal Growth" },
    { id: "career", label: "Career" },
    { id: "relationship", label: "Relationships" },
    { id: "mindset", label: "Mindset" },
    { id: "mistakes", label: "Mistakes Learned" },
  ];

  const tones = [
    { id: "motivational", label: "Motivational" },
    { id: "sad", label: "Sad" },
    { id: "realization", label: "Realization" },
    { id: "gratitude", label: "Gratitude" },
  ];

  const accessLevels = [
    { id: "free", label: "Free" },
    { id: "premium", label: "Premium 🔒" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const lessonData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      emotionalTone: formData.get("emotionalTone"),
      accessLevel: isPremium ? formData.get("accessLevel") : "free",
      visibility: "public",
      createdAt: new Date().toISOString(),
    };

    // Image আলাদা handle করতে হবে (imgbb / cloudinary)
    const imageFile = formData.get("image");

    console.log("Lesson Data:", lessonData);
    console.log("Image File:", imageFile);

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });

      const data = await res.json();
      console.log("Saved:", data);
      // toast.success("Lesson created!") — react-hot-toast বা sonner দিয়ে
    } catch (err) {
      console.error("Error:", err);
      // toast.error("Something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 p-6">
      <h1 className="text-2xl font-bold">Add New Lesson</h1>

      <Form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <Input
          name="title"
          aria-label="Lesson Title"
          placeholder="What did you learn?"
          required={true}
        />

        {/* Description */}
        <TextArea
          name="description"
          aria-label="Full Description / Story"
          className="w-full h-36"
          placeholder="Share your insight or experience..."
          required={true}
        />

        {/* Category */}
        <Select name="category" required={true}>
          <Label>Category</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {categories.map((item) => (
                <ListBox.Item key={item.id} id={item.id}>
                  <Label>{item.label}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Emotional Tone */}
        <Select name="emotionalTone" required={true}>
          <Label>Emotional Tone</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {tones.map((item) => (
                <ListBox.Item key={item.id} id={item.id}>
                  <Label>{item.label}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Image Upload */}
        <Input
          type="file"
          name="image"
          aria-label="Image (optional)"
          accept="image/*"
        />

        {/* Access Level */}
        <Select name="accessLevel" isDisabled={!isPremium}>
          <Label>Access Level</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Description>
            {!isPremium
              ? "Upgrade to Premium to create paid lessons."
              : "Choose who can view this lesson."}
          </Description>
          <Select.Popover>
            <ListBox>
              {accessLevels.map((item) => (
                <ListBox.Item
                  key={item.id}
                  id={item.id}
                  isDisabled={item.id === "premium" && !isPremium}
                >
                  <Label>{item.label}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Submit */}
        <Button
          type="submit"
          color="primary"
          className="w-full"
          isLoading={loading}
        >
          Create Lesson
        </Button>

      </Form>
    </div>
  );
}

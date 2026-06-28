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
  Spinner,
} from "@heroui/react";
import { useClientSession } from "@/lib/getData/session/session";
import toast from "react-hot-toast";

export default function AddLessonPage() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [accessLevel, setAccessLevel] = useState("free");
  const { session } = useClientSession();
  const user = session?.user;
  // console.log(user)

  const isPremium = user?.isPremium;

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const uploadImage = async (file) => {
    if (!file || file.size === 0) return null;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image");

    try {
      let imageUrl = "";
      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }

      const lessonData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        emotionalTone: formData.get("emotionalTone"),
        accessLevel: isPremium ? accessLevel : "free",
        visibility: "public",
        image: imageUrl,
        userId: user?.id || user?._id,
        author:user?.name
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });

      if (!res.ok) throw new Error("Failed to save lesson");

      const data = await res.json();
      if(data){
        toast.success('Leson Add Successfull')
      }
      // console.log("Saved Successfully:", data);

      e.target.reset();
      setImagePreview(null);

    } catch (err) {
      console.error("Error:", err);
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
        <Select name="category" aria-label="Select Category" required={true}>
          <Label id="category-label">Category</Label>
          <Select.Trigger aria-labelledby="category-label">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox aria-labelledby="category-label">
              {categories.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.label}>
                  <Label>{item.label}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Emotional Tone */}
        <Select name="emotionalTone" aria-label="Select Emotional Tone" required={true}>
          <Label id="tone-label">Emotional Tone</Label>
          <Select.Trigger aria-labelledby="tone-label">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox aria-labelledby="tone-label">
              {tones.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.label}>
                  <Label>{item.label}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Image Upload & Preview */}
        <div className="space-y-2">
          <Input
            type="file"
            name="image"
            aria-label="Upload Lesson Image (Optional)"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <div className="relative w-40 h-40 border rounded-lg overflow-hidden mt-2 bg-gray-50">
              <img
                src={imagePreview}
                alt="Selected Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Access Level */}
        <Select
          name="accessLevel"
          aria-label="Select Access Level"
          isDisabled={!isPremium}
          selectedKey={accessLevel} // স্টেট দিয়ে কন্ট্রোল করা
          onSelectionChange={(key) => setAccessLevel(key)} // সিলেক্ট করলে স্টেট আপডেট হবে
        >
          <Label id="access-label">Access Level</Label>
          <Select.Trigger aria-labelledby="access-label">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Description>
            {!isPremium
              ? "Upgrade to Premium to create paid lessons."
              : "Choose who can view this lesson."}
          </Description>
          <Select.Popover>
            <ListBox aria-labelledby="access-label">
              {accessLevels.map((item) => (
                <ListBox.Item
                  key={item.id}
                  id={item.id}
                  textValue={item.label}
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
          {loading ? (<><Spinner color="current" size="sm" />Creating Lesson...</>):'Create Lesson'}
          
        </Button>

      </Form>
    </div>
  );
}
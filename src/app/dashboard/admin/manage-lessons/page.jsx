"use client";

import { useEffect, useMemo, useState } from "react";
import AdminLessonStats from "@/Components/Admin/manage-lessons/AdminLessonStats";
import LessonFilters from "@/Components/Admin/manage-lessons/LessonFilters";
import ManageLessonsTable from "@/Components/Admin/manage-lessons/ManageLessonsTable";
import { getLessons } from "@/lib/getData/data/lessons";
import { getReports } from "@/lib/getData/data/reports";

// Client-side fetch helpers
// const getLessons = async () => {
//   const res = await fetch("/api/lessons");
//   if (!res.ok) throw new Error("Failed to fetch lessons");
//   return res.json();
// };

// const getReports = async () => {
//   const res = await fetch("/api/reports");
//   if (!res.ok) throw new Error("Failed to fetch reports");
//   return res.json();
// };

export default function ManageLessonsPage() {
  const API_URL =process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [visibility, setVisibility] = useState("all");
  const [flagFilter, setFlagFilter] = useState("all");

  const [stats, setStats] = useState({
    publicLessons: 0,
    privateLessons: 0,
    flaggedLessons: 0,
  });

  // Load Lessons + Reports
  const fetchLessonsData = async () => {
    try {
      setLoading(true);

      const lessonsData = await getLessons();
      const reportsData = await getReports();

      const updatedLessons = lessonsData.map((lesson) => {
        const flagCount = reportsData.filter(
          (report) => report.lessonId === lesson._id
        ).length;

        return {
          ...lesson,
          flags: flagCount,
          featured: lesson.featured || false,
          reviewed: lesson.reviewed || false,
        };
      });

      setLessons(updatedLessons);

      setStats({
        publicLessons: updatedLessons.filter(
          (l) => l.visibility === "public"
        ).length,
        privateLessons: updatedLessons.filter(
          (l) => l.visibility === "private"
        ).length,
        flaggedLessons: updatedLessons.filter((l) => l.flags > 0).length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessonsData();
  }, []);

  // Feature / UnFeature Lesson
  const handleFeature = async (id) => {
    try {
      const lesson = lessons.find((l) => l._id === id);
      const res = await fetch(`${API_URL}/api/lessons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !lesson.featured }),
      });
      if (res.ok) fetchLessonsData();
    } catch (err) {
      console.error(err);
    }
  };

  // Review Lesson
  const handleReview = async (id) => {
    try {
      const lesson = lessons.find((l) => l._id === id);
      const res = await fetch(`${API_URL}/api/lessons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewed: !lesson.reviewed }),
      });
      if (res.ok) fetchLessonsData();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Lesson
  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this lesson?");
    if (!ok) return;
    try {
      const res = await fetch(`${API_URL}/api/lessons/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchLessonsData();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Visibility
  const handleVisibility = async (id) => {
    try {
      const lesson = lessons.find((l) => l._id === id);
      const updatedVisibility =
        lesson.visibility === "public" ? "private" : "public";
      const res = await fetch(`${API_URL}/api/lessons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: updatedVisibility }),
      });
      if (res.ok) fetchLessonsData();
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchSearch =
        lesson.title?.toLowerCase().includes(search.toLowerCase()) ||
        lesson.username?.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "all" ? true : lesson.category === category;

      const matchVisibility =
        visibility === "all" ? true : lesson.visibility === visibility;

      const matchFlag =
        flagFilter === "all"
          ? true
          : flagFilter === "flagged"
          ? lesson.flags > 0
          : lesson.flags === 0;

      return matchSearch && matchCategory && matchVisibility && matchFlag;
    });
  }, [lessons, search, category, visibility, flagFilter]);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminLessonStats stats={stats} />

      <LessonFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        visibility={visibility}
        setVisibility={setVisibility}
        flagFilter={flagFilter}
        setFlagFilter={setFlagFilter}
      />

      <ManageLessonsTable
        lessons={filteredLessons}
        onFeature={handleFeature}
        onReview={handleReview}
        onDelete={handleDelete}
        onVisibility={handleVisibility}
      />
    </div>
  );
}

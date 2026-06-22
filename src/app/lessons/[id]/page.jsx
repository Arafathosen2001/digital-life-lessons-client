// import LessonDetailsContent from "@/components/lesson/LessonDetailsContent";

import LessonDetailsContent from "@/Components/Lessons/LessonDetailsContent";
import { getLessonsById } from "@/lib/getData/data/lessons";

export default async function LessonDetailsPage({params}) {
  const {id}= await params;
  const lessonById= await getLessonsById(id)
  // console.log(lesson)
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <LessonDetailsContent lessonById={lessonById} />
    </main>
  );
}
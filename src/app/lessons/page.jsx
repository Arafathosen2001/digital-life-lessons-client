import LessonsPageContent from "@/Components/Lessons/LessonsPageContent";
import { getLessons } from "@/lib/getData/data/lessons";
export const dynamic = "force-dynamic";

// আপনার বাকি কোড...

export default async function LessonsPage() {
    const lessonsData=await getLessons();
    // console.log(lessonsData)
    return (
        <LessonsPageContent lessonsData={lessonsData}></LessonsPageContent>
    )
}
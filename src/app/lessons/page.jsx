import LessonsPageContent from "@/Components/Lessons/LessonsPageContent";
import { getLessons } from "@/lib/getData/data/lessons";


export default async function LessonsPage() {
    const lessonsData=await getLessons();
    console.log(lessonsData)
    return (
        <LessonsPageContent lessonsData={lessonsData}></LessonsPageContent>
    )
}
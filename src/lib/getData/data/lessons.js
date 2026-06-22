import { serverFetch } from "@/lib/myApi/core/ferch"

export const getLessons = async () => {
    return serverFetch('/api/lessons')
}
export const getLessonsById= async(id)=>{
    return serverFetch(`/api/lessons/${id}`);
}
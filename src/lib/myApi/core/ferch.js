import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://digital-life-lessons-server-l2igjgsre.vercel.app';
export const serverFetch = async (path) => {
  const {token}=await auth.api.getToken({
    headers:await headers()
  })
    const res = await fetch(`${baseUrl}${path}`,{
        headers: {
            authorization:`Bearer ${token}`
          }
    });
    
     return res.json();
}
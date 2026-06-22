import { NextResponse } from 'next/server'
import { getServertSession } from './lib/getData/session/serverSesson';
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session= await getServertSession();
    if(!session){
        return NextResponse.redirect(new URL('/auth/signin?message=login-required', request.url))
    }
}
 
export const config = {
  matcher: ["/dashboard","/lessons/:path+","/dashboard/add-lesson","/dashboard/my-lessons","/dashboard/my-favorites"]
}
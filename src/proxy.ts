import { NextRequest, NextResponse } from "next/server";
import getAuthUser from "./lib/auth/getAuthUser";

const protectedRoutes = ["/dashboard", "/my-posts", "/my-posts/create"]
const publicRoutes = ["/sign-up", "/sign-in"]

export default async function proxy(req: NextRequest) {

    const path = req.nextUrl.pathname
    // console.log(path)
    const isProtected = protectedRoutes.includes(path) || path.startsWith("/my-posts/")
    const isPublic = publicRoutes.includes(path)

    const authUser = await getAuthUser()
    const userId = authUser?.userId

    if (isProtected && !userId) {
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl))
    }

    if (isPublic && userId) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}
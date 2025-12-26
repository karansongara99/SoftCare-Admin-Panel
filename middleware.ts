// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Only protect /admin routes
  // Allow everything else (/, /auth/*, /api/*, static files, etc.)
  if (pathname.startsWith("/admin")) {
    if (!token) {
      // Redirect to home page (login form) if not authenticated
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Allow all other requests
  return NextResponse.next();
}

// Only run middleware on /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};

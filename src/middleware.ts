import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("user")?.value;
  const secret = new TextEncoder().encode("raven");

  // Define the return type and handle undefined token
  async function checkJWT(
    token: string | undefined
  ): Promise<{ payload: JWTPayload } | null> {
    if (!token) {
      console.log("Token not assigned yet");
      return null;
    }

    try {
      return await jwtVerify(token, secret);
    } catch (err) {
      console.error("JWT verification failed: ", err);
      return null;
    }
  }

  // Redirect if accessing /auth and already authenticated
  if (path === "/auth" && token) {
    const isValid = await checkJWT(token);
    if (isValid) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page
    }
  }

  // Redirect if accessing /admin or its subpaths without valid token or admin rights
  if (path.startsWith("/admin")) {
    const jwtData = await checkJWT(token);
    if (!jwtData || !jwtData.payload?.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page if not admin
    }
  }

  if (
    (path === "/profile" || path === "/edit-profile" || path === "/checkout") &&
    token
  ) {
    const isValid = await checkJWT(token);
    if (!isValid) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page
    }
  }

  // Allow request to proceed if no redirect conditions are met
  return NextResponse.next();
}

// Apply middleware to /auth, /admin, and all /admin subpaths
export const config = {
  matcher: [
    "/auth",
    "/admin/:path*",
    "/profile/:path*",
    "/edit-profile/:path*",
    "/checkout/:path*",
  ],
};

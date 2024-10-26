import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("user")?.value;

  async function checkJWT(token: string) {
    if (!token) {
      console.log("Token not assigned yet");
      return false;
    }
    
    const secret = new TextEncoder().encode("raven");
    
    try {
      await jwtVerify(token, secret);
      return true;
    } catch (err) {
      console.error("JWT verification failed: ", err);
      return false;
    }
  }

  if (path === "/auth") {
    
    if (token) {
      const isValid = await checkJWT(token);
      if (isValid) {
        const redirectUrl = request.nextUrl.origin;
        return NextResponse.redirect(`${redirectUrl}/`); // Redirect to the home page
      }
    }
  }

    if (path === "/admin") {
        if (!token) {
        console.log("Token not assigned yet");
        return false;
    }
    
    const secret = new TextEncoder().encode("raven");
    
    try {
      const data = await jwtVerify(token, secret);
      if (!data.payload.isAdmin) {
        const redirectUrl = request.nextUrl.origin;
        return NextResponse.redirect(`${redirectUrl}/`);
      }
    } catch (err) {
      console.error("JWT verification failed: ", err);
    }
    }
}

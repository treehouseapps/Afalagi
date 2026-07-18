import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = await verifyToken(token);

    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (user.payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    if (request.nextUrl.pathname.startsWith("/pharmacy")) {
      if (user.payload.role !== "PHARMACIST") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/pharmacy/:path*"],
};

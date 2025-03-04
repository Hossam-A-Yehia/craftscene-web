import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const loggedInRoutes = [
  "/wallet",
  "/edit-user",
  "/add-address",
  "/address",
  "/add-branches",
  "/branches",
  "/interests",
];
const loggedOutRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
  "/complete-profile",
];

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  if (
    !loggedInRoutes.some((path) => pathname.startsWith(path)) &&
    !loggedOutRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }
  const myCookies = await cookies();
  const token = myCookies.get("authToken")?.value || null;
  if (!token && loggedInRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token && loggedOutRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/login",
    "/register",
    "/forget-password",
    "/reset-password",
    "/wallet/:path*",
    "/business-user/:path*",
    "/edit-user/:path*",
    "/address/:path*",
    "/add-address/:path*",
    "/branches/:path*",
    "/add-branches/:path*",
    "/complete-profile",
    "/interests/:path*",
  ],
};

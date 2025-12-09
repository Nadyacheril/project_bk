import { NextResponse } from "next/server";

export function middleware(req) {
  const role = req.cookies.get("role")?.value; //cookie ngasih tanda sesuai role
  const path = req.nextUrl.pathname;

  // ADMIN
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // GURU
  if (path.startsWith("/guru") && role !== "guru") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // SISWA
  if (path.startsWith("/home") && role !== "siswa") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/guru/:path*", "/guru", "/home/:path*", "/home"],
};

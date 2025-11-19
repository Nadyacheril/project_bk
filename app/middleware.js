import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const role = token.role;

  if (req.nextUrl.pathname === "/") {
    if (role === "admin") return NextResponse.redirect("/admin/dashboard");
    if (role === "guru") return NextResponse.redirect("/guru/dashboard");
    if (role === "siswa") return NextResponse.redirect("/pengajuan");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/guru/:path*", "/pengajuan"],
};

// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req) {
//   const token = await getToken({ req });

//   if (!token) return NextResponse.redirect(new URL("/login", req.url));

//   const role = token.role;

//   if (req.nextUrl.pathname === "/") {
//     if (role === "admin") return NextResponse.redirect("/admin");
//     if (role === "guru") return NextResponse.redirect("/guru/dashboard");
//     if (role === "siswa") return NextResponse.redirect("/pengajuan");
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/admin/:path*", "/guru/:path*", "/pengajuan"],
// };

import { NextResponse } from "next/server";

export function middleware(req) {
  const role = req.cookies.get("role")?.value;
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

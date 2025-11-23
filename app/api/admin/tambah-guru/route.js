// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import connection from "@/lib/database";

// export async function POST(req) {
//   const { nama, email, password, foto } = await req.json();

//   if (!nama || !email || !password || !foto) {
//     return NextResponse.json({ error: "Semua field wajib diisi!" }, { status: 400 });
//   }

//   try {
//     const hash = await bcrypt.hash(password, 12);

//     // 1. Insert ke users (role: guru)
//     const [userResult] = await connection.execute(
//       "INSERT INTO users (email, password, role) VALUES (?, ?, 'guru')",
//       [email, hash]
//     );
//     const userId = userResult.insertId;

//     // 2. Insert ke guru (dengan foto!)
//     await connection.execute(
//       "INSERT INTO guru (user_id, nama, foto) VALUES (?, ?, ?)",
//       [userId, nama, foto]
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     if (err.code === "ER_DUP_ENTRY") {
//       return NextResponse.json({ error: "Email sudah digunakan!" }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Gagal menambahkan guru" }, { status: 500 });
//   }
// }
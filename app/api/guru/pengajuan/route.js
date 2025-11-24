
// import { NextResponse } from "next/server";
// import connection from "@/lib/database";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const guruId = searchParams.get("guruId");

//     if (!guruId) {
//       return NextResponse.json({ success: false, error: "guruId dibutuhkan" }, { status: 400 });
//     }

//     const [rows] = await connection.execute(
//       `SELECT p.*, p.nama_siswa
//        FROM pengajuan p
//        WHERE p.id_guru = ?
//        ORDER BY p.created_at DESC`,
//       [guruId]
//     );

//     return NextResponse.json({
//       success: true,
//       data: rows
//     });

//   } catch (error) {
//     console.error("Error fetch pengajuan:", error);
//     return NextResponse.json({
//       success: false,
//       error: "Server error"
//     }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import connection from "@/lib/database";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const guruId = searchParams.get("guruId");

//     if (!guruId) {
//       return NextResponse.json({ success: false, error: "guruId dibutuhkan" }, { status: 400 });
//     }

//     const [rows] = await connection.execute(
//       `SELECT p.*, p.nama_siswa
//        FROM pengajuan p
//        WHERE p.id_guru = ?
//        ORDER BY p.created_at DESC`,
//       [guruId]
//     );

//     return NextResponse.json({
//       success: true,
//       data: rows
//     });

//   } catch (error) {
//     console.error("Error fetch pengajuan:", error); // ❌ cek ini di terminal / console
//     return NextResponse.json({
//       success: false,
//       error: "Server error"
//     }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connection from "@/lib/database";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const guruId = searchParams.get("guruId");

    if (!guruId) {
      return NextResponse.json({ success: false, error: "guruId dibutuhkan" }, { status: 400 });
    }

    const [rows] = await connection.execute(
      `SELECT p.*, p.nama_siswa 
       FROM pengajuan p 
       WHERE p.id_guru = ? 
       ORDER BY p.created_at DESC`,
      [guruId]
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetch pengajuan:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

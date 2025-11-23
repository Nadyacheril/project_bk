
// // import { NextResponse } from "next/server";
// // import connection from "@/lib/database";

// // export async function GET(req) {
// //   try {
// //     const { searchParams } = new URL(req.url);
// //     const guruId = searchParams.get("guruId");
// //     if (!guruId) {
// //       return NextResponse.json({ success: false, error: "guruId wajib" }, { status: 400 });
// //     }

// //     const [rows] = await connection.execute(
// //       "SELECT * FROM pengajuan WHERE id_guru = ? ORDER BY created_at DESC",
// //       [guruId]
// //     );

// //     return NextResponse.json({ success: true, data: rows });
// //   } catch (err) {
// //     return NextResponse.json({ success: false, error: err.message });
// //   }
// // }


// import { NextResponse } from "next/server";
// import connection from "@/lib/database";

// // ==================================
// // POST - Siswa kirim pengajuan ke guru
// // ==================================
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { id_siswa, id_guru, isi_pengajuan } = body;

//     if (!id_siswa || !id_guru || !isi_pengajuan) {
//       return NextResponse.json(
//         { success: false, error: "Semua field wajib diisi" },
//         { status: 400 }
//       );
//     }

//     await connection.execute(
//       "INSERT INTO pengajuan (id_siswa, id_guru, isi_pengajuan) VALUES (?, ?, ?)",
//       [id_siswa, id_guru, isi_pengajuan]
//     );

//     return NextResponse.json({ success: true, message: "Pengajuan berhasil dikirim" });
//   } catch (err) {
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }

// // ==================================
// // GET - Guru ambil semua pengajuan
// // ==================================
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const guruId = searchParams.get("guruId");

//     if (!guruId) {
//       return NextResponse.json(
//         { success: false, error: "guruId wajib" },
//         { status: 400 }
//       );
//     }

//     const [rows] = await connection.execute(
//       "SELECT * FROM pengajuan WHERE id_guru = ? ORDER BY created_at DESC",
//       [guruId]
//     );

//     return NextResponse.json({ success: true, data: rows });
//   } catch (err) {
//     return NextResponse.json({ success: false, error: err.message });
//   }
// }

// import connection from "@/lib/database";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { guruId, siswaId, kelas_siswa, topik, jam } = req.body;

//     if (!guruId || !siswaId || !kelas_siswa || !topik || !jam)
//       return res.status(400).json({ error: "Semua field harus diisi" });

//     try {
//       // Ambil nama siswa
//       const [siswa] = await connection.execute("SELECT nama FROM siswa WHERE id = ?", [siswaId]);
//       const nama_siswa = siswa[0]?.nama || "";

//       await connection.execute(
//         `INSERT INTO pengajuan (id_guru, id_siswa, nama_siswa, kelas_siswa, topik, jam)
//          VALUES (?, ?, ?, ?, ?, ?)`,
//         [guruId, siswaId, nama_siswa, kelas_siswa, topik, jam]
//       );

//       res.status(200).json({ success: true });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Gagal mengirim pengajuan" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

// import { NextResponse } from "next/server";
// import connection from "@/lib/database";

// export async function POST(req) {
//   try {
//     const { guruId, siswaId, kelas_siswa, topik, jam } = await req.json();

//     if (!guruId || !siswaId || !kelas_siswa || !topik || !jam)
//       return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });

//     // ambil nama siswa
//     const [siswa] = await connection.execute(
//       "SELECT nama FROM siswa WHERE id = ?",
//       [siswaId]
//     );

//     const nama_siswa = siswa[0]?.nama || "";

//     await connection.execute(
//       `INSERT INTO pengajuan (id_guru, id_siswa, nama_siswa, kelas_siswa, topik, jam)
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [guruId, siswaId, nama_siswa, kelas_siswa, topik, jam]
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Gagal mengirim pengajuan" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import connection from "@/lib/database";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const guruId = searchParams.get("guruId");

//   if (!guruId)
//     return NextResponse.json({ error: "guruId dibutuhkan" }, { status: 400 });

//   try {
//     const [rows] = await connection.execute(
//       "SELECT * FROM pengajuan WHERE id_guru = ? ORDER BY created_at DESC",
//       [guruId]
//     );
//     return NextResponse.json({ pengajuan: rows });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Gagal mengambil pengajuan" }, { status: 500 });
//   }
// }

// (ini codingan terakhir dri gpt )import { NextResponse } from "next/server";
// import connection from "@/lib/database";

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const guruId = searchParams.get("guruId");

//   if (!guruId) {
//     return NextResponse.json({ error: "guruId dibutuhkan" }, { status: 400 });
//   }

//   try {
//     const [rows] = await connection.execute(
//       "SELECT * FROM pengajuan WHERE id_guru = ? ORDER BY created_at DESC",
//       [guruId]
//     );

//     return NextResponse.json({ pengajuan: rows });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Gagal mengambil pengajuan" }, { status: 500 });
//   }
// }

// app/api/pengajuan/route.js
// (ini codingan terakhir dri gpt) import { NextResponse } from "next/server";
// import connection from "@/lib/database";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { guruId, siswaId, kelas_siswa, topik, jam } = body;

//     if (!guruId || !siswaId || !kelas_siswa || !topik || !jam) {
//       return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
//     }

//     // Ambil nama siswa otomatis
//     const [siswaRows] = await connection.execute(
//       "SELECT nama FROM siswa WHERE id = ?",
//       [siswaId]
//     );
//     const nama_siswa = siswaRows[0]?.nama || "Unknown";

//     await connection.execute(
//       `INSERT INTO pengajuan
//        (id_guru, id_siswa, nama_siswa, kelas_siswa, topik, jam, status, notif_dibaca)
//        VALUES (?, ?, ?, ?, ?, ?, 'Pending', 0)`,
//       [guruId, siswaId, nama_siswa, kelas_siswa, topik, jam]
//     );

//     return NextResponse.json({ success: true, message: "Pengajuan berhasil dikirim" });
//   } catch (err) {
//     console.error("Error pengajuan:", err);
//     return NextResponse.json({ error: "Gagal mengirim pengajuan" }, { status: 500 });
//   }
// }

// app/api/guru/pengajuan/route.js
// app/api/guru/pengajuan/route.js
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

    return NextResponse.json({ 
      success: true, 
      data: rows 
    });

  } catch (error) {
    console.error("Error fetch pengajuan:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Server error" 
    }, { status: 500 });
  }
}
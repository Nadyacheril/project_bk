// import { NextResponse } from "next/server";
// import connection from "@/lib/database";

// // PATCH: update status pengajuan
// export async function PATCH(req, { params }) {
//   try {
//     const { id } = params;
//     const { status, alasan } = await req.json();

//     if (!["Disetujui", "Ditolak"].includes(status)) {
//       return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
//     }

//     await connection.execute(
//       "UPDATE pengajuan SET status = ?, alasan = ?, notif_dibaca = 0 WHERE id = ?",
//       [status, alasan || null, id]
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Gagal update" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import connection from "@/lib/database";

// export async function PATCH(req, { params }) {
//   try {
//     const { id } = params;
//     const { status } = await req.json(); // status: "Menunggu" atau "Disetujui"

//     if (!["Menunggu", "Disetujui"].includes(status)) {
//       return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
//     }

//     await connection.execute(
//       "UPDATE pengajuan SET status = ? WHERE id = ?",
//       [status, id]
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Gagal update" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import connection from "@/lib/database";

export async function PATCH(req, { params }) {
  try {
    const { id } = params; // ambil ID dari URL
    if (!id) return NextResponse.json({ error: "ID dibutuhkan" }, { status: 400 });

    const body = await req.json();
    const { status } = body; // status: "Disetujui"

    if (!["Disetujui"].includes(status)) {
      return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
    }

    // update status di database + set notif_dibaca = 0 supaya muncul di notif lagi
    await connection.execute(
      "UPDATE pengajuan SET status = ?, notif_dibaca = 0 WHERE id = ?",
      [status, id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Gagal update status pengajuan:", err);
    return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
  }
}

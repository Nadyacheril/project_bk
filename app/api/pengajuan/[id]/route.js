// app/api/pengajuan/[id]/route.js
import { NextResponse } from "next/server";
import connection from "@/lib/database";

// PATCH — SETUJUI / TOLAK (udah ada)
export async function PATCH(req, context) {
  try {
    const { id } = await context.params; // WAJIB: await context.params
    const { status, alasan } = await req.json();

    if (!["Menunggu", "Disetujui", "Ditolak"].includes(status)) {
      return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
    }

    await connection.execute(
      "UPDATE pengajuan SET status = ?, alasan = ?, notif_dibaca = 0 WHERE id = ?",
      [status, alasan || null, id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error update:", err);
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}

// HAPUS PERMANEN — PAKE POST + await params
export async function POST(req, context) {
  try {
    const { id } = await context.params; // INI YANG LU LUPA: await context.params
    const body = await req.json();

    if (body.hapus) {
      await connection.execute("DELETE FROM pengajuan WHERE id = ?", [id]);
      return NextResponse.json({ success: true, message: "Dihapus permanen!" });
    }

    return NextResponse.json({ error: "Aksi tidak dikenali" }, { status: 400 });
  } catch (err) {
    console.error("Error hapus:", err);
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}
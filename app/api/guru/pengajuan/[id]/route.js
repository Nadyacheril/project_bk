// app/api/pengajuan/[id]/route.js
import { NextResponse } from "next/server";
import connection from "@/lib/database";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, alasan } = body; // status: "Disetujui" atau "Ditolak"

    if (!["Disetujui", "Ditolak"].includes(status)) {
      return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
    }

    await connection.execute(
      "UPDATE pengajuan SET status = ?, alasan = ?, notif_dibaca = 0 WHERE id = ?",
      [status, alasan || null, id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}
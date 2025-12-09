
import { NextResponse } from "next/server";
import connection from "@/lib/database";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { status} = await req.json();

    if (!["Menunggu", "Disetujui", "Ditolak"].includes(status)) {
      return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
    }

    await connection.execute(
      "UPDATE pengajuan SET status = ?, notif_dibaca = 0 WHERE id = ?",
      [status|| null, id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}

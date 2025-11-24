import { NextResponse } from "next/server";
import connection from "@/lib/database";

export async function PATCH(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID dibutuhkan" }, { status: 400 });

    await connection.execute(
      "UPDATE pengajuan SET notif_dibaca = 1 WHERE id = ?",
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal update notif" }, { status: 500 });
  }
}

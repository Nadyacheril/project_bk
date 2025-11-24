import { NextResponse } from "next/server";
import connection from "@/lib/database";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "ID dibutuhkan" }, { status: 400 });

    await connection.execute(
      "DELETE FROM pengajuan WHERE id = ?",
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal hapus notif" }, { status: 500 });
  }
}
import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status)
      return NextResponse.json({ error: "id dan status wajib" }, { status: 400 });

    await db.query("UPDATE pengajuan SET status = ? WHERE id = ?", [status, id]);

    return NextResponse.json({ message: "Status diperbarui" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
  }
}

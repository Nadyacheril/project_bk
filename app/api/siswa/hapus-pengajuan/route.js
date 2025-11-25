import { NextResponse } from "next/server";
import db from "@/lib/database";

export async function POST(req) {
  try {
    const { id } = await req.json();
    await db.execute("DELETE FROM pengajuan WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error hapus:", error);
    return NextResponse.json({ success: false });
  }
}
//ini baru

import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ success: false });

  try {
    const [guru] = await query("SELECT id, nama, foto FROM guru WHERE user_id = ? LIMIT 1", [userId]);
    if (!guru) return NextResponse.json({ success: false, message: "Guru tidak ditemukan" });
    return NextResponse.json({ success: true, guru });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
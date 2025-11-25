import { NextResponse } from "next/server";
import db from "@/lib/database";

export async function POST() {
  try {
    await db.execute("UPDATE pengajuan SET notif_dibaca = 1 WHERE status != 'Menunggu'");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tandai dibaca:", error);
    return NextResponse.json({ success: false });
  }
}
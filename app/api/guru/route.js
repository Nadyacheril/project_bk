import { NextResponse } from "next/server";
import connection from "@/lib/database";

export async function GET() {
  try {
    const [rows] = await connection.execute("SELECT * FROM guru ORDER BY id ASC");
    return NextResponse.json({ guru: rows }); // ✅ wajib json
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "API gagal" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { query } from "@/lib/database";

export async function GET() {
  const users = await query("SELECT id, email, role FROM users ORDER BY id ASC");

  return NextResponse.json({ users });
}

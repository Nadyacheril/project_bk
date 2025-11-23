import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/lib/database";

export async function POST(req) {
  const { nama, email, password, nip } = await req.json();

  try {
    const hash = await bcrypt.hash(password, 12);

    // Insert ke users
    const userResult = await query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, 'guru')",
      [email, hash]
    );

    const userId = userResult.insertId;

    // Insert ke guru
    await query(
      "INSERT INTO guru (user_id, nama, nip) VALUES (?, ?, ?)",
      [userId, nama, nip]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connection from "@/lib/database";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // CEK USER ADA
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Email tidak terdaftar" }, { status: 400 });
    }

    const user = rows[0];

    // CEK PASSWORD
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Password salah" }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Login berhasil",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

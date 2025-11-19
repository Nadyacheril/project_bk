import db from "@/lib/database";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { nama, email, nip } = await req.json();
  const plainPassword = `guru${nip.slice(-4)}`;
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    const [result] = await db.query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, 'guru')",
      [email, hashedPassword]
    );

    await db.query(
      "INSERT INTO guru (user_id, nama, nip) VALUES (?, ?, ?)",
      [result.insertId, nama, nip]
    );

    await sendTeacherEmail({ nama, email, password: plainPassword });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
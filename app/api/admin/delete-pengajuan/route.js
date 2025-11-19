import db from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") return new Response("Unauthorized", { status: 401 });

  const { id } = await req.json();
  await db.query("DELETE FROM pengajuan WHERE id = ?", [id]);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
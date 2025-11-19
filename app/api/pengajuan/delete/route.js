import db from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "siswa") {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const id = formData.get("id");

  // Cek kepemilikan & status
  const [check] = await db.query(
    "SELECT id_siswa, status FROM pengajuan WHERE id = ?",
    [id]
  );

  if (!check[0]) return new Response("Not found", { status: 404 });
  if (check[0].status !== "menunggu") {
    return new Response("Hanya pengajuan 'menunggu' yang bisa dihapus", { status: 400 });
  }

  // Cek kepemilikan
  const [siswa] = await db.query(
    "SELECT id FROM siswa WHERE user_id = ?",
    [session.user.id]
  );
  if (siswa[0].id !== check[0].id_siswa) {
    return new Response("Forbidden", { status: 403 });
  }

  await db.query("DELETE FROM pengajuan WHERE id = ?", [id]);

  return new Response("", {
    status: 303,
    headers: { Location: "/pengajuan" },
  });
}
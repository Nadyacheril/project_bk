import db from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "siswa") {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const id_siswa = (await db.query("SELECT id FROM siswa WHERE user_id = ?", [session.user.id]))[0][0].id;

  await db.query(
    `INSERT INTO pengajuan (id_siswa, id_guru, kelas_siswa, topik, tanggal, status)
     VALUES (?, ?, ?, ?, ?, 'menunggu')`,
    [id_siswa, formData.get("id_guru"), formData.get("kelas_siswa"), formData.get("topik"), formData.get("tanggal")]
  );

  return new Response("", { status: 303, headers: { Location: "/pengajuan" } });
}
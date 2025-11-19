import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "../../../../lib/database";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const [pengajuan] = await db.query(`
    SELECT p.*, s.nama AS nama_siswa, s.kelas AS kelas_siswa, g.nama AS nama_guru, g.kode_guru
    FROM pengajuan p
    JOIN siswa s ON p.id_siswa = s.id
    JOIN guru g ON p.id_guru = g.id
    ORDER BY p.tanggal DESC
  `);

  return new Response(JSON.stringify(pengajuan), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

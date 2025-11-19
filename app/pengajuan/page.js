import FormPengajuan from "./FormPengajuan";
import db from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return <div>Session tidak ditemukan</div>;

  const email = session.user.email;

  // Ambil data siswa
  const [rows] = await db.query(
    `SELECT u.id AS user_id, s.id AS id_siswa, s.nama AS nama_siswa
     FROM users u
     JOIN siswa s ON u.id = s.user_id
     WHERE u.email = ?`,
    [email]
  );

  const siswa = rows[0];
  if (!siswa) return <div>Data siswa tidak ditemukan</div>;

  const [guruList] = await db.query("SELECT id, nama FROM guru");
  const [pengajuanList] = await db.query(
    `SELECT p.*, g.nama AS nama_guru
     FROM pengajuan p
     JOIN guru g ON p.id_guru = g.id
     WHERE p.id_siswa = ?
     ORDER BY p.id DESC`,
    [siswa.id_siswa]
  );

  // Server Action
  async function submitAction(formData) {
    "use server";
    const kelas = formData.get("kelas_siswa");
    const id_guru = formData.get("id_guru");
    const topik = formData.get("topik");
    const tanggal = formData.get("tanggal");

    await db.query(
      `INSERT INTO pengajuan (id_siswa, id_guru, kelas_siswa, topik, tanggal, status)
       VALUES (?, ?, ?, ?, ?, 'menunggu')`,
      [siswa.id_siswa, id_guru, kelas, topik, tanggal]
    );

    return { success: true };
  }

  return (
    <FormPengajuan
      submitAction={submitAction}
      guruList={guruList}
      pengajuanList={pengajuanList}
      siswaNama={siswa.nama_siswa}
    />
  );
}

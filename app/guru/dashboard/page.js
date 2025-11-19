import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/lib/database";
import LogoutButton from "@/component/LogoutButton";
import Link from "next/link";
import Image from "next/image";

export default async function GuruDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "guru") {
    return <div className="p-8 text-6xl text-center text-bold text-red-600">AKSES DITOLAK!!</div>;
  }

  const [pengajuan] = await db.query(`
    SELECT p.*, s.nama as nama_siswa, s.kelas, g.kode_guru
    FROM pengajuan p
    JOIN siswa s ON p.id_siswa = s.id
    JOIN guru g ON p.id_guru = g.id
    WHERE g.user_id = ?
    ORDER BY p.tanggal DESC
  `, [session.user.id]);

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between p-4 border-b">
        <Link href="/" className="text-gray-700">Back</Link>
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="BKcTB" width={40} height={40} />
          <span className="font-semibold text-[#5B7DB1]">BKcTB</span>
        </div>
        <LogoutButton />
      </nav>

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Guru</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#8EAAD6] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm">Nama siswa</th>
                <th className="px-4 py-3 text-left text-sm">Kelas siswa</th>
                <th className="px-4 py-3 text-left text-sm">Id Guru Bk</th>
                <th className="px-4 py-3 text-left text-sm">Topik</th>
                <th className="px-4 py-3 text-left text-sm">Tanggal</th>
                <th className="px-4 py-3 text-left text-sm">Status</th>
                <th className="px-4 py-3 text-left text-sm">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pengajuan.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{p.nama_siswa}</td>
                  <td className="px-4 py-3 text-sm">{p.kelas_siswa}</td>
                  <td className="px-4 py-3 text-sm">{p.kode_guru}</td>
                  <td className="px-4 py-3 text-sm">{p.topik}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(p.tanggal).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full
                      ${p.status === 'diterima' ? 'bg-green-100 text-green-800' :
                        p.status === 'ditolak' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {p.status === 'menunggu' && (
                      <div className="flex gap-2">
                        <form action="/api/pengajuan/acc" method="POST">
                          <input type="hidden" name="id" value={p.id} />
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                            ACC
                          </button>
                        </form>
                        <form action="/api/pengajuan/tolak" method="POST">
                          <input type="hidden" name="id" value={p.id} />
                          <button className="bg-red-600 text-white px-3 py-1 rounded text-xs">
                            Tolak
                          </button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
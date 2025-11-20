"use client";
import { useState } from "react";
import Image from "next/image";
import { MapPin, Mail, Phone, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MainPage({ user }) {
  const router = useRouter();

  const guruList = [
    { id: 1, nama: "BU CACA", foto: "/guru/bucaca.jpg", pengalaman: "10 tahun", mapel: "BK" },
    { id: 2, nama: "Bu Heni", foto: "/guru/buheni.jpg", pengalaman: "8 tahun", mapel: "BK" },
    { id: 3, nama: "Pak Fika", foto: "/guru/bufika.jpg", pengalaman: "5 tahun", mapel: "BK" },
    { id: 4, nama: "Bu Nadia", foto: "/guru/bunadia.jpg", pengalaman: "12 tahun", mapel: "BK" },
  ];

  const [selectedGuru, setSelectedGuru] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [kelas, setKelas] = useState("");
  const [topik, setTopik] = useState("");
  const [jam, setJam] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (guru) => {
    setSelectedGuru(guru);
    setShowForm(false);
    setKelas("");
    setTopik("");
    setJam("");
  };

  const handleCloseModal = () => {
    setSelectedGuru(null);
    setShowForm(false);
    setKelas("");
    setTopik("");
    setJam("");
  };

  const handlePengajuan = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Silakan login dulu untuk mengajukan konseling");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guruId: selectedGuru.id,
          siswaId: user.id,
          kelas_siswa: kelas,
          topik,
          jam,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Pengajuan berhasil dikirim!");
        handleCloseModal();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <main className="bg-white min-h-screen text-[#2C3E50]">

      {/* ============ NAVBAR ============ */}
      <nav className="bg-[#5B7DB1] text-white px-8 py-3 mx-6 mt-4 mb-10 rounded-full flex items-center justify-between shadow-md relative">
        <h1 className="font-bold text-2xl tracking-wide cursor-pointer">BKcTB</h1>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section
        className="relative flex flex-col justify-center items-center text-center text-white py-24 px-6"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/50 absolute inset-0" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Tempat yang aman untuk bertumbuh dan berbagi.
          </h2>
          <p className="text-sm md:text-base mb-8">
            Kami ada untuk memberikan solusi dan mendengarkan keluh kesah siswa/i.
          </p>
          {!user && (
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-[#395E9D] font-bold px-12 py-4 rounded-full shadow-xl hover:scale-110 transition text-lg"
            >
              Login
            </button>
          )}
          {user && <p className="text-lg font-semibold">Halo, {user.name || user.email}</p>}
        </div>
      </section>

       {/* Deskripsi Bawah Hero */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 flex justify-center md:justify-start">
            <img src="/bk.png" alt="Konseling" className="w-64 md:w-80 rounded-xl shadow" />
          </div>
          <div className="flex-1 text-[#395E9D] font-semibold text-lg leading-relaxed text-center md:text-left">
            <p>
              Web ini membantu para siswa dan siswi SMK Taruna Bhakti agar bisa mendapatkan haknya untuk layanan bimbingan dan konseling dengan mudah.
            </p>
            <p className="mt-4">
              Bersama BKcTB bisa mewujudkan generasi yang percaya diri, bisa menghadapi masa depan dengan kuat.
            </p>
          </div>
        </div>
      </section>

      {/* Manfaat & Fitur */}
      <div className="bg-[#F5F7FB] py-20 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 text-white">
          <div className="bg-[#395E9D] p-8 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Manfaat Pakai BKcTB</h3>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Pengajuan Terjadwal dan Terdokumentasi</li>
              <li>Meningkatkan Hubungan Siswa dan Guru</li>
              <li>Mudah Digunakan</li>
              <li>Tempat Curhat yang Aman dan Rahasia</li>
            </ul>
          </div>
          <div className="bg-[#7BA4D9] p-8 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Fitur Utama</h3>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Dashboard Guru</li>
              <li>Dashboard Siswa/i</li>
              <li>Form Pengajuan</li>
              <li>Button ACC</li>
              <li>Button Remove</li>
              <li>Catatan Konseling</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimoni */}
      <div className="text-center py-16 bg-white">
        <h2 className="text-3xl font-bold text-[#395E9D] mb-2">Testimoni</h2>
        <p className="text-[#7BA4D9] font-semibold">
          Ucap Pengguna Yang Sudah Memakai BKcTB
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 px-4">
          <div className="p-6 border rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <p>"Menurut saya ada nya web BKcTB di sekolah SMK Taruna Bhakti ini sangat membantu untuk membuat jadwal konseling dari jarak jauh."</p>
            <p className="mt-3 font-semibold text-[#395E9D]">– Yeji XI RPL 8</p>
          </div>
          <div className="p-6 border rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <p>"Saya sangat suka dengan web ini karena apa yang saya ajukan tersimpan dengan rapih."</p>
            <p className="mt-3 font-semibold text-[#395E9D]">– XI Ryujin bC 6</p>
          </div>
          <div className="p-6 border rounded-xl shadow transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <p>"Saya sangat terbantu dengan adanya web BKcTB karena saya bisa menceritakan keluh kesah saya dengan konfirmasi yang cepat."</p>
            <p className="mt-3 font-semibold text-[#395E9D]">– Lia XI Animasi 4</p>
          </div>
        </div>
      </div>


      {/* ============ ACCESS SECTION ============ */}
      <section id="access" className="py-20 text-center">
        <h2 className="text-lg font-semibold text-[#5B7DB1] mb-10">
          Guru Bimbingan Konseling  
          <br /> Klik foto untuk melihat profilnya
        </h2>

        <div className="grid grid-cols-2 gap-10 justify-center max-w-md mx-auto">
          {guruList.map((guru) => (
            <div
              key={guru.id}
              className="w-40 h-40 rounded-lg mx-auto cursor-pointer hover:opacity-80 transition"
              onClick={() => handleOpenModal(guru)}
            >
              <Image
                src={guru.foto}
                width={160}
                height={160}
                alt={guru.nama}
                className="w-40 h-40 rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ============ POPUP MODAL ============ */}
      {selectedGuru && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X />
            </button>
            <Image
              src={selectedGuru.foto}
              width={160}
              height={160}
              alt={selectedGuru.nama}
              className="rounded-lg mx-auto"
            />
            <h3 className="text-xl font-semibold text-center mt-2">{selectedGuru.nama}</h3>
            <p className="text-center">{selectedGuru.mapel}</p>
            <p className="text-center">Pengalaman: {selectedGuru.pengalaman}</p>

            {/* Tombol "Klik Pengajuan" */}
            {!showForm && (
              <button
                onClick={() => {
                  if (!user) {
                    alert("Silakan login dulu untuk mengajukan konseling");
                    return;
                  }
                  setShowForm(true);
                }}
                className={`mt-4 w-full py-2 rounded ${
                  user
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                disabled={!user}
              >
                Klik Pengajuan di sini
              </button>
            )}

            {/* FORM PENGAJUAN */}
            {showForm && (
              <form onSubmit={handlePengajuan} className="mt-4 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Kelas"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  required
                  className="border px-2 py-1 rounded"
                />
                <select
                  value={topik}
                  onChange={(e) => setTopik(e.target.value)}
                  required
                  className="border px-2 py-1 rounded"
                >
                  <option value="">Pilih Topik Konseling</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Pribadi">Pribadi</option>
                  <option value="Karir">Karir</option>
                  <option value="Sosial">Sosial</option>
                </select>
                <select
                  value={jam}
                  onChange={(e) => setJam(e.target.value)}
                  required
                  className="border px-2 py-1 rounded"
                >
                  <option value="">Pilih Jam</option>
                  <option value="08:00-09:00">08:00-09:00</option>
                  <option value="09:00-10:00">09:00-10:00</option>
                  <option value="10:00-11:00">10:00-11:00</option>
                  <option value="13:00-14:00">13:00-14:00</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white py-2 rounded mt-2"
                >
                  {loading ? "Mengirim..." : "Kirim Pengajuan"}
                </button>
              </form>
            )}

            {!user && (
              <p className="text-red-500 mt-2 text-sm">
                Login dulu untuk bisa mengajukan konseling
              </p>
            )}
          </div>
        </div>
      )}

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact" className="flex flex-col items-center text-center mb-20">
        <h2 className="text-[#5B7DB1] font-semibold text-lg mb-10">
          Contact Dan Hubungi Kami
        </h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
          <div className="flex flex-col gap-6 text-left">
            <div className="flex items-center gap-3">
              <MapPin className="text-[#5B7DB1]" />
              <p className="font-medium text-[#5B7DB1]">SMK Taruna Bhakti Depok</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[#5B7DB1]" />
              <p className="font-medium text-[#5B7DB1]">BKcTB@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-[#5B7DB1]" />
              <p className="font-medium text-[#5B7DB1]">08573081452</p>
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.9252981443237!2d106.8674123739917!3d-6.3844791936059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ebaff005f277%3A0x9fcd41028665eea8!2sSMKS%20TARUNA%20BHAKTI%20DEPOK!5e1!3m2!1sen!2sid!4v1762948848933!5m2!1sen!2sid"
              width="450"
              height="300"
              className="rounded-lg shadow-md"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#5B7DB1] text-white py-5 text-center rounded-t-3xl font-semibold">
        © {new Date().getFullYear()} BKcTB | SMK Taruna Bhakti
      </footer>
    </main>
  );
}

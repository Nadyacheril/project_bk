"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Mail, Phone, X, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MainPage({ user }) {
  const router = useRouter();

  const guruList = [
    { id: 1, nama: "Kasandra Fitriani.N S.Pd", foto: "/guru/bucaca.jpg", pengalaman: "10 tahun", quote: "Manusia tidak rusak, hanya terkadang tersesat. BK membantu menemukan arah pulang." },
    { id: 2, nama: "Heni Siswati S.Psi", foto: "/guru/buheni.jpg", pengalaman: "8 tahun", quote: "Setiap luka punya bahasa. BK membantu menerjemahkannya." },
    { id: 3, nama: "Ika Rafika S.Pd", foto: "/guru/bufika.jpg", pengalaman: "5 tahun", quote: "BK bukan sekadar bantuan; ia adalah jembatan menuju versi dirimu yang lebih kuat." },
    { id: 4, nama: "Nadya Afriliani Ariesta S.Pd", foto: "/guru/bunadia.jpg", pengalaman: "12 tahun", quote: "Keberanian dimulai dari berani cerita." },
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
    setKelas(""); setTopik(""); setJam("");
  };

  const handleCloseModal = () => {
    setSelectedGuru(null);
    setShowForm(false);
  };

  const handlePengajuan = async (e) => {
    e.preventDefault();
    if (!user) return alert("Silakan login dulu!");
    setLoading(true);
    try {
      const res = await fetch("/api/pengajuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guruId: selectedGuru.id, siswaId: user.id, kelas_siswa: kelas, topik, jam }),
      });
      if (res.ok) {
        alert("Pengajuan berhasil dikirim!");
        handleCloseModal();
      } else {
        const data = await res.json();
        alert(data.error || "Gagal mengirim");
      }
    } catch { alert("Koneksi error"); }
    setLoading(false);
  };

  return (
    <main className="bg-white min-h-screen text-[#2C3E50]">

      {/* NAVBAR BIRU PERSIS KODE KAMU + TAMBAH TULISAN */}
      <nav className="bg-[#5B7DB1] text-white px-8 py-3 mx-6 mt-4 mb-10 rounded-full flex items-center justify-between shadow-md relative">
        <h1 className="font-bold text-2xl tracking-wide">BKcTB</h1>
        
      </nav>

      {/* HERO PERSIS KODE KAMU */}
      <section className="relative flex flex-col justify-center items-center text-center text-white py-45 px-6" style={{backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="bg-black/50 absolute inset-0" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4x2 md:text-4xl font-extrabold mb-4">
            Tempat yang aman untuk bertumbuh dan berbagi.
          </h2>
          <p className="text-sm md:text-base mb-8">
            Kami ada untuk memberikan solusi dan mendengarkan keluh kesah siswa/i.
          </p>
          {!user && (
            <button onClick={() => router.push("/login")} className="bg-white text-[#395E9D] font-bold px-12 py-4 rounded-full shadow-xl hover:scale-110 transition text-lg">
              Login
            </button>
          )}
          {user && <p className="text-lg font-semibold">Halo, {user.name || user.email}</p>}
        </div>
      </section>

     
<section className="py-24 px-6 bg-gradient-to-b from-white to-[#f5f9ff]">
  <div className="max-w-6xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-12 items-center">

     
      <div className="flex justify-center lg:justify-end">
        <div className="relative">
          <div className="absolute inset-0 bg-[#5B7DB1]/10 rounded-3xl blur-3xl"></div>
          <img 
            src="/bk.png"
            alt="Bimbingan Konseling"
            className="relative w-64 md:w-80 lg:w-96 rounded-2xl shadow-2xl border-8 border-white hover:shadow-3xl transition-shadow duration-500"
          />
        </div>
      </div>

      
      <div className="text-center lg:text-left">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#395E9D] mb-8 leading-tight">
          Layanan Bimbingan Konseling
          <span className="block text-[#5B7DB1] mt-2">yang Mudah Diakses</span>
        </h2>

        <div className="space-y-6 text-lg text-gray-700 font-medium">
          <p className="leading-relaxed">
            Web ini membantu para siswa dan siswi <span className="font-bold text-[#395E9D]">SMK Taruna Bhakti</span> 
            mendapatkan layanan bimbingan konseling dengan cepat dan nyaman.
          </p>
          <p className="leading-relaxed">
            Bersama <span className="font-bold text-[#5B7DB1]">BKcTB</span>, kita wujudkan generasi yang 
            <span className="font-bold text-[#395E9D]"> percaya diri </span> 
            dan siap menghadapi masa depan.
          </p>
        </div>

      </div>

    </div>
  </div>
</section>

      
      <div className="bg-[#F5F7FB] py-20 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 text-white">
          <div className="bg-[#395E9D] p-10 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Manfaat Pakai BKcTB</h3>
            <ul className="list-disc list-inside space-y-3 text-lg">
              <li>Pengajuan Terjadwal dan Terdokumentasi</li>
              <li>Meningkatkan Hubungan Siswa dan Guru</li>
              <li>Mudah Digunakan</li>
              <li>Tempat Penjadwal tercepat</li>
            </ul>
          </div>
          <div className="bg-[#7BA4D9] p-10 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Fitur Utama</h3>
            <ul className="list-disc list-inside space-y-3 text-lg">
              <li>Dashboard Guru</li>
              <li>Dashboard Siswa/i</li>
              <li>Form Pengajuan</li>
              <li>Button ACC</li>
              <li>Button Remove</li>
              <li>Riwayat Konseling</li>
            </ul>
          </div>
        </div>
      </div>


      
      <section className="py-20 px-6 bg-gradient-to-b from-[#f8fbff] to-white">
        <h2 className="text-center text-4xl font-bold text-[#395E9D] mb-12">Guru Bimbingan Konseling</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto mb-20">
          {guruList.map((guru) => (
            <div key={guru.id} onClick={() => handleOpenModal(guru)} className="text-center cursor-pointer group">
              <div className="mx-auto w-40 h-40 rounded-2xl overflow-hidden shadow-xl mb-4">
                <Image src={guru.foto} width={160} height={160} alt={guru.nama} className="object-cover group-hover:scale-110 transition" />
              </div>
              <h3 className="font-bold text-[#395E9D]">{guru.nama.split(" ").slice(0,2).join(" ")}</h3>
              <p className="text-sm text-gray-600">Pengalaman {guru.pengalaman}</p>
              <p className="mt-3 italic text-gray-700 text-sm px-2">"{guru.quote}"</p>
            </div>
          ))}
        </div>

        
        <div className="max-w-5xl mx-auto mt-32 px-6">
        <h2 className="text-center text-3xl font-bold text-[#395E9D] mb-12">Cara Menggunakan Web BKcTB</h2>
        <div className="grid md:grid-cols-3 gap-8">
    {[
      { step: "I", title: "Login jika kamu sudah mempunyai akunmu", desc: "Jika belum mempunyai silahkan membuat nya di register" },
      { step: "II", title: "Pilih Guru & Isi Form", desc: "Klik foto guru BK, lalu isi kelas, topik, jam dan tanggal yang kamu inginkan" },
      { step: "III", title: "Tunggu pengajuanmu di setujui", desc: "Guru BK akan ACC pengajuanmu, lalu datang sesuai jadwal yang disetujui" }
    ].map((item, index) => (
      <div
        key={index}
        className="group relative bg-white rounded-3xl shadow-xl overflow-hidden border border-[#5B7DB1]/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
      >
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#5B7DB1]/10 rounded-full flex items-center justify-center">
          <span className="text-6xl font-black text-[#5B7DB1]/20">{item.step}</span>
        </div>

       
        <div className="p-10 pt-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#5B7DB1] to-[#395E9D] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {item.step}
          </div>
          
          <h3 className="text-2xl font-bold text-[#395E9D] mb-4">
            {item.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {item.desc}
          </p>
        </div>

        
        <div className="h-2 bg-gradient-to-r from-[#5B7DB1] to-[#395E9D]" />
      </div>
    ))}
  </div>
</div>
      </section>

        <section className="py-20 bg-white">
        <h2 className="text-5xl font-bold text-center text-[#395E9D] mb-4">Testimoni</h2>
        <p className="text-center text-xl text-[#7BA4D9] mb-12">Pengguna yang sudah merasakan manfaat BKcTB</p>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[
            { text: "Membantu banget buat jadwal konseling dari jauh!", name: "Yeji – XI RPL 8" },
            { text: "Pengajuan saya selalu tersimpan rapi.", name: "Ryujin – XI BC 6" },
            { text: "Respon cepat dan nyaman buat curhat.", name: "Lia – XI Animasi 4" },
          ].map((t, i) => (
            <div key={i} className="bg-gradient-to-b from-[#f0f8ff] to-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition border border-[#5B7DB1]/10">
              <p className="italic text-gray-700 text-lg mb-6">"{t.text}"</p>
              <p className="font-bold text-[#395E9D] text-right text-xl">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section id="contact" className="flex flex-col items-center text-center mb-20 px-6">
        <h2 className="text-[#5B7DB1] font-semibold text-lg mb-10">Contact Dan Hubungi Kami</h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
          <div className="flex flex-col gap-6 text-left">
            <div className="flex items-center gap-3"><MapPin className="text-[#5B7DB1]" /><p className="font-medium text-[#5B7DB1]">SMK Taruna Bhakti Depok</p></div>
            <div className="flex items-center gap-3"><Mail className="text-[#5B7DB1]" /><p className="font-medium text-[#5B7DB1]">BKcTB@gmail.com</p></div>
            <div className="flex items-center gap-3"><Phone className="text-[#5B7DB1]" /><p className="font-medium text-[#5B7DB1]">0857 3081 452</p></div>
          </div>
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.9252981443237!2d106.8674123739917!3d-6.3844791936059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ebaff005f277%3A0x9fcd41028665eea8!2sSMKS%20TARUNA%20BHAKTI%20DEPOK!5e1!3m2!1sen!2sid!4v1762948848933!5m2!1sen!2sid"
              width="450"
              height="300"
              className="rounded-lg shadow-md"
              loading="lazy"
            ></iframe>
        </div>
      </section>

      <footer className="bg-[#5B7DB1] text-white py-5 text-center rounded-t-3xl font-semibold">
        © {new Date().getFullYear()} BKcTB | SMK Taruna Bhakti
      </footer>

      {selectedGuru && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-96 relative">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"><X /></button>
            <Image src={selectedGuru.foto} width={160} height={160} alt={selectedGuru.nama} className="rounded-lg mx-auto" />
            <h3 className="text-xl font-semibold text-center mt-2">{selectedGuru.nama}</h3>
            <p className="text-center">Pengalaman: {selectedGuru.pengalaman}</p>
            <p className="text-center italic text-gray-700 mt-3">"{selectedGuru.quote}"</p>

            {!showForm ? (
              <button onClick={() => user ? setShowForm(true) : alert("Login dulu ya!")} className="mt-6 w-full bg-[#5B7DB1] text-white py-3 rounded-full font-bold">
                {user ? "Ajukan Konseling" : "Login Dulu"}
              </button>
            ) : (
              <form onSubmit={handlePengajuan} className="mt-4 space-y-3">
                <input type="text" placeholder="Kelas" value={kelas} onChange={e=>setKelas(e.target.value)} required className="w-full border rounded-lg px-4 py-2" />
                <select value={topik} onChange={e=>setTopik(e.target.value)} required className="w-full border rounded-lg px-4 py-2">
                  <option value="">Pilih Topik</option>
                  <option>Akademik</option><option>Pribadi</option><option>Karir</option><option>Sosial</option>
                </select>
                <select value={jam} onChange={e=>setJam(e.target.value)} required className="w-full border rounded-lg px-4 py-2">
                  <option value="">Pilih Jam</option>
                  <option>08:00-09:00</option><option>09:00-10:00</option><option>10:00-11:00</option><option>13:00-14:00</option>
                </select>
                <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-full font-bold">
                  {loading ? "Mengirim..." : "Kirim Pengajuan"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}


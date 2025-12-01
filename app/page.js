
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Mail, Phone, X, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MainPage({ user }) {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);

  const guruList = [
    { id: 1, nama: "Kasandra Fitriani.N S.Pd", foto: "/guru/bucaca.jpg", pengalaman: "10 tahun", quote: "Manusia tidak rusak, hanya terkadang tersesat. BK membantu menemukan arah pulang." },
    { id: 2, nama: "Heni Siswati S.Psi", foto: "/guru/buheni.jpg", pengalaman: "8 tahun", quote: "Setiap luka punya bahasa. BK membantu menerjemahkannya." },
    { id: 3, nama: "Ika Rafika S.Pd", foto: "/guru/bufika.jpg", pengalaman: "5 tahun", quote: "BK bukan sekadar bantuan; ia adalah jembatan menuju versi dirimu yang lebih kuat." },
    { id: 4, nama: "Nadya Afriliani Ariesta S.Pd", foto: "/guru/bunadia.jpg", pengalaman: "5 tahun", quote: "Keberanian dimulai dari berani cerita." },
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
    } catch {
      alert("Koneksi error");
    }
    setLoading(false);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <>
      {/* NAVBAR FIXED */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#5B7DB1] shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* LOGO FOTO BULAT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5B7DB1] to-[#395E9D] rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/logo.jpg"  // Ganti dengan logo kamu di /public/logo-bk.png
                  alt="BKcTB"
                  width={60}
                  height={60}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">BKcTB</h1>
          </motion.div>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 font-medium">
            {["home", "service", "teacher", "step", "testimoni", "contact"].map((id, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                onClick={() => scrollToSection(id)}
                className="text-white hover:text-gray-200 transition relative group py-2 capitalize"
              >
                {id === "home" ? "Home" : id === "service" ? "Service" : id === "teacher" ? "Teacher" : id.charAt(0).toUpperCase() + id.slice(1)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {user ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hidden md:block text-gray-300 font-medium">
                Halo, <span className="font-bold text-white">{user.name || user.email}</span>
              </motion.p>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/login")}
                className="hidden md:block px-8 py-3 bg-white text-[#5B7DB1] font-bold rounded-full shadow-lg hover:bg-gray-200"
              >
                Login
              </motion.button>
            )}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white z-50">
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden absolute top-full left-0 right-0 bg-[#5B7DB1] shadow-2xl border-t border-white/20">
            <div className="flex flex-col py-6 px-6 space-y-4">
              {["home", "service", "teacher", "step", "testimoni", "contact"].map((id) => (
                <button key={id} onClick={() => scrollToSection(id)} className="text-left text-gray-200 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition text-lg font-medium capitalize">
                  {id === "home" ? "Home" : id === "service" ? "Service" : id === "teacher" ? "Teacher" : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              {!user && (
                <button onClick={() => router.push("/login")} className="mt-4 bg-white text-[#5B7DB1] font-bold py-3 rounded-full">
                  Yuk Konsultasi
                </button>
              )}
            </div>
          </motion.div>
        )}
      </header>

      <main className="pt-24 bg-gray-50 min-h-screen overflow-x-hidden">

        {/* HERO */}
        <motion.section id="home" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative flex flex-col justify-center items-center text-center text-white py-45 px-6"
          style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="bg-black/50 absolute inset-0" />
          <div className="relative z-10 max-w-2xl">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-4xl md:text-5xl font-extrabold mb-4">
              Tempat yang aman untuk bertumbuh dan berbagi.
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-sm md:text-base mb-8">
              Kami ada untuk memberikan solusi, mendengarkan keluh kesah siswa/i. Karena setiap siswa/i berhak untuk didengar dan dipahami
            </motion.p>
            {!user && (
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => router.push("/login")}
                className="bg-white text-[#395E9D] font-bold px-12 py-4 rounded-full shadow-xl hover:scale-110 transition text-lg">
                Login
              </motion.button>
            )}
            {user && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-lg font-semibold">Halo, {user.name || user.email}</motion.p>}
          </div>
        </motion.section>

        {/* SERVICE / LAYANAN */}
        <motion.section id="service" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="py-24 px-6 bg-gradient-to-b from-white to-[#f5f9ff]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <img src="/bk.png" alt="Bimbingan Konseling" className="w-64 md:w-80 lg:w-96 rounded-2xl shadow-2xl border-8 border-white hover:shadow-3xl transition-shadow duration-500 mx-auto" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#395E9D] mb-8 leading-tight">
                Layanan Bimbingan Konseling <span className="block text-[#5B7DB1] mt-2">yang Mudah Diakses</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700 font-medium">
                <p>Web ini membantu para siswa dan siswi <span className="font-bold text-[#395E9D]">SMK Taruna Bhakti</span> mendapatkan layanan bimbingan konseling dengan cepat dan nyaman.</p>
                <p>Bersama <span className="font-bold text-[#5B7DB1]">BKcTB</span>, kita wujudkan generasi yang percaya diri dan siap menghadapi masa depan.</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* MANFAAT & FITUR */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-[#F5F7FB] py-20 px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 text-white">
            <div className="bg-[#395E9D] p-10 rounded-3xl shadow-2xl"><h3 className="text-2xl font-bold mb-6 text-center">Manfaat Pakai BKcTB</h3><ul className="list-disc list-inside space-y-3 text-lg"><li>Pengajuan Terjadwal dan Terdokumentasi</li><li>Meningkatkan Hubungan Siswa dan Guru</li><li>Mudah Digunakan</li><li>Tempat Penjadwal tercepat</li></ul></div>
            <div className="bg-[#7BA4D9] p-10 rounded-3xl shadow-2xl"><h3 className="text-2xl font-bold mb-6 text-center">Fitur Utama</h3><ul className="list-disc list-inside space-y-3 text-lg"><li>Dashboard Guru</li><li>Dashboard Siswa/i</li><li>Form Pengajuan</li><li>Button ACC</li><li>Button Remove</li><li>Riwayat Konseling</li></ul></div>
          </div>
        </motion.div>

        {/* GURU BK */}
        <motion.section id="teacher" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, staggerChildren: 0.2 }} className="py-20 px-6 bg-gradient-to-b from-[#f8fbff] to-white">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="text-center text-4xl font-bold text-[#395E9D] mb-12">Guru Bimbingan Konseling</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto mb-20">
            {guruList.map((guru, i) => (
              <motion.div key={guru.id} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} whileHover={{ y: -12, scale: 1.05 }} className="text-center cursor-pointer group" onClick={() => handleOpenModal(guru)}>
                <div className="mx-auto w-40 h-40 rounded-2xl overflow-hidden shadow-xl mb-4">
                  <Image src={guru.foto} width={160} height={160} alt={guru.nama} className="object-cover group-hover:scale-110 transition" />
                </div>
                <h3 className="font-bold text-[#395E9D]">{guru.nama.split(" ").slice(0,2).join(" ")}</h3>
                <p className="text-sm text-gray-600">Pengalaman {guru.pengalaman}</p>
                <p className="mt-3 italic text-gray-700 text-sm px-2">"{guru.quote}"</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CARA PAKAI */}
        <motion.div id="step" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, staggerChildren: 0.3 }} className="max-w-5xl mx-auto mt-32 px-6">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="text-center text-3xl font-bold text-[#395E9D] mb-12">Cara Menggunakan Web BKcTB</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{step:"I",title:"Login jika kamu sudah mempunyai akunmu",desc:"Jika belum mempunyai silahkan membuat nya di register"},{step:"II",title:"Pilih Guru & Isi Form",desc:"Klik foto guru BK, lalu isi kelas, topik, jam dan tanggal yang kamu inginkan"},{step:"III",title:"Tunggu pengajuanmu di setujui",desc:"Guru BK akan ACC pengajuanmu, lalu datang sesuai jadwal yang disetujui"}].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.2 }} whileHover={{ y: -16, scale: 1.05 }} className="group relative bg-white rounded-3xl shadow-xl overflow-hidden border border-[#5B7DB1]/10 hover:shadow-2xl transition-all duration-500">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#5B7DB1]/10 rounded-full flex items-center justify-center">
                  <span className="text-6xl font-black text-[#5B7DB1]/20">{item.step}</span>
                </div>
                <div className="p-10 pt-16 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#5B7DB1] to-[#395E9D] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">{item.step}</div>
                  <h3 className="text-2xl font-bold text-[#395E9D] mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="h-2 bg-gradient-to-r from-[#5B7DB1] to-[#395E9D]" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TESTIMONI & KONTAK */}
        <motion.section id="testimoni" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="py-20 bg-white">
          <h2 className="text-5xl font-bold text-center text-[#395E9D] mb-12">Testimoni</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
            {[{text:"Membantu banget buat jadwal konseling dari jauh!",name:"Yeji – XI RPL 8"},{text:"Pengajuan saya selalu tersimpan rapi.",name:"Ryujin – XI BC 6"},{text:"Respon cepat dan nyaman buat curhat.",name:"Lia – XI Animasi 4"}].map((t,i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-gradient-to-b from-[#f0f8ff] to-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition border border-[#5B7DB1]/10">
                <p className="italic text-gray-700 text-lg mb-6">"{t.text}"</p>
                <p className="font-bold text-[#395E9D] text-right text-xl">- {t.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col items-center text-center py-20 px-6">
          <h2 className="text-[#5B7DB1] font-semibold text-lg mb-10">Contact Dan Hubungi Kami</h2>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
            <div className="flex flex-col gap-6 text-left">
              <div className="flex items-center gap-3"><MapPin className="text-[#5B7DB1]" /><p className="font-medium text-[#5B7DB1]">SMK Taruna Bhakti Depok</p></div>
              <div className="flex items-center gap-3"><Mail className="text-[#5B7DB1]" /><p className="font-medium text-[#5B7DB1]">BKcTB@gmail.com</p></div>
              <div className="flex items-center gap-3"><Phone className="text-[#5B7DB1]" /><p className="font-medium text-[#5B7DB1]">0857 3081 452</p></div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.9252981443237!2d106.8674123739917!3d-6.3844791936059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ebaff005f277%3A0x9fcd41028665eea8!2sSMKS%20TARUNA%20BHAKTI%20DEPOK!5e1!3m2!1sen!2sid!4v1762948848933!5m2!1sen!2sid"
              width="450" height="300" className="rounded-lg shadow-md" loading="lazy" title="Lokasi"></iframe>
          </div>
        </motion.section>

        <footer className="bg-[#5B7DB1] text-white py-5 text-center rounded-t-3xl font-semibold">
          © {new Date().getFullYear()} BKcTB | SMK Taruna Bhakti
        </footer>

        {/* MODAL GURU */}
        {selectedGuru && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white rounded-xl p-6 w-96 relative max-h-screen overflow-y-auto">
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
            </motion.div>
          </motion.div>
        )}
      </main>
    </>
  );
}
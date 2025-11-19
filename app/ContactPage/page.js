"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen text-[#2C3E50] flex flex-col justify-between">
      {/* Navbar */}
      <nav className="bg-[#5B7DB1] text-white px-8 py-3 mx-6 mt-4 mb-10 rounded-full flex items-center justify-between shadow-md relative">
        <h1 className="font-bold text-2xl tracking-wide cursor-pointer transition-transform duration-300 active:scale-110">BKcTB</h1>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 font-semibold">
    <Link
      href="/LandingPage"
      className="relative hover:text-white transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
    >
      Home
    </Link>

    <Link
      href="/AccesPage"
      className="relative hover:text-white transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
    >
      Access
    </Link>

    <Link
      href="/ContactPage"
      className="relative hover:text-white transition-colors after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
    >
      Contact
    </Link>
  </div>

      </nav>

      {/* Contact Section */}
      <section className="flex flex-col items-center text-center mb-20">
        <h2 className="text-[#5B7DB1] font-semibold text-lg mb-10">
          Contact Dan Hubungi Kami
        </h2>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
          {/* Kiri - Info Kontak */}
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

          {/* Kanan - Peta */}
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

      {/* Footer */}
        <footer className="bg-[#5B7DB1] text-white py-5 text-center rounded-t-3xl font-semibold">
        © {new Date().getFullYear()} BKcTB | SMK Taruna Bhakti
      </footer>
    
    </main>
  );
}

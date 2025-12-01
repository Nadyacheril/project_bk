// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     unoptimized: true   // ← ini baris ajaibnya
//   }
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,        // ← ini udah ada
    domains: [],              // ← ini juga biasa ada
    // TAMBAHIN BARIS INI DI BAWAHNYA:
    loader: "default",        // ← INI YANG BIKIN LANGSUNG MUNCUL TANPA HAPUS .next
  },
};

export default nextConfig;
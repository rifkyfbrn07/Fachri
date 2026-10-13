/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Tidak ada remote image yang digunakan; placeholder SVG disimpan lokal.
    unoptimized: true,
  },
};

export default nextConfig;

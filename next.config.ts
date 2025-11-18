import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'cdn.sanity.io', 'sic-files.iutripura.in'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "localhost", "tesla-shop-nextjs.vercel.app"],
  },
};

module.exports = nextConfig;

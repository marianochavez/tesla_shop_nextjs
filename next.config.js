/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://res.cloudinary.com/chavedo/", "localhost", process.env.HOST_NAME],
  },
};

module.exports = nextConfig;

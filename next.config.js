/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.unsplash.com", "media.istockphoto.com"],
  },
};

module.exports = nextConfig;

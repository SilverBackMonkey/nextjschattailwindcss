/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost:3000",
      "afc-redux.vercel.app",
      "www.allfreechips.com"
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
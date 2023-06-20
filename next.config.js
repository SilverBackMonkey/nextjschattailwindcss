/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "allfreechips.com",
      "www.allfreechips.com",
      "afc-redux.vercel.app",
      "radiumpowered.com",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

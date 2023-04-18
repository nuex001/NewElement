/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: ["gateway.ipfscdn.io"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["gateway.ipfscdn.io", "ipfs-2.thirdwebcdn.com"],
  },
};

module.exports = nextConfig;

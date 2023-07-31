/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["*.ipfs.cf-ipfs.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

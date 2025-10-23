const { withContentlayer } = require("next-contentlayer2");

import("./env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  // Handle ES modules properly
  transpilePackages: ["shiki", "rehype-pretty-code"],
  // Enable proper ES module resolution
  webpack: (config, { isServer }) => {
    // Handle ES modules in dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // Ensure proper module resolution for ES modules
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'shiki': 'shiki',
        'rehype-pretty-code': 'rehype-pretty-code',
      });
    }

    return config;
  },
};

module.exports = withContentlayer(nextConfig);

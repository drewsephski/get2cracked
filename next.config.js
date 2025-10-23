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
  webpack: (config, { isServer }) => {
    // Configure for ES module compatibility
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Handle shiki ES module
    config.module.rules.push({
      test: /\.mjs$/,
      type: 'javascript/esm',
    });

    return config;
  },
};

module.exports = withContentlayer(nextConfig);

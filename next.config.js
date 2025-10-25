const { withContentlayer } = require("next-contentlayer2");
const path = require('path');

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
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  // Handle ES modules properly
  transpilePackages: [
    'rehype-pretty-code',
    'shiki',
    // include any MDX/rehype tooling used server-side
  ],
  webpack: (config) => {
    // Ensure .mjs is treated as ESM
    config.resolve.extensionAlias = {
      '.js': ['.js', '.mjs'],
    };
    return config;
  },
};

module.exports = withContentlayer(nextConfig);

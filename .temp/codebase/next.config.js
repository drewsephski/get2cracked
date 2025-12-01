const { withContentlayer } = require("next-contentlayer2");
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '',
  trailingSlash: true,
  images: {
    domains: [
      'localhost',
      'getcracked.lol',
      'avatars.githubusercontent.com',
      'get2cracked.netlify.app',
      'lh3.googleusercontent.com',
      'randomuser.me',
      'assets.aceternity.com'
    ],
    loader: 'default',
    unoptimized: false,
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

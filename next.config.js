const { withContentlayer } = require("next-contentlayer2");
const path = require('path');

// Only run this once to avoid issues with Next.js HMR
if (!process.env.NEXT_PUBLIC_APP_URL) {
  require('./env.mjs');
}

// Determine if we're in production
const isProduction = process.env.NODE_ENV === 'production';
const assetPrefix = isProduction ? process.env.NEXT_PUBLIC_APP_URL || '' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: assetPrefix,
  basePath: isProduction ? '' : '',
  trailingSlash: true,
  images: {
    domains: [
      'localhost',
      'getcracked.lol',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'randomuser.me',
      'assets.aceternity.com'
    ],
    path: isProduction ? `${assetPrefix}/_next/image` : '/_next/image',
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

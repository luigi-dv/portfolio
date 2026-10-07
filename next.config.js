const createMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'opengraph.githubassets.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

// Case studies are MDX files in src/content, loaded by the /work/[slug] route
const withMDX = createMDX();

module.exports = withMDX(nextConfig);

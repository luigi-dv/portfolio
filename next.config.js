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

module.exports = nextConfig;

const createMDX = require('@next/mdx');

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Content Security Policy. Everything is served from this origin: fonts are
 * self-hosted by next/font and Vercel Analytics/Speed Insights load from
 * /_vercel. 'unsafe-inline' is needed for the inline scripts Next.js and
 * next-themes emit on statically rendered pages (nonces require dynamic
 * rendering, which would turn off ISR).
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  // Dev needs eval and websockets for hot reload, so CSP is production-only
  ...(isProduction
    ? [{ key: 'Content-Security-Policy', value: contentSecurityPolicy }]
    : []),
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ headers: securityHeaders, source: '/:path*' }];
  },
  poweredByHeader: false,
};

// Case studies are MDX files in src/content, loaded by the /work/[slug] route
const withMDX = createMDX();

module.exports = withMDX(nextConfig);

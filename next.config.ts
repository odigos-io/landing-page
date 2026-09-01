import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: [
      '@odigos/ui-kit',
      '@splinetool/react-spline',
      '@splinetool/runtime',
      '@uiw/react-markdown-preview',
      '@vis.gl/react-google-maps',
      'gray-matter',
      'next',
      'next-plausible',
      'react',
      'react-dom',
      'react-type-animation',
      'styled-components',
      'zustand',
    ],
  },
  turbopack: {},

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        /* Hashed build assets never change under the same URL. */
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }],
      },
    ];
  },
};

export default nextConfig;

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
};

export default nextConfig;

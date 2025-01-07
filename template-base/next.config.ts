import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/nextjs-app-template',
  assetPrefix: '/nextjs-app-template',
  images: {
    unoptimized: true,
  },
  publicRuntimeConfig: {
    basePath: '/nextjs-app-template',
  },
};

export default nextConfig;

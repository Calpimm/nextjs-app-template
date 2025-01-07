import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/nextjs-app-template',
  assetPrefix: '/nextjs-app-template',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

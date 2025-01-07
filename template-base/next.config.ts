import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Tells Next.js to produce a static export in the `out/` folder
  output: 'export',

  // Tells Next.js to serve everything under /nextjs-app-template/ on GitHub Pages
  basePath: '/nextjs-app-template',
  assetPrefix: '/nextjs-app-template',

  // For static export, we disable Next.js image optimizer
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
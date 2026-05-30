import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/review/bach-khoa',
        destination: '/review/bach-khoa-hn',
        permanent: true,
      },
      {
        source: '/moi-truong-hoc-tap-hust',
        destination: '/review/bach-khoa-hn',
        permanent: true,
      },
      {
        source: '/moi-truong-hoc-tap-hust/',
        destination: '/review/bach-khoa-hn',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/',
        permanent: true,
      },
      {
        source: '/40',
        destination: '/',
        permanent: true,
      },
      {
        source: '/5.0',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      // TEMP: 모든 도메인 허용 — 추후 실제 CDN 도메인으로 교체 필요
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      // TEMP: 위시 상품 이미지 임시
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },

  /** NOTE: 실기기 테스트 시 LAN IP를 .env.local의 NEXT_PUBLIC_DEV_ORIGIN에 추가 */
  allowedDevOrigins: process.env.NEXT_PUBLIC_DEV_ORIGIN ? [process.env.NEXT_PUBLIC_DEV_ORIGIN] : [],
};

export default nextConfig;

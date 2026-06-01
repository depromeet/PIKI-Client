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

  rewrites: async () => {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`,
      },
    ];
  },

  /** NOTE: localhost가 아닌 경우 추가 필요 */
  allowedDevOrigins: [],
};

export default nextConfig;

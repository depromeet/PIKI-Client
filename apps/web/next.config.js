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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // TEMP: 유저 프사 임시 이미지
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      // TEMP: 위시 상품 이미지 임시
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },

  rewrites: async () => [
    {
      source: '/api/v1/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`,
    },
  ],
};

export default nextConfig;

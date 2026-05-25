/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: new URL('../..', import.meta.url).pathname,
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

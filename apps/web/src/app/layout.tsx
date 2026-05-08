import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import React from 'react';

import { cn } from '@/utils/cn';

import Providers from '../components/Providers';
import '../styles/globals.css';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  preload: true,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Helvetica Neue',
    'sans-serif',
  ],
});

const metadataBaseUrl = process.env.NEXT_PUBLIC_WEB_URL ?? 'https://piki.day';

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: 'piki',
  description: '흩어진 위시를 한곳에, 결정은 1:1로!',
  openGraph: {
    title: 'piki',
    description: '흩어진 위시를 한곳에, 결정은 1:1로!',
    siteName: 'piki',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'piki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'piki',
    description: '흩어진 위시를 한곳에, 결정은 1:1로!',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/images/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F4F4F6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /** TEMP: 임시 배경색 추가 */
    <html lang="ko" className={cn(pretendard.className, 'h-full bg-gray-100 antialiased')}>
      <body className="mx-auto my-0 h-full max-w-120 bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

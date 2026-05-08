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

export const metadata: Metadata = {
  title: 'piki',
  description: '쌓인 위시리스트에서 먼저 살 것을 골라주는 소비 결정 서비스',
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

import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return children;
}

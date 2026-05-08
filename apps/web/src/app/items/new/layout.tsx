import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function NewItemLayout({ children }: { children: React.ReactNode }) {
  return children;
}

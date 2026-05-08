import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function TournamentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

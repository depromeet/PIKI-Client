import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#F4F4F6',
};

export default function TournamentLoadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

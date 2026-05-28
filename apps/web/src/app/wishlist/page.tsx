import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getQueryClient } from '@/utils/queryClient';

import { getWishlist } from './_apis/getWishlist';
import TournamentHistoryContent from './_components/TournamentHistoryContent';
import WishlistContent from './_components/WishlistContent';
import WishlistSkeleton from './_components/WishlistSkeleton';
import type { WishTabT } from './_types/wishTypes';

type WishlistPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

const getActiveWishTab = (tab?: string): WishTabT => {
  if (tab === 'tournament') return '토너먼트 기록';
  return '저장한 위시템';
};

async function WishlistPage({ searchParams }: WishlistPageProps) {
  const { tab } = await searchParams;
  const activeTab = getActiveWishTab(tab);
  const queryClient = getQueryClient();

  if (activeTab === '저장한 위시템') {
    await queryClient.prefetchQuery({
      queryKey: ['wishlists'],
      queryFn: getWishlist,
    });
  }
  // TODO: if (activeTab === '토너먼트 기록') await prefetch tournamentHistory; // API 생기면

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {activeTab === '토너먼트 기록' && (
        <Suspense>
          <TournamentHistoryContent />
        </Suspense>
      )}
      {activeTab === '저장한 위시템' && (
        <Suspense fallback={<WishlistSkeleton />}>
          <WishlistContent />
        </Suspense>
      )}
    </HydrationBoundary>
  );
}

export default WishlistPage;

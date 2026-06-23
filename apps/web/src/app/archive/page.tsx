import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getTournamentList } from '@/apis/getTournamentList';
import type { WishlistPageT } from '@/apis/getWishlist';
import { getWishlist } from '@/apis/getWishlist';
import { getQueryClient } from '@/utils/queryClient';

import TournamentHistoryContent from './_components/TournamentHistoryContent';
import WishlistContent from './_components/WishlistContent';
import WishlistLayout from './_components/WishlistLayout';
import WishlistSkeleton from './_components/WishlistSkeleton';
import type { WishTabT } from './_types/wish';

type ArchivePageProps = {
  searchParams: Promise<{ tab?: string }>;
};

const getActiveWishTab = (tab?: string): WishTabT => {
  if (tab === 'tournament') return '토너먼트 기록';
  return '저장한 위시템';
};

async function ArchivePage({ searchParams }: ArchivePageProps) {
  const { tab } = await searchParams;
  const activeTab = getActiveWishTab(tab);
  const queryClient = getQueryClient();

  if (activeTab === '저장한 위시템') {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['wishlists'],
      queryFn: ({ pageParam }) => getWishlist(pageParam as string | null),
      initialPageParam: null as string | null,
      getNextPageParam: (page: WishlistPageT) => (page.hasNext ? page.nextCursor : null),
    });
  } else if (activeTab === '토너먼트 기록')
    await queryClient.prefetchQuery({
      queryKey: ['tournamentList', []],
      queryFn: () => getTournamentList(),
    });

  return (
    <WishlistLayout>
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
    </WishlistLayout>
  );
}

export default ArchivePage;

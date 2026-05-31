'use client';

import { useEffect } from 'react';

import { toast } from 'sonner';

import { useGetWishlist } from '@/app/wishlist/_hooks/useGetWishlist';
import Button from '@/components/common/button';
import { Toaster } from '@/components/common/toast';

import { useGetTournament } from '../../_hooks/useGetTournament';
import { MAX_SELECT, MIN_SELECT } from '../_consts/selectLimits';
import { usePostTournamentItemsByWish } from '../_hooks/usePostTournamentItemsByWish';
import useWishSelection from '../_hooks/useWishSelection';
import WishSelectCard from './WishSelectCard';
import WishSelectHeader from './WishSelectHeader';

type ByWishContentProps = {
  tournamentId: number;
};

function ByWishContent({ tournamentId }: ByWishContentProps) {
  const { selectedIds, isMaxExceeded, handleSelect } = useWishSelection(MAX_SELECT);
  const { data: wishlistData } = useGetWishlist();
  const { tournamentData } = useGetTournament(tournamentId);
  const { postTournamentItemsByWishMutation, isPostTournamentItemsByWishPending } =
    usePostTournamentItemsByWish(tournamentId);

  const existingItemIds = new Set(tournamentData.pending?.items.map(i => i.itemId) ?? []);
  const items = wishlistData?.filter(
    item => item.status !== 'failed' && item.itemId != null && !existingItemIds.has(item.itemId)
  ) ?? [];

  useEffect(() => {
    if (!isMaxExceeded) return;
    toast.warning(`최대 ${MAX_SELECT}개까지 상품을 담을 수 있어요.`);
  }, [isMaxExceeded]);

  const handleNext = () => {
    const itemIds = items
      .filter(item => selectedIds.includes(item.id))
      .map(item => item.itemId as number);
    postTournamentItemsByWishMutation(itemIds);
  };

  return (
    <div className="flex h-full flex-col">
      <WishSelectHeader
        selectedCount={selectedIds.length}
        totalCount={items.length}
        tournamentCandidateCount={tournamentData.pending?.items.length ?? 0}
        isMaxExceeded={isMaxExceeded}
      />

      <main className="mt-4 hide-scrollbar flex flex-1 flex-col overflow-y-auto pb-32">
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          {items.map(item => (
            <WishSelectCard
              key={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              isSelected={selectedIds.includes(item.id)}
              onSelect={() => handleSelect(item.id)}
            />
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-120 -translate-x-1/2 gap-[10px] px-5 py-3">
        <Button variant="secondary" size="lg" onClick={() => history.back()}>
          뒤로
        </Button>
        <Button
          variant="primary"
          size="lg"
          disabled={selectedIds.length < MIN_SELECT || isPostTournamentItemsByWishPending}
          onClick={handleNext}
        >
          다음
        </Button>
      </div>

      <Toaster />
    </div>
  );
}

export default ByWishContent;

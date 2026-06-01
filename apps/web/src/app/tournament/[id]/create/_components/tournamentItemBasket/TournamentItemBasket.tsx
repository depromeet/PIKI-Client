import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AddIcon from '@/assets/icons/fill/add.svg';
import Button from '@/components/common/button';
import type { TournamentItemT } from '@/types/tournament';

import basketImg from '../../_assets/basket-gray.png';
import { ITEMS_PER_BASKET } from '../../_consts/tournamentItemBasket';
import AddWishDialog from '../addWishDialog/AddWishDialog';
import EmptyBasketSlot from './EmptyBasketSlot';
import TournamentBasketItem from './TournamentBasketItem';
import TournamentItemFailedModal from './TournamentItemFailedDrawer';

type TournamentItemBasketProps = {
  basketIndex: number;
  items: TournamentItemT[];
};

function TournamentItemBasket({ basketIndex, items }: TournamentItemBasketProps) {
  const router = useRouter();
  const [failedDrawerOpen, setFailedDrawerOpen] = useState(false);

  const handleItemClick = (item: TournamentItemBasketProps['items'][number]) => {
    if (item.status === 'READY') router.push(`/item/${item.tournamentItemId}/edit?type=tournament`);
    if (item.status === 'FAILED') setFailedDrawerOpen(true);
  };

  return (
    <div className="relative mx-auto aspect-356/464 w-full">
      <Image
        src={basketImg}
        alt={`장바구니 ${basketIndex + 1}`}
        fill
        sizes="(max-width: 480px) 100vw, 480px"
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative grid grid-cols-2 gap-x-6 gap-y-5">
          {Array.from({ length: ITEMS_PER_BASKET }, (_, slotIndex) => {
            const item = items[slotIndex];
            if (item)
              return (
                <TournamentBasketItem
                  key={item.tournamentItemId}
                  item={item}
                  index={slotIndex}
                  onClick={() => handleItemClick(item)}
                />
              );
            return <EmptyBasketSlot key={`empty-${slotIndex}`} slotIndex={slotIndex} />;
          })}
          <AddWishDialog
            trigger={
              <Button
                icon="only"
                aria-label="위시 아이템 추가"
                className="absolute top-1/2 left-1/2 size-[60px] -translate-x-1/2 -translate-y-1/2 shadow-lg"
              >
                <AddIcon width={32} height={32} className="text-white" aria-hidden />
              </Button>
            }
          />
        </div>
      </div>
      <TournamentItemFailedModal
        open={failedDrawerOpen}
        onClose={() => setFailedDrawerOpen(false)}
      />
    </div>
  );
}

export default TournamentItemBasket;

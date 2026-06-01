import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import AddIcon from '@/assets/icons/fill/add.svg';
import Button from '@/components/common/button';
import type { TournamentItemT } from '@/types/tournament';
import { parseIdParam } from '@/utils/parseIdParam';

import basketImg from '../../_assets/basket-gray.png';
import { ITEMS_PER_BASKET } from '../../_consts/tournamentItemBasket';
import AddWishDialog from '../add-wish-dialog/AddWishDialog';
import EmptyBasketSlot from './EmptyBasketSlot';
import TournamentBasketItem from './TournamentBasketItem';
import TournamentItemFailedModal from './TournamentItemFailedDrawer';

type TournamentItemBasketProps = {
  basketIndex: number;
  items: TournamentItemT[];
};

function TournamentItemBasket({ basketIndex, items }: TournamentItemBasketProps) {
  const { id: _tournamentId } = useParams<{ id: string }>();
  const tournamentId = parseIdParam(_tournamentId);

  const [failedItem, setFailedItem] = useState<TournamentItemT | null>(null);

  const handleItemClick = (item: TournamentItemBasketProps['items'][number]) => {
    if (!tournamentId) return;

    // if (item.status === 'READY')
    // router.push(`/tournament/${tournamentId}/item/${item.tournamentItemId}`); // TODO: 변경된 디자인에 맞춰 수정 필요

    if (item.status === 'FAILED') setFailedItem(item);
  };

  return (
    <div className="relative h-full min-h-0 w-full">
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
      {failedItem && tournamentId && (
        <TournamentItemFailedModal
          open
          tournamentId={tournamentId}
          tournamentItemId={failedItem.tournamentItemId}
          onClose={() => setFailedItem(null)}
        />
      )}
    </div>
  );
}

export default TournamentItemBasket;

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import AddIcon from '@/assets/icons/fill/add.svg';
import Button from '@/components/common/button';
import { Dialog, DialogTrigger } from '@/components/common/dialog';
import GetItemDialogContent from '@/components/common/get-item-dialog';
import type { TournamentItemT } from '@/types/tournament';
import { parseIdParam } from '@/utils/parseIdParam';

import basketImg from '../../_assets/basket-gray.png';
import { ITEMS_PER_BASKET } from '../../_consts/tournamentItemBasket';
import EmptyBasketSlot from './EmptyBasketSlot';
import TournamentBasketItem from './TournamentBasketItem';
import TournamentItemFailedModal from './TournamentItemFailedDrawer';

type TournamentItemBasketProps = {
  basketIndex: number;
  items: TournamentItemT[];
  maxHeight?: number;
};

function TournamentItemBasket({ basketIndex, items, maxHeight }: TournamentItemBasketProps) {
  const { id: _tournamentId } = useParams<{ id: string }>();
  const tournamentId = parseIdParam(_tournamentId);
  const basketMaxWidth = maxHeight ? (maxHeight * 356) / 464 : null;

  const [failedItem, setFailedItem] = useState<TournamentItemT | null>(null);

  const handleItemClick = (item: TournamentItemBasketProps['items'][number]) => {
    if (!tournamentId) return;

    // if (item.status === 'READY')
    // router.push(ROUTES.TOURNAMENT_ITEM_EDIT(String(tournamentId), String(item.tournamentItemId))); // TODO: 변경된 디자인에 맞춰 수정 필요

    if (item.status === 'FAILED') setFailedItem(item);
  };

  return (
    <div
      className="relative mx-auto aspect-356/464 w-full max-w-full"
      {...(basketMaxWidth ? { style: { maxWidth: basketMaxWidth } } : {})}
    >
      <Image
        src={basketImg}
        alt={`장바구니 ${basketIndex + 1}`}
        fill
        sizes="(max-width: 480px) 100vw, 480px"
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative grid w-[45%] grid-cols-2 gap-x-6 gap-y-5">
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

          <Dialog>
            <DialogTrigger asChild>
              <Button
                icon="only"
                aria-label="위시 아이템 추가"
                className="absolute top-1/2 left-1/2 size-[60px] -translate-x-1/2 -translate-y-1/2 shadow-lg"
              >
                <AddIcon width={32} height={32} className="text-white" aria-hidden />
              </Button>
            </DialogTrigger>
            <GetItemDialogContent type="tournament" />
          </Dialog>
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

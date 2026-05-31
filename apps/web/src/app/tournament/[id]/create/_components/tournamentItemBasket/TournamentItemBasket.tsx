import Image from 'next/image';

import AddIcon from '@/assets/icons/fill/add.svg';
import basketImg from '@/assets/images/basket-gray.png';
import Button from '@/components/common/button';
import type { TournamentItemT } from '@/types/tournament';

import { ITEMS_PER_BASKET } from '../../_consts/tournamentItemBasketConsts';
import AddWishDialog from '../addWishDialog/AddWishDialog';
import EmptyBasketSlot from './EmptyBasketSlot';
import TournamentBasketItem from './TournamentBasketItem';

type TournamentItemBasketProps = {
  basketIndex: number;
  items: TournamentItemT[];
};

function TournamentItemBasket({ basketIndex, items }: TournamentItemBasketProps) {
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
        <div className="relative grid w-[45%] grid-cols-2 gap-4">
          {Array.from({ length: ITEMS_PER_BASKET }, (_, slotIndex) => {
            const item = items[slotIndex];
            if (item)
              return (
                <TournamentBasketItem key={item.tournamentItemId} item={item} index={slotIndex} />
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
    </div>
  );
}

export default TournamentItemBasket;

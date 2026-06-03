import ProductImage from '@/app/tournament/[id]/create/_components/product-image';

import { EMPTY_BASKET_IMAGES } from '../../_consts/tournamentItemBasket';

type EmptyBasketSlotProps = {
  slotIndex: number;
  isDepositClosed?: boolean;
};

function EmptyBasketSlot({ slotIndex, isDepositClosed = false }: EmptyBasketSlotProps) {
  if (isDepositClosed) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-[3px] border-white bg-white/40 shadow-[0_0_8px_rgba(0,0,0,0.16)]" />
    );
  }

  const imageUrl = EMPTY_BASKET_IMAGES[slotIndex % EMPTY_BASKET_IMAGES.length];

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-[3px] border-white bg-gray-50 shadow-[0_0_8px_rgba(0,0,0,0.16)]">
      <ProductImage src={imageUrl} size="lg" fill alt="" />
    </div>
  );
}

export default EmptyBasketSlot;

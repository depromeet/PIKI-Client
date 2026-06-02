import ProductImage from '@/app/tournament/[id]/create/_components/product-image';

import { EMPTY_BASKET_IMAGES } from '../../_consts/tournamentItemBasket';

type EmptyBasketSlotProps = {
  slotIndex: number;
};

function EmptyBasketSlot({ slotIndex }: EmptyBasketSlotProps) {
  const imageUrl = EMPTY_BASKET_IMAGES[slotIndex % EMPTY_BASKET_IMAGES.length];

  return (
    <div className="relative box-border size-[68px] shrink-0 overflow-hidden rounded-[16px] border-[3px] border-white bg-gray-50 shadow-[0_0_8px_rgba(0,0,0,0.16)]">
      <ProductImage src={imageUrl} size="lg" fill alt="" />
    </div>
  );
}

export default EmptyBasketSlot;

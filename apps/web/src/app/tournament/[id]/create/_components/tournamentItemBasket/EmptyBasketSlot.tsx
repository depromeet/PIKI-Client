import ProductImage from '@/components/common/product-image';

import { EMPTY_BASKET_IMAGES } from '../../_consts/tournamentItemBasketConsts';

type EmptyBasketSlotProps = {
  slotIndex: number;
};

function EmptyBasketSlot({ slotIndex }: EmptyBasketSlotProps) {
  const imageUrl = EMPTY_BASKET_IMAGES[slotIndex % EMPTY_BASKET_IMAGES.length];

  return (
    <div className="relative aspect-square">
      <ProductImage src={imageUrl} size="sm" fill alt="" />
    </div>
  );
}

export default EmptyBasketSlot;

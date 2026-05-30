import type { StaticImageData } from 'next/image';

import ProductImage from '@/components/common/product-image';

type TournamentBasketItemProps = {
  index: number;
  url?: string | StaticImageData;
};

function TournamentBasketItem({ index, url }: TournamentBasketItemProps) {
  return (
    <div className="relative aspect-square">
      <ProductImage src={url} size="sm" fill alt={`토너먼트 아이템 ${index + 1}`} />
    </div>
  );
}

export default TournamentBasketItem;

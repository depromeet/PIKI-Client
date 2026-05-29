import type { StaticImageData } from 'next/image';

import ProductImage from '@/components/common/product-image';
import type { TournamentItemStatusT } from '@/types/tournament';

type WishItemProps = {
  index: number;
  url?: string | StaticImageData;
  status?: TournamentItemStatusT;
};

function WishItem({ index, url, status }: WishItemProps) {
  return (
    <div className="relative aspect-square">
      <ProductImage src={url} size="sm" fill alt={`위시 아이템 ${index + 1}`} parsingStatus={status} />
    </div>
  );
}

export default WishItem;

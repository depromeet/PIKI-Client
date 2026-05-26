import type { StaticImageData } from 'next/image';

import ProductImage from '@/components/common/product-image';

type WishItemProps = {
  index: number;
  url?: string | StaticImageData;
};

function WishItem({ index, url }: WishItemProps) {
  return (
    <div className="relative aspect-square">
      <ProductImage src={url} size="sm" fill alt={`위시 아이템 ${index + 1}`} />
    </div>
  );
}

export default WishItem;

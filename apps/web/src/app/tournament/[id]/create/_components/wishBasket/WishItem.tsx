import type { StaticImageData } from 'next/image';

import ProductImage from '@/components/common/product-image';
import type { TournamentItemStatusT } from '@/types/tournament';
import { cn } from '@/utils/cn';

type WishItemProps = {
  index: number;
  url?: string | StaticImageData;
  status?: TournamentItemStatusT;
  onClick?: () => void;
};

function WishItem({ index, url, status, onClick }: WishItemProps) {
  const isClickable = status === 'READY' || status === 'FAILED';

  return (
    <div
      className={cn('relative aspect-square', isClickable ? 'cursor-pointer' : 'pointer-events-none')}
      onClick={isClickable ? onClick : undefined}
    >
      <ProductImage src={url} size="sm" fill alt={`위시 아이템 ${index + 1}`} parsingStatus={status} />
    </div>
  );
}

export default WishItem;

import ProductImage from '@/app/tournament/[id]/create/_components/product-image';
import { cn } from '@/utils/cn';

import type { TournamentPendingItemT } from '../../../_common/_types/tournamentResponse';

type TournamentBasketItemProps = {
  item: TournamentPendingItemT;
  index: number;
  onClick?: () => void;
};

function TournamentBasketItem({ item, index, onClick }: TournamentBasketItemProps) {
  return (
    <div
      className={cn(
        'relative aspect-square w-full overflow-hidden shadow-[0_0_8px_rgba(0,0,0,0.16)]',
        item.status === 'READY' || (item.status === 'FAILED' && 'cursor-pointer')
      )}
      onClick={onClick}
    >
      <ProductImage
        {...(item.imageUrl ? { src: item.imageUrl } : {})}
        size="sm"
        fill
        alt={`토너먼트 아이템 ${index + 1}`}
        parsingStatus={item.status}
      />
    </div>
  );
}

export default TournamentBasketItem;

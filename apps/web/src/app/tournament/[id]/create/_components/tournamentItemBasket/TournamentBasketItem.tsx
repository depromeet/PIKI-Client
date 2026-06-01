import ProductImage from '@/components/common/product-image';
import type { TournamentItemT } from '@/types/tournament';
import { cn } from '@/utils/cn';

type TournamentBasketItemProps = {
  item: TournamentItemT;
  index: number;
  onClick?: () => void;
};

function TournamentBasketItem({ item, index, onClick }: TournamentBasketItemProps) {
  return (
    <div
      className={cn(
        'relative box-border size-[68px] shrink-0 overflow-hidden rounded-[16px] border-[3px] border-white bg-gray-50 shadow-[0_0_8px_rgba(0,0,0,0.16)]',
        item.status === 'READY' || (item.status === 'FAILED' && 'cursor-pointer')
      )}
      onClick={onClick}
    >
      <ProductImage
        {...(item.imageUrl ? { src: item.imageUrl } : {})}
        size="lg"
        fill
        alt={`토너먼트 아이템 ${index + 1}`}
        parsingStatus={item.status}
      />
    </div>
  );
}

export default TournamentBasketItem;

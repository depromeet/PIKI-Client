import ProductImage from '@/components/common/product-image';
import type { TournamentItemT } from '@/types/tournament';

type TournamentBasketItemProps = {
  item: TournamentItemT;
  index: number;
  onClick?: () => void;
};

function TournamentBasketItem({ item, index, onClick }: TournamentBasketItemProps) {
  return (
    <div
      className={`relative aspect-square${item.status === 'READY' || item.status === 'FAILED' ? ' cursor-pointer' : ''}`}
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

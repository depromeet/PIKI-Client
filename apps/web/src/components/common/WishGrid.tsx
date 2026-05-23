import Link from 'next/link';

import WishCard from '@/components/common/WishCard';
import WishFailedCard from '@/components/common/WishFailedCard';

export type WishItemStatusT = 'ok' | 'failed';

export type WishItemT = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  status?: WishItemStatusT;
};

type WishGridProps = {
  items: WishItemT[];
};

function WishGrid({ items }: WishGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-3">
      {items.map(item =>
        item.status === 'failed' ? (
          <WishFailedCard key={item.id} />
        ) : (
          <Link
            key={item.id}
            href={`/items/${item.id}/edit?type=wish`}
            className="transition-colors active:opacity-80"
          >
            <WishCard name={item.name} price={item.price} imageUrl={item.imageUrl} />
          </Link>
        )
      )}
    </div>
  );
}

export default WishGrid;

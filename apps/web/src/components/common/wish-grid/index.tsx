import Link from 'next/link';

import { CheckboxEmptyIconFill, CheckboxSelectedIconFill } from '@/assets/icons';
import WishCard from '@/components/common/wish-card';
import WishFailedCard from '@/components/common/wish-failed-card';

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
  isDeleteMode?: boolean;
  selectedIds?: Set<number>;
  onToggleSelect?: (id: number) => void;
};

function WishGrid({ items, isDeleteMode = false, selectedIds, onToggleSelect }: WishGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-3">
      {items.map(item => {
        if (item.status === 'failed') {
          return <WishFailedCard key={item.id} />;
        }

        const card = <WishCard name={item.name} price={item.price} imageUrl={item.imageUrl} />;

        if (isDeleteMode) {
          const isSelected = selectedIds?.has(item.id) ?? false;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggleSelect?.(item.id)}
              aria-pressed={isSelected}
              className="relative text-left transition-opacity active:opacity-80"
            >
              {card}
              <span className="pointer-events-none absolute top-3 left-3 z-10 size-6">
                {isSelected ? (
                  <CheckboxSelectedIconFill className="size-6 text-icon-accent" />
                ) : (
                  <CheckboxEmptyIconFill className="size-6 text-gray-500" />
                )}
              </span>
            </button>
          );
        }

        return (
          <Link
            key={item.id}
            href={`/item/${item.id}/edit?type=wish`}
            className="transition-colors active:opacity-80"
          >
            {card}
          </Link>
        );
      })}
    </div>
  );
}

export default WishGrid;

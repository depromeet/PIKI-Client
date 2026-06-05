import WishCard from '@/app/wishlist/_components/wish-grid/WishCard';
import WishFailedCard from '@/app/wishlist/_components/wish-grid/WishFailedCard';
import { CheckboxEmptyIconFill, CheckboxSelectedIconFill } from '@/assets/icons';

import type { WishItemT } from '../../_types/wish';
import WishProcessingCard from './WishProcessingCard';

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
        if (item.status === 'FAILED') return <WishFailedCard key={item.id} wishId={item.id} />;
        else if (item.status === 'PROCESSING') return <WishProcessingCard key={item.id} />;

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
                  <CheckboxSelectedIconFill className="size-6 text-uac-light" />
                ) : (
                  <CheckboxEmptyIconFill className="size-6 text-[#636366]" />
                )}
              </span>
            </button>
          );
        }

        return <>{card}</>;
      })}
    </div>
  );
}

export default WishGrid;

import type { WishItemT } from '@/components/common/wish-grid';
import WishGrid from '@/components/common/wish-grid';

type WishlistTabContentProps = {
  items: WishItemT[];
  isDeleteMode?: boolean;
  selectedIds?: Set<number>;
  onToggleSelect?: (id: number) => void;
};

function WishlistTabContent({
  items,
  isDeleteMode,
  selectedIds,
  onToggleSelect,
}: WishlistTabContentProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-gray-300">
        <p className="body-1-medium">아직 저장한 위시템이 없어요</p>
      </div>
    );
  }

  return (
    <WishGrid
      items={items}
      isDeleteMode={isDeleteMode}
      selectedIds={selectedIds}
      onToggleSelect={onToggleSelect}
    />
  );
}

export default WishlistTabContent;

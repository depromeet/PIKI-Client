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
      <main className="flex flex-1 items-center justify-center">
        <p className="body-1-medium text-gray-300">아직 저장한 위시템이 없어요</p>
      </main>
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

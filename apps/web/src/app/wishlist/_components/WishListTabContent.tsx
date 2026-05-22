import type { WishItemT } from '@/components/common/WishGrid';
import WishGrid from '@/components/common/WishGrid';

type WishListTabContentProps = {
  items: WishItemT[];
};

function WishListTabContent({ items }: WishListTabContentProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-gray-300">
        <p className="body-1-medium">아직 저장한 위시템이 없어요</p>
      </div>
    );
  }

  return <WishGrid items={items} />;
}

export default WishListTabContent;

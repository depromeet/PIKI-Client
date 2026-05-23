import WishCard from '@/components/common/WishCard';

export type WishItemT = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
};

type WishGridProps = {
  items: WishItemT[];
};

function WishGrid({ items }: WishGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-3">
      {items.map(item => (
        <WishCard key={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl} />
      ))}
    </div>
  );
}

export default WishGrid;

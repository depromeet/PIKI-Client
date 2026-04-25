import { Product } from '@/types/tournament';

type ProductCardProps = Product & {
  onClick?: () => void;
};

export default function ProductCard({ image, name, price, reason, onClick }: ProductCardProps) {
  return (
    <div
      className="flex h-[300px] w-[170px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
      onClick={onClick}
    >
      <div className="flex h-[160px] shrink-0 items-center justify-center bg-gray-100 p-4">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <p className="line-clamp-2 text-xl font-bold">{name}</p>
        <p className="mt-1 text-base font-medium text-gray-600">{price.toLocaleString()}원</p>
        <p className="mt-2.5 line-clamp-1 text-xs text-gray-400">{reason}</p>
      </div>
    </div>
  );
}

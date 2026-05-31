import CheckboxEmptyIconFill from '@/assets/icons/fill/checkbox-empty.svg';
import CheckboxSelectedIconFill from '@/assets/icons/fill/checkbox-selected.svg';
import WishCard from '@/components/common/wish-card';

type WishSelectCardProps = {
  name: string;
  price: number;
  imageUrl?: string;
  isSelected: boolean;
  onSelect: () => void;
};

function WishSelectCard({ name, price, imageUrl, isSelected, onSelect }: WishSelectCardProps) {
  return (
    <button type="button" onClick={onSelect} aria-pressed={isSelected} className="relative h-full w-full text-left">
      <WishCard name={name} price={price} imageUrl={imageUrl} />
      <div className="absolute top-2 left-2 z-10">
        {isSelected ? (
          <CheckboxSelectedIconFill width={30.317} height={30.317} className="text-icon-accent" />
        ) : (
          <div className="flex size-[30.317px] items-center justify-center rounded bg-gray-50">
            <CheckboxEmptyIconFill width={30.317} height={30.317} className="text-gray-200" />
          </div>
        )}
      </div>
    </button>
  );
}

export default WishSelectCard;

import CheckboxSelectedIconFill from '@/assets/icons/fill/checkbox-selected.svg';
import WishCard from '@/components/common/WishCard';

type WishSelectCardProps = {
  name: string;
  price: number;
  imageUrl?: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
};

function WishSelectCard({ name, price, imageUrl, isSelected, isDisabled, onSelect }: WishSelectCardProps) {
  return (
    <button type="button" onClick={onSelect} className="relative h-full w-full text-left">
      <WishCard name={name} price={price} imageUrl={imageUrl} />
      {isSelected && (
        <div className="absolute left-2 top-2 z-10">
          <CheckboxSelectedIconFill width={30.317} height={30.317} />
        </div>
      )}
    </button>
  );
}

export default WishSelectCard;

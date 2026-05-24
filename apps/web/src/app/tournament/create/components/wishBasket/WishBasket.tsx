import Image from 'next/image';
import type { StaticImageData } from 'next/image';

import AddIcon from '@/assets/icons/fill/add.svg';
import basketImg from '@/assets/images/basket-gray.png';
import Button from '@/components/common/button';

import AddWishDialog from '../addWishDialog/AddWishDialog';

import WishItem from './WishItem';

type WishBasketProps = {
  basketIndex: number;
  items: { id: number; imageUrl: StaticImageData }[];
};

function WishBasket({ basketIndex, items }: WishBasketProps) {
  return (
    <div className="relative mx-auto aspect-[356/464] w-full">
      <Image
        src={basketImg}
        alt={`장바구니 ${basketIndex + 1}`}
        fill
        sizes="100vw"
        className="object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative grid w-[45%] grid-cols-2 gap-4">
          {items.map((item, index) => (
            <WishItem key={item.id} index={index} url={item.imageUrl} />
          ))}
          <AddWishDialog
            trigger={
              <Button
                icon="only"
                aria-label="위시 아이템 추가"
                className="absolute top-1/2 left-1/2 size-[60px] -translate-x-1/2 -translate-y-1/2 shadow-lg"
              >
                <AddIcon width={32} height={32} className="text-white" aria-hidden />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default WishBasket;

import Image from 'next/image';

import { EMPTY_WISH_ITEMS } from '@/app/tournament/create/consts/wishBasketConsts';
import AddIcon from '@/assets/icons/fill/add.svg';
import basketImg from '@/assets/images/basket-gray.png';
import Button from '@/components/common/Button/Button';

import WishItem from './WishItem';

function WishBasket() {
  return (
    <div className="relative mx-auto aspect-[356/464] w-full">
      <Image src={basketImg} alt="장바구니" fill sizes="100vw" className="object-contain" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative grid w-[45%] grid-cols-2 gap-4">
          {EMPTY_WISH_ITEMS.map((emptyWishItem, index) => (
            <WishItem key={index} index={index} url={emptyWishItem.imageUrl} />
          ))}
          <Button
            icon="only"
            className="absolute top-1/2 left-1/2 size-[60px] -translate-x-1/2 -translate-y-1/2 shadow-lg"
          >
            <AddIcon width={32} height={32} className="text-white" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WishBasket;

import Image from 'next/image';

import { EMPTY_WISH_ITEMS } from '@/app/tournament/create/consts/wishBasketConsts';
import basketImg from '@/assets/images/basket-gray.png';

import WishItem from './WishItem';

function WishBasket() {
  return (
    <div className="relative mx-auto aspect-[356/464] w-full">
      <Image src={basketImg} alt="장바구니" fill sizes="100vw" className="object-contain" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid w-[45%] grid-cols-2 gap-4">
          {EMPTY_WISH_ITEMS.map((emptyWishItem, index) => (
            <WishItem key={index} index={index} url={emptyWishItem.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishBasket;

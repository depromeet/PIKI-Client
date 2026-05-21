import Image from 'next/image';

import basketImg from '@/assets/images/basket-gray.png';

function WishBasket() {
  return (
    <div className="flex flex-col items-center">
      <Image src={basketImg} alt="장바구니" width={356} height={464} className="h-auto w-full" />
    </div>
  );
}

export default WishBasket;

'use client';

import { BASKET_COUNT, EMPTY_WISH_ITEMS } from '../../_consts/wishBasketConsts';
import useBasketCarousel from '../../_hooks/useBasketCarousel';
import CarouselIndicator from './CarouselIndicator';
import WishBasket from './WishBasket';

const BASKETS = Array.from({ length: BASKET_COUNT }, () => EMPTY_WISH_ITEMS);

type WishBasketCarouselProps = {
  tournamentId: string;
};

function WishBasketCarousel({ tournamentId: _tournamentId }: WishBasketCarouselProps) {
  const { currentIndex, setCurrentIndex, handleKeyDown, handleTouchStart, handleTouchEnd } =
    useBasketCarousel();

  return (
    <div
      className="flex flex-col items-center gap-4 outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {BASKETS.map((items, index) => (
            <div key={index} className="w-full shrink-0">
              <WishBasket basketIndex={index} items={items} />
            </div>
          ))}
        </div>
      </div>

      <CarouselIndicator
        totalCount={BASKET_COUNT}
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
      />
    </div>
  );
}

export default WishBasketCarousel;

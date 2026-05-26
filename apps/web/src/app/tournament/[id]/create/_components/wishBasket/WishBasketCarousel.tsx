'use client';

import {
  BASKET_COUNT,
  EMPTY_WISH_ITEMS,
  ITEMS_PER_BASKET,
} from '@/app/tournament/[id]/create/_consts/wishBasketConsts';
import useBasketCarousel from '@/app/tournament/[id]/create/_hooks/useBasketCarousel';
import type { TournamentItemT } from '@/app/tournament/[id]/create/_types/tournament';

import CarouselIndicator from './CarouselIndicator';
import WishBasket from './WishBasket';

type WishBasketCarouselProps = {
  tournamentId: string;
  items?: TournamentItemT[];
};

function WishBasketCarousel({ tournamentId: _tournamentId, items = [] }: WishBasketCarouselProps) {
  const { currentIndex, setCurrentIndex, handleKeyDown, handleTouchStart, handleTouchEnd } =
    useBasketCarousel();

  const baskets = Array.from({ length: BASKET_COUNT }, (_, i) => {
    const startIndex = i * ITEMS_PER_BASKET;
    const visibleItems = items.slice(startIndex, startIndex + ITEMS_PER_BASKET);
    return [
      ...visibleItems.map(item => ({ id: item.tournamentItemId, imageUrl: item.imageUrl })),
      ...EMPTY_WISH_ITEMS.slice(visibleItems.length).map(item => ({
        ...item,
        id: `empty-${i}-${item.id}`,
      })),
    ];
  });

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
          {baskets.map((basketItems, index) => (
            <div key={index} className="w-full shrink-0">
              <WishBasket basketIndex={index} items={basketItems} />
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

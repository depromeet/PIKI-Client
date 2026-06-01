'use client';

import type { TournamentItemT } from '@/types/tournament';

import { BASKET_COUNT, ITEMS_PER_BASKET } from '../../_consts/tournamentItemBasketConsts';
import useTournamentItemBasketCarousel from '../../_hooks/useTournamentItemBasketCarousel';
import CarouselIndicator from './CarouselIndicator';
import TournamentItemBasket from './TournamentItemBasket';

type TournamentItemBasketCarouselProps = {
  items?: TournamentItemT[];
};

function TournamentItemBasketCarousel({ items = [] }: TournamentItemBasketCarouselProps) {
  const { currentIndex, setCurrentIndex, handleKeyDown, handleTouchStart, handleTouchEnd } =
    useTournamentItemBasketCarousel();

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
          {Array.from({ length: BASKET_COUNT }, (_, i) => (
            <div key={i} className="w-full shrink-0">
              <TournamentItemBasket
                basketIndex={i}
                items={items.slice(i * ITEMS_PER_BASKET, (i + 1) * ITEMS_PER_BASKET)}
              />
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

export default TournamentItemBasketCarousel;

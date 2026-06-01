'use client';

import { useEffect, useMemo, useState } from 'react';

import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/carousel';
import type { TournamentItemT } from '@/types/tournament';

import {
  BASKET_CAROUSEL_SLIDE_SIZE_PERCENT,
  ITEMS_PER_BASKET,
  getActiveBasketCount,
} from '../../_consts/tournamentItemBasket';
import CarouselIndicator from './CarouselIndicator';
import TournamentItemBasket from './TournamentItemBasket';

type TournamentItemBasketCarouselProps = {
  items?: TournamentItemT[];
};

function TournamentItemBasketCarousel({ items = [] }: TournamentItemBasketCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeBasketCount = useMemo(() => getActiveBasketCount(items.length), [items.length]);
  const isCarouselEnabled = activeBasketCount > 1;

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());

    handleSelect();
    carouselApi.on('select', handleSelect);

    return () => {
      carouselApi.off('select', handleSelect);
    };
  }, [carouselApi]);

  const handleIndicatorSelect = (index: number) => carouselApi?.scrollTo(index);

  if (!isCarouselEnabled) {
    return (
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 px-5">
        <TournamentItemBasket basketIndex={0} items={items} />
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 px-5">
      <Carousel
        key={activeBasketCount}
        className="relative w-full"
        setApi={setCarouselApi}
        opts={{ loop: false, align: 'center', containScroll: false }}
      >
        <CarouselContent className="ml-0 w-full">
          {Array.from({ length: activeBasketCount }, (_, i) => (
            <CarouselItem
              key={i}
              className="pl-0"
              style={{ flex: `0 0 ${BASKET_CAROUSEL_SLIDE_SIZE_PERCENT}%` }}
            >
              <TournamentItemBasket
                basketIndex={i}
                items={items.slice(i * ITEMS_PER_BASKET, (i + 1) * ITEMS_PER_BASKET)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <CarouselIndicator
        totalCount={activeBasketCount}
        currentIndex={currentIndex}
        onSelect={handleIndicatorSelect}
      />
    </div>
  );
}

export default TournamentItemBasketCarousel;

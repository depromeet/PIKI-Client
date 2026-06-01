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
      <div className="relative mb-3 min-h-0 w-full flex-1">
        <TournamentItemBasket basketIndex={0} items={items} />
      </div>
    );
  }

  return (
    <Carousel
      key={activeBasketCount}
      className="relative flex min-h-0 w-full flex-1 flex-col"
      setApi={setCarouselApi}
      opts={{ loop: false, align: 'center', containScroll: false }}
    >
      <div className="relative mb-3 min-h-0 w-full flex-1 **:data-[slot=carousel-content]:h-full">
        <CarouselContent className="ml-0 h-full w-full">
          {Array.from({ length: activeBasketCount }, (_, i) => (
            <CarouselItem
              key={i}
              className="h-full min-h-0 pl-0"
              style={{ flex: `0 0 ${BASKET_CAROUSEL_SLIDE_SIZE_PERCENT}%` }}
            >
              <TournamentItemBasket
                basketIndex={i}
                items={items.slice(i * ITEMS_PER_BASKET, (i + 1) * ITEMS_PER_BASKET)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
          <CarouselIndicator
            totalCount={activeBasketCount}
            currentIndex={currentIndex}
            onSelect={handleIndicatorSelect}
          />
        </div>
      </div>
    </Carousel>
  );
}

export default TournamentItemBasketCarousel;

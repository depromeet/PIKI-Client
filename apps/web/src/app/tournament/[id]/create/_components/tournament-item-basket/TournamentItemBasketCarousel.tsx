'use client';

import { useEffect, useRef } from 'react';

import { toast } from 'sonner';

import { Carousel, CarouselContent, CarouselItem } from '@/components/carousel';
import type { TournamentItemT } from '@/types/tournament';
import { cn } from '@/utils/cn';

import {
  BASKET_CAROUSEL_SLIDE_SIZE_PERCENT,
  ITEMS_PER_BASKET,
} from '../../_consts/tournamentItemBasket';
import { useBasketCarousel } from '../../_hooks/useBasketCarousel';
import CarouselIndicator from './CarouselIndicator';
import TournamentItemBasket from './TournamentItemBasket';

type TournamentItemBasketCarouselProps = {
  items?: TournamentItemT[];
  scrollToLast?: boolean;
  onScrolled?: () => void;
};

function TournamentItemBasketCarousel({
  items = [],
  scrollToLast = false,
  onScrolled,
}: TournamentItemBasketCarouselProps) {
  const {
    carouselApi,
    setCarouselApi,
    currentIndex,
    activeBasketCount,
    isCarouselEnabled,
    handleIndicatorSelect,
  } = useBasketCarousel({ items, scrollToLast, onScrolled });

  const prevBasketCountRef = useRef(activeBasketCount);
  useEffect(() => {
    if (activeBasketCount > prevBasketCountRef.current) {
      toast.info('카트가 꽉 찼어요! 새 카트를 만들었어요.');
    }
    prevBasketCountRef.current = activeBasketCount;
  }, [activeBasketCount]);

  if (!isCarouselEnabled) {
    return (
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 px-5">
        <TournamentItemBasket basketIndex={0} items={items} />
      </div>
    );
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4">
      <Carousel
        key={activeBasketCount}
        className={cn('relative w-full', !carouselApi && 'invisible')}
        setApi={setCarouselApi}
        opts={{ loop: false, align: 'center', containScroll: false }}
      >
        <CarouselContent className="ml-0 w-full">
          {Array.from({ length: activeBasketCount }, (_, i) => (
            <CarouselItem
              key={i}
              className="shrink-0 grow-0 pl-0"
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

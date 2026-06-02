'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/carousel';
import type { TournamentItemT } from '@/types/tournament';
import { cn } from '@/utils/cn';

import {
  BASKET_CAROUSEL_SLIDE_SIZE_PERCENT,
  ITEMS_PER_BASKET,
} from '../../_consts/tournamentItemBasket';
import { getActiveBasketCount, getBasketIndexForLastItem } from '../../_utils/tournamentItemBasket';
import CarouselIndicator from './CarouselIndicator';
import TournamentItemBasket from './TournamentItemBasket';

type TournamentItemBasketCarouselProps = {
  items?: TournamentItemT[];
};

function TournamentItemBasketCarousel({ items = [] }: TournamentItemBasketCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselAreaHeight, setCarouselAreaHeight] = useState(0);
  const carouselAreaRef = useRef<HTMLDivElement>(null);

  const activeBasketCount = useMemo(() => getActiveBasketCount(items.length), [items.length]);

  const prevItemCountRef = useRef(items.length);

  const isCarouselEnabled = activeBasketCount > 1;

  /** 담기 완료 시 마지막 아이템이 있는 바구니로 이동 */
  useEffect(() => {
    if (!isCarouselEnabled) {
      prevItemCountRef.current = items.length;
      return;
    }

    if (!carouselApi) return;

    const prevCount = prevItemCountRef.current;
    if (items.length > prevCount) {
      carouselApi.scrollTo(getBasketIndexForLastItem(items.length));
    }

    prevItemCountRef.current = items.length;
  }, [items.length, carouselApi, isCarouselEnabled]);

  /** 초기 이미지 위치 틀어짐 방지 */
  useLayoutEffect(() => {
    if (!carouselApi) return;

    carouselApi.reInit();
    carouselApi.scrollTo(carouselApi.selectedScrollSnap(), true);
  }, [carouselApi, activeBasketCount]);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());

    const handleReInit = () => {
      carouselApi.scrollTo(carouselApi.selectedScrollSnap(), true);
    };

    handleSelect();
    carouselApi.on('select', handleSelect);
    carouselApi.on('reInit', handleReInit);

    return () => {
      carouselApi.off('select', handleSelect);
      carouselApi.off('reInit', handleReInit);
    };
  }, [carouselApi]);

  const handleIndicatorSelect = (index: number) => carouselApi?.scrollTo(index);
  const basketMaxHeight = Math.max(0, carouselAreaHeight - 16);

  useEffect(() => {
    const element = carouselAreaRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setCarouselAreaHeight(entry.contentRect.height);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (!isCarouselEnabled) {
    return (
      <div
        ref={carouselAreaRef}
        className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 px-5"
      >
        <TournamentItemBasket basketIndex={0} items={items} maxHeight={carouselAreaHeight} />
      </div>
    );
  }

  return (
    <div
      ref={carouselAreaRef}
      className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-2"
    >
      <Carousel
        key={activeBasketCount}
        className={cn('relative w-full', !carouselApi && 'invisible')}
        setApi={setCarouselApi}
        opts={{ loop: false, align: 'center', containScroll: false }}
      >
        <CarouselContent className="ml-0 w-full">
          {Array.from({ length: activeBasketCount }, (_, basketIndex) => (
            <CarouselItem
              key={basketIndex}
              className="flex min-w-0 shrink-0 grow-0 items-center justify-center pl-0"
              style={{ flex: `0 0 ${BASKET_CAROUSEL_SLIDE_SIZE_PERCENT}%` }}
            >
              <TournamentItemBasket
                basketIndex={basketIndex}
                items={items.slice(
                  basketIndex * ITEMS_PER_BASKET,
                  (basketIndex + 1) * ITEMS_PER_BASKET
                )}
                maxHeight={basketMaxHeight}
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

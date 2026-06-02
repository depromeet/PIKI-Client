'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { toast } from 'sonner';

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
  scrollToLast?: boolean;
  onScrolled?: () => void;
};

function TournamentItemBasketCarousel({ items = [], scrollToLast = false, onScrolled }: TournamentItemBasketCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeBasketCount = useMemo(() => getActiveBasketCount(items.length), [items.length]);

  const prevItemCountRef = useRef(scrollToLast ? 0 : items.length);
  const prevBasketCountRef = useRef(activeBasketCount);

  const isCarouselEnabled = activeBasketCount > 1;

  useEffect(() => {
    if (activeBasketCount > prevBasketCountRef.current) {
      toast.info('카트가 꽉 찼어요! 새 카트를 만들었어요.');
    }
    prevBasketCountRef.current = activeBasketCount;
  }, [activeBasketCount]);

  /** 담기 완료 시 마지막 아이템이 있는 바구니로 이동 (링크 담기: 실시간 / 위시 담기: 페이지 재진입) */
  useEffect(() => {
    if (!isCarouselEnabled) {
      prevItemCountRef.current = items.length;
      return;
    }

    if (!carouselApi) return;

    if (items.length > prevItemCountRef.current) {
      carouselApi.scrollTo(getBasketIndexForLastItem(items.length));
      onScrolled?.();
    }

    prevItemCountRef.current = items.length;
  }, [carouselApi, isCarouselEnabled, items.length, onScrolled]);

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

'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import type { CarouselApi } from '@/components/carousel';
import type { TournamentItemT } from '@/types/tournament';

import { getActiveBasketCount, getBasketIndexForLastItem } from '../_utils/tournamentItemBasket';

type UseBasketCarouselParams = {
  items: TournamentItemT[];
  scrollToLast: boolean;
  onScrolled?: () => void;
};

export const useBasketCarousel = ({ items, scrollToLast, onScrolled }: UseBasketCarouselParams) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeBasketCount = useMemo(() => getActiveBasketCount(items.length), [items.length]);
  const isCarouselEnabled = activeBasketCount > 1;

  const prevItemCountRef = useRef(scrollToLast ? 0 : items.length);

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

  useLayoutEffect(() => {
    if (!carouselApi) return;

    carouselApi.reInit();
    carouselApi.scrollTo(carouselApi.selectedScrollSnap(), true);
  }, [carouselApi, activeBasketCount]);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
    const handleReInit = () => carouselApi.scrollTo(carouselApi.selectedScrollSnap(), true);

    handleSelect();
    carouselApi.on('select', handleSelect);
    carouselApi.on('reInit', handleReInit);

    return () => {
      carouselApi.off('select', handleSelect);
      carouselApi.off('reInit', handleReInit);
    };
  }, [carouselApi]);

  const handleIndicatorSelect = (index: number) => carouselApi?.scrollTo(index);

  return {
    carouselApi,
    setCarouselApi,
    currentIndex,
    activeBasketCount,
    isCarouselEnabled,
    handleIndicatorSelect,
  };
};

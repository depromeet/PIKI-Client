'use client';

import { useRef, useState } from 'react';

import { BASKET_COUNT } from '../_consts/tournamentItemBasket';

const SWIPE_THRESHOLD = 50;

const useBasketCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setCurrentIndex(prev => Math.min(prev + 1, BASKET_COUNT - 1));
    } else if (e.key === 'ArrowLeft') {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const endX = e.changedTouches[0]?.clientX;

    if (endX == null) {
      touchStartX.current = null;
      return;
    }

    const deltaX = touchStartX.current - endX;
    touchStartX.current = null;

    if (deltaX > SWIPE_THRESHOLD && currentIndex < BASKET_COUNT - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (deltaX < -SWIPE_THRESHOLD && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return { currentIndex, setCurrentIndex, handleKeyDown, handleTouchStart, handleTouchEnd };
};

export default useBasketCarousel;

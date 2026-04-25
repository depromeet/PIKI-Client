import { useState } from 'react';

import type { Product } from '@/types/tournament';

const TILT_DEG = 12;
const CARD_SHIFT = 24;
const ANIMATION_DURATION = 800;
const SCALE_SELECTED = 1.08;
const SCALE_UNSELECTED = 0.88;

export function useCardSelectionAnimation(onSelect: (winner: Product) => void) {
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);

  const handleClick = (side: 'left' | 'right', product: Product) => {
    if (selectedSide) return;
    setSelectedSide(side);
    setTimeout(() => onSelect(product), ANIMATION_DURATION);
  };

  const getCardStyle = (side: 'left' | 'right') => {
    if (!selectedSide) return { scale: 1, blur: 0 };
    const isPicked = selectedSide === side;
    return {
      scale: isPicked ? SCALE_SELECTED : SCALE_UNSELECTED,
      blur: isPicked ? 0 : 4,
    };
  };

  const getHangerRotate = () => {
    if (selectedSide === 'left') return -TILT_DEG;
    if (selectedSide === 'right') return TILT_DEG;
    return 0;
  };

  const getCardShift = (side: 'left' | 'right') => {
    if (!selectedSide) return 0;
    return selectedSide === side ? CARD_SHIFT : -CARD_SHIFT;
  };

  return {
    handleClick,
    selectedSide,
    animationDuration: ANIMATION_DURATION,
    hangerRotate: getHangerRotate(),
    leftCardShift: getCardShift('left'),
    rightCardShift: getCardShift('right'),
    leftCardStyle: getCardStyle('left'),
    rightCardStyle: getCardStyle('right'),
  };
}

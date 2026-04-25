import { useState } from 'react';

import { Product } from '@/types/tournament';

const TILT_DEG = 12;
const CARD_SHIFT = 24;
const ANIMATION_DURATION = 500;
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

  return {
    handleClick,
    selectedSide,
    animationDuration: ANIMATION_DURATION,
    hangerRotate: selectedSide === 'left' ? -TILT_DEG : selectedSide === 'right' ? TILT_DEG : 0,
    leftCardShift: selectedSide === 'left' ? CARD_SHIFT : selectedSide === 'right' ? -CARD_SHIFT : 0,
    rightCardShift: selectedSide === 'right' ? CARD_SHIFT : selectedSide === 'left' ? -CARD_SHIFT : 0,
    leftCardStyle: getCardStyle('left'),
    rightCardStyle: getCardStyle('right'),
  };
}

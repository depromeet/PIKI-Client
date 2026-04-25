import { useState } from 'react';

import { Product } from '@/types/tournament';

const TILT_DEG = 12;
const CARD_SHIFT = 24;
const ANIMATION_DURATION = 500;

export function useTiltAnimation(onSelect: (winner: Product) => void) {
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);

  const handleClick = (side: 'left' | 'right', product: Product) => {
    if (selectedSide) return;
    setSelectedSide(side);
    setTimeout(() => onSelect(product), ANIMATION_DURATION);
  };

  return {
    handleClick,
    animationDuration: ANIMATION_DURATION,
    hangerRotate: selectedSide === 'left' ? -TILT_DEG : selectedSide === 'right' ? TILT_DEG : 0,
    leftCardShift: selectedSide === 'left' ? CARD_SHIFT : selectedSide === 'right' ? -CARD_SHIFT : 0,
    rightCardShift: selectedSide === 'right' ? CARD_SHIFT : selectedSide === 'left' ? -CARD_SHIFT : 0,
  };
}

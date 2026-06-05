import { cva } from 'class-variance-authority';

export const skeletonStyles = cva('shrink-0', {
  variants: {
    variant: {
      highlight: 'skeleton-shimmer',
      default: 'bg-gray-100',
    },
    shape: {
      square: 'rounded-md',
      circle: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'highlight',
    shape: 'square',
  },
});

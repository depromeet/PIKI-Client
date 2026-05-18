import { type VariantProps, cva } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

import './Skeleton.css';

const skeletonStyles = cva('shrink-0', {
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

type SkeletonProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof skeletonStyles> & {
    width?: string;
    height?: string;
  };

function Skeleton({
  width = '100%',
  height = '24px',
  variant,
  shape,
  className,
  style,
  ...props
}: SkeletonProps) {
  const isCircle = shape === 'circle';

  return (
    <div
      className={cn(skeletonStyles({ variant, shape }), className)}
      style={{
        width,
        height: isCircle ? width : height,
        ...style,
      }}
      {...props}
    />
  );
}

export default Skeleton;

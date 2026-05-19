import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

import './Skeleton.css';
import { skeletonStyles } from './Skeleton.style';

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

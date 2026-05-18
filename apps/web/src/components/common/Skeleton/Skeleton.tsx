import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

import './Skeleton.css';

type SkeletonProps = ComponentPropsWithoutRef<'div'> & {
  width?: string;
  height?: string;
  /**
   * 애니메이션 상태. default: 정적 회색 블록 / highlight: shimmer 애니메이션
   * @default 'highlight'
   */
  variant?: 'default' | 'highlight';
  /**
   * 모양. square: 둥근 사각형 / circle: 원형
   * @default 'square'
   */
  shape?: 'square' | 'circle';
};

function Skeleton({
  width = '100%',
  height = '24px',
  variant = 'highlight',
  shape = 'square',
  className,
  style,
  ...props
}: SkeletonProps) {
  const isCircle = shape === 'circle';

  return (
    <div
      className={cn(
        isCircle ? 'rounded-full' : 'rounded-md',
        variant === 'highlight' ? 'skeleton-shimmer' : 'bg-gray-100',
        className,
      )}
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

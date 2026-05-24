import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

import './Skeleton.css';
import { skeletonStyles } from './skeleton.style';

type SkeletonProps = ComponentPropsWithoutRef<'div'> & VariantProps<typeof skeletonStyles>;

function Skeleton({ variant, shape, className, ...props }: SkeletonProps) {
  return <div className={cn(skeletonStyles({ variant, shape }), className)} {...props} />;
}

export default Skeleton;

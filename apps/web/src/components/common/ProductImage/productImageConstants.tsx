import type { ReactNode } from 'react';

import Skeleton from '@/components/common/Skeleton/Skeleton';
import Spinner from '@/components/common/Spinner/Spinner';

export type SizeVariant = 'sm' | 'lg';
export type ImageState = 'loading' | 'success' | 'error';

export const SIZE_STYLE: Record<
  SizeVariant,
  { dimension: number; radius: string; decoration: string; defaultLoadingFallback: ReactNode }
> = {
  lg: {
    dimension: 200,
    radius: 'rounded-[12px]',
    decoration: '',
    defaultLoadingFallback: <Skeleton width="200px" height="200px" />,
  },
  sm: {
    dimension: 72,
    radius: 'rounded-[16px]',
    decoration: 'border-[3px] border-white shadow-[0_0_8px_rgba(0,0,0,0.16)]',
    defaultLoadingFallback: <Spinner />,
  },
};

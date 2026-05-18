'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import Skeleton from '@/components/common/Skeleton/Skeleton';
import Spinner from '@/components/common/Spinner/Spinner';
import { cn } from '@/utils/cn';

import { ProductImageOverlay } from './fallback/ProductImageOverlay';
import type { ImageState, SizeVariant } from './productImageConstants';
import { SIZE_STYLE } from './productImageConstants';

const DEFAULT_LOADING_FALLBACK: Record<SizeVariant, ReactNode> = {
  lg: <Skeleton width="200px" height="200px" />,
  sm: <Spinner />,
};

type ProductImageProps = Omit<ImageProps, 'width' | 'height' | 'src'> & {
  src?: ImageProps['src'];
  /** 이미지 크기. lg: 200×200 / sm: 72×72 */
  size?: SizeVariant;
  /** 로딩 중 표시할 커스텀 UI */
  loadingFallback?: ReactNode;
  /** 에러 시 표시할 커스텀 UI */
  errorFallback?: ReactNode;
};

function ProductImage({
  size = 'lg',
  loadingFallback,
  errorFallback,
  ...imageProps
}: ProductImageProps) {
  const { dimension, radius, decoration } = SIZE_STYLE[size];
  const { src, onLoad, onError, className: imagePropClassName, ...restImageProps } = imageProps;
  const [state, setState] = useState<ImageState>('loading');

  useEffect(() => {
    setState('loading');
  }, [src]);

  const handleLoad: ImageProps['onLoad'] = e => {
    setState('success');
    onLoad?.(e);
  };

  const handleError: ImageProps['onError'] = e => {
    setState('error');
    onError?.(e);
  };

  const loadingUI = loadingFallback ?? DEFAULT_LOADING_FALLBACK[size];
  const containerStyle = { width: dimension, height: dimension };
  const baseClass = cn('bg-gray-50', radius, decoration);

  if (!src) return <div style={containerStyle} className={baseClass} />;

  return (
    <div style={containerStyle} className="relative">
      <div className={cn('relative h-full w-full overflow-hidden', baseClass)}>
        <Image
          {...restImageProps}
          src={src}
          width={dimension}
          height={dimension}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-200',
            state === 'success' ? 'opacity-100' : 'opacity-0',
            imagePropClassName
          )}
        />
      </div>

      <ProductImageOverlay
        state={state}
        size={size}
        radius={radius}
        loadingUI={loadingUI}
        errorFallback={errorFallback}
      />
    </div>
  );
}

export default ProductImage;

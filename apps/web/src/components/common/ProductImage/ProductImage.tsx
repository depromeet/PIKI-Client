'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useState } from 'react';

import Spinner from '@/components/common/Spinner/Spinner';

type SizeVariant = 'sm' | 'lg';
type ImageState = 'loading' | 'success' | 'error';

type ProductImageProps = Omit<ImageProps, 'width' | 'height'> & {
  /** 이미지 크기. lg: 200×200 / sm: 72×72 */
  size?: SizeVariant;
  /** 로딩 중 표시할 커스텀 UI */
  loadingFallback?: ReactNode;
  /** 에러 시 표시할 커스텀 UI */
  errorFallback?: ReactNode;
};

const SIZE_STYLE: Record<SizeVariant, { dimension: number; radius: string }> = {
  lg: { dimension: 200, radius: 'rounded-[12px]' },
  sm: { dimension: 72, radius: 'rounded-[16px]' },
};

const DEFAULT_LOADING_FALLBACK = <Spinner />;

const DEFAULT_ERROR_FALLBACK = (
  <p className="caption-1-regular text-text-neutral-secondary">이미지가 비어 있어요</p>
);

function ProductImage({
  size = 'lg',
  loadingFallback,
  errorFallback,
  ...imageProps
}: ProductImageProps) {
  const { dimension, radius } = SIZE_STYLE[size];
  const [state, setState] = useState<ImageState>('loading');

  const handleLoad: ImageProps['onLoad'] = e => {
    setState('success');
    imageProps.onLoad?.(e);
  };

  const handleError: ImageProps['onError'] = e => {
    setState('error');
    imageProps.onError?.(e);
  };

  const loadingUI = loadingFallback ?? DEFAULT_LOADING_FALLBACK;
  const errorUI = errorFallback ?? DEFAULT_ERROR_FALLBACK;

  return (
    <div
      style={{ width: dimension, height: dimension }}
      className={`relative overflow-hidden ${radius}`}
    >
      <Image
        {...imageProps}
        width={dimension}
        height={dimension}
        alt={imageProps.alt}
        onLoad={handleLoad}
        onError={handleError}
      />

      {state === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          {loadingUI}
        </div>
      )}

      {state === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          {errorUI}
        </div>
      )}
    </div>
  );
}

export default ProductImage;

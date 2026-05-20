'use client';

import type { ImageProps } from 'next/image';
import type { ReactNode, SyntheticEvent } from 'react';
import { useState } from 'react';

import BaseImage from '@/components/common/BaseImage/BaseImage';
import { cn } from '@/utils/cn';

import { LgErrorFallback } from './fallback/LgErrorFallback';
import { LoadingFallback } from './fallback/LoadingFallback';
import { SmErrorFallback } from './fallback/SmErrorFallback';
import type { SizeVariantT } from './productImageConstants';
import { SIZE_STYLE } from './productImageConstants';

type ImgEvent = SyntheticEvent<HTMLImageElement>;

type ProductImageProps = Omit<ImageProps, 'width' | 'height' | 'src'> & {
  src?: ImageProps['src'];
  /** 이미지 크기. lg: 200×200 / sm: 72×72 */
  size?: SizeVariantT;
  /** 상품 미등록 상태. true면 src 없이 회색 빈 박스만 표시 (에러 UI 없음) */
  isEmpty?: boolean;
  /** 로딩 중 표시할 커스텀 UI */
  loadingFallback?: ReactNode;
  /** 에러 시 표시할 커스텀 UI */
  errorFallback?: ReactNode;
};

function ProductImage({
  size = 'lg',
  isEmpty = false,
  loadingFallback,
  errorFallback,
  className,
  onLoad,
  onError,
  ...imageProps
}: ProductImageProps) {
  const { dimension, radius, decoration } = SIZE_STYLE[size];
  const baseClass = cn('bg-gray-50', radius, decoration);
  const [isError, setIsError] = useState(false);

  if (isEmpty || !imageProps.src) {
    return <div style={{ width: dimension, height: dimension }} className={baseClass} />;
  }

  const handleLoad = (e: ImgEvent) => {
    setIsError(false);
    onLoad?.(e);
  };

  const handleError = (e: ImgEvent) => {
    setIsError(true);
    onError?.(e);
  };

  return (
    <div style={{ width: dimension, height: dimension }} className="relative overflow-visible">
      <div className={cn('relative h-full w-full overflow-hidden', baseClass)}>
        <BaseImage
          {...imageProps}
          src={imageProps.src}
          width={dimension}
          height={dimension}
          className={className}
          loadingFallback={<LoadingFallback>{loadingFallback}</LoadingFallback>}
          errorFallback={
            size === 'lg' ? (
              <LgErrorFallback radius={radius}>{errorFallback}</LgErrorFallback>
            ) : null
          }
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
      {isError && size === 'sm' && <SmErrorFallback />}
    </div>
  );
}

export default ProductImage;

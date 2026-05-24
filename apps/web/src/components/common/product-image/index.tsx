'use client';

import type { ImageProps } from 'next/image';
import type { ReactNode } from 'react';

import BaseImage from '@/components/common/base-image';
import { cn } from '@/utils/cn';

import LgErrorFallback from './fallback/LgErrorFallback';
import LoadingFallback from './fallback/LoadingFallback';
import SmErrorFallback from './fallback/SmErrorFallback';
import type { SizeVariantT } from './productImageConstants';
import { SIZE_STYLE } from './productImageConstants';

type ProductImageProps = Omit<ImageProps, 'width' | 'height' | 'src'> & {
  src?: ImageProps['src'];
  /** 이미지 크기. lg: 200×200 / sm: 72×72 */
  size?: SizeVariantT;
  /** true면 부모 크기에 맞게 꽉 채움 (size prop 무시) */
  fill?: boolean;
  /** 상품 미등록 상태. true면 src 없이 회색 빈 박스만 표시 (에러 UI 없음) */
  isEmpty?: boolean;
  /** 로딩 중 표시할 커스텀 UI */
  loadingFallback?: ReactNode;
  /** 에러 시 표시할 커스텀 UI */
  errorFallback?: ReactNode;
};

function ProductImage({
  size = 'lg',
  fill = false,
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

  if (isEmpty || !imageProps.src) {
    if (fill) return <div className={cn('h-full w-full', baseClass)} />;
    return <div style={{ width: dimension, height: dimension }} className={baseClass} />;
  }

  const containerClass = fill
    ? cn('relative h-full w-full overflow-hidden', baseClass)
    : cn('relative overflow-hidden', baseClass);

  const containerStyle = fill ? undefined : { width: dimension, height: dimension };

  return (
    <div className={containerClass} style={containerStyle}>
      <BaseImage
        {...imageProps}
        src={imageProps.src}
        className={cn(fill && 'object-cover', className)}
        loadingFallback={<LoadingFallback>{loadingFallback}</LoadingFallback>}
        errorFallback={
          size === 'lg' ? (
            <LgErrorFallback radius={radius}>{errorFallback}</LgErrorFallback>
          ) : (
            errorFallback ?? <SmErrorFallback />
          )
        }
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
}

export default ProductImage;

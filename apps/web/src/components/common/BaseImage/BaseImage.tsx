'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { ReactNode, SyntheticEvent } from 'react';
import { useState } from 'react';

type ImgEvent = SyntheticEvent<HTMLImageElement>;

import { cn } from '@/utils/cn';

type ImageState = 'loading' | 'success' | 'error';

type BaseImageProps = Omit<ImageProps, 'width' | 'height' | 'src'> & {
  src: ImageProps['src'];
  width: number;
  height: number;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
};

function BaseImage({
  src,
  alt,
  width,
  height,
  loadingFallback,
  errorFallback,
  onLoad,
  onError,
  className,
  ...imageProps
}: BaseImageProps) {
  const [state, setState] = useState<ImageState>('loading');
  const [prevSrc, setPrevSrc] = useState(src);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setState('loading');
  }

  const handleLoad = (e: ImgEvent) => {
    setState('success');
    onLoad?.(e);
  };

  const handleError = (e: ImgEvent) => {
    setState('error');
    onError?.(e);
  };

  return (
    <>
      {state === 'loading' && loadingFallback}
      {state === 'error' && errorFallback}
      <Image
        {...imageProps}
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-200',
          state === 'success' ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </>
  );
}

export default BaseImage;

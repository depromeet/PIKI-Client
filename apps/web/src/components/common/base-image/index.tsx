'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { ReactNode, SyntheticEvent } from 'react';
import { useState } from 'react';

import { cn } from '@/utils/cn';

type ImgEvent = SyntheticEvent<HTMLImageElement>;

type ImageState = 'loading' | 'success' | 'error';

type BaseImageProps = Omit<ImageProps, 'src' | 'fill'> & {
  src: ImageProps['src'];
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
};

function BaseImage({
  src,
  alt,
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
        fill
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

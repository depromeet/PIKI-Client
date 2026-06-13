'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { ReactNode, SyntheticEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

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
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      const isError = imgRef.current.naturalWidth === 0;

      const timer = setTimeout(() => {
        setState(isError ? 'error' : 'success');
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [src]);

  const handleLoad = (e: ImgEvent) => {
    setState('success');
    onLoad?.(e);
  };

  const handleError = (e: ImgEvent) => {
    setState('error');
    onError?.(e);
  };

  let fragmentKey = '';
  if (typeof src === 'string') fragmentKey = src;
  else if (src && 'src' in src) fragmentKey = src.src;

  return (
    <React.Fragment key={fragmentKey}>
      {state === 'loading' && loadingFallback}
      {state === 'error' && errorFallback}
      <Image
        {...imageProps}
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        unoptimized
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-200',
          state === 'success' ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </React.Fragment>
  );
}

export default BaseImage;

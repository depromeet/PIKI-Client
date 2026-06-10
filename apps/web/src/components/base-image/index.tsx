'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { ReactNode, SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

type ImgEvent = SyntheticEvent<HTMLImageElement>;
type ImageState = 'loading' | 'success' | 'error';

type BaseImageProps = Omit<ImageProps, 'src' | 'fill'> & {
  src: ImageProps['src'];
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
};

const getSrcKey = (src: ImageProps['src']) => {
  if (typeof src === 'string') return src;
  if (src && 'src' in src) return src.src;
  return '';
};

function BaseImageContent({
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
  }, []);

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
    </>
  );
}

function BaseImage(props: BaseImageProps) {
  return <BaseImageContent key={getSrcKey(props.src)} {...props} />;
}

export default BaseImage;

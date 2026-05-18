import type { ReactNode } from 'react';

import type { ImageState, SizeVariant } from '../productImageConstants';

import { LgErrorFallback } from './LgErrorFallback';
import { SmErrorFallback } from './SmErrorFallback';

type ProductImageOverlayProps = {
  state: ImageState;
  size: SizeVariant;
  radius: string;
  loadingUI: ReactNode;
  errorFallback?: ReactNode;
};

export function ProductImageOverlay({
  state,
  size,
  radius,
  loadingUI,
  errorFallback,
}: ProductImageOverlayProps) {
  if (state === 'loading') {
    return <div className="absolute inset-[3px] flex items-center justify-center">{loadingUI}</div>;
  }

  if (state === 'error' && size === 'lg') {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-gray-50 ${radius}`}>
        {errorFallback ?? <LgErrorFallback />}
      </div>
    );
  }

  if (state === 'error' && size === 'sm') return <SmErrorFallback />;

  return null;
}

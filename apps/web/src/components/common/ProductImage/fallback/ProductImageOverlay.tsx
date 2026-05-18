import type { ReactNode } from 'react';

import type { ImageState, SizeVariant } from '../productImageConstants';

import { LgErrorFallback } from './LgErrorFallback';
import { SmErrorFallback } from './SmErrorFallback';

type ProductImageOverlayProps = {
  state: ImageState;
  size: SizeVariant;
  loadingUI: ReactNode;
  errorFallback?: ReactNode;
};

export function ProductImageOverlay({
  state,
  size,
  loadingUI,
  errorFallback,
}: ProductImageOverlayProps) {
  if (state === 'loading') {
    return <div className="absolute inset-[3px] flex items-center justify-center">{loadingUI}</div>;
  }

  if (state === 'error' && size === 'lg') {
    return (
      <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-gray-50">
        {errorFallback ?? <LgErrorFallback />}
      </div>
    );
  }

  if (state === 'error' && size === 'sm') return <SmErrorFallback />;
}

import type { ReactNode } from 'react';

import Spinner from '@/components/common/Spinner/Spinner';

type LoadingFallbackProps = {
  children?: ReactNode;
};

export function LoadingFallback({ children }: LoadingFallbackProps) {
  return (
    <div className="absolute inset-[3px] flex items-center justify-center">
      {children ?? <Spinner />}
    </div>
  );
}

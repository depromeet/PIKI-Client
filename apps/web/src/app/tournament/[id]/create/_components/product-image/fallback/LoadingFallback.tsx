import type { ReactNode } from 'react';

import Spinner from '@/components/spinner';

type LoadingFallbackProps = {
  children?: ReactNode;
};

function LoadingFallback({ children }: LoadingFallbackProps) {
  return (
    <div className="absolute inset-[3px] flex items-center justify-center">
      {children ?? <Spinner />}
    </div>
  );
}

export default LoadingFallback;

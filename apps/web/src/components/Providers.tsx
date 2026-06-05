'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';

import { Toaster } from '@/components/common/toast';
import { useFcmTokenBridge } from '@/hooks/useFcmTokenBridge';
import { getQueryClient } from '@/utils/queryClient';

function FcmTokenBridge() {
  useFcmTokenBridge();
  return null;
}

function Providers({ children }: Readonly<{ children: ReactNode }>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FcmTokenBridge />
      {children}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;

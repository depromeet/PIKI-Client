'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';

import { Toaster } from '@/components/toast';
import { useDeepLink } from '@/hooks/useDeepLink';
import { useFcmTokenSync } from '@/hooks/useFcmTokenSync';
import { getQueryClient } from '@/utils/queryClient';

function FcmTokenSyncer() {
  useFcmTokenSync();
  return null;
}

function DeepLinkHandler() {
  useDeepLink();
  return null;
}

function Providers({ children }: Readonly<{ children: ReactNode }>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FcmTokenSyncer />
      <DeepLinkHandler />
      {children}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;

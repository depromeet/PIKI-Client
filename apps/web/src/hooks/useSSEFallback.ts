import type { QueryKey } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const FALLBACK_TIMEOUT_MS = 60_000;

/**
 * SSE 이벤트가 오지 않는 경우를 대비한 fallback.
 * hasPending이 true인 동안 60초 후 지정한 쿼리를 강제로 한 번 refetch한다.
 */
export const useSSEFallback = (queryKey: QueryKey, hasPending: boolean) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!hasPending) return;
    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
    }, FALLBACK_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [hasPending, queryKey, queryClient]);
};

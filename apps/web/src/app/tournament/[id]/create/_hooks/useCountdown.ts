import { useEffect, useState } from 'react';

import { parseServerLocalDateTime } from '@/utils/formatDate';

const pad = (value: number) => value.toString().padStart(2, '0');

const formatRemaining = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

/**
 * 마감 시각까지 남은 시간을 `HH:MM:SS` 형식으로 반환.
 * SSR/CSR 하이드레이션 불일치를 피하기 위해 마운트 후에만 계산.
 */
export const useCountdown = (deadline: Date | string | number) => {
  const target = (() => {
    if (typeof deadline === 'object') return deadline.getTime();
    if (typeof deadline === 'string') return parseServerLocalDateTime(deadline).getTime();
    return new Date(deadline).getTime();
  })();
  const [remaining, setRemaining] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(formatRemaining(target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return { remaining, isExpired: remaining === '00:00:00' };
};

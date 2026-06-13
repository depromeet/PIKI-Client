'use client';

import { TimerIconFill } from '@/assets/icons/fill';

import { useCountdown } from '../../_hooks/useCountdown';

type DepositCountdownProps = {
  deadline: Date | string | number;
};

function DepositCountdown({ deadline }: DepositCountdownProps) {
  const { remaining } = useCountdown(deadline);

  return (
    <div className="flex items-center justify-center gap-1.5 text-text-accent">
      <TimerIconFill className="size-4" />
      <p className="body-2-semibold">{remaining ?? '--:--:--'} 후 담기 종료</p>
    </div>
  );
}

export default DepositCountdown;

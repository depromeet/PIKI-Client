import type { ComponentProps } from 'react';

import { BasketIconFill, TargetIconFill, TrophyIconFill } from '@/assets/icons';
import { TOURNAMENT_STATUS } from '@/consts/tournament';
import { cn } from '@/utils/cn';

import { type StatusChipStyleProps, statusChipStyles } from './statusChip.style';

const STATUS_CONFIG = {
  [TOURNAMENT_STATUS.PENDING]: {
    label: '담는 중',
    Icon: <BasketIconFill className="size-3.5 text-yellow-400" />,
  },
  [TOURNAMENT_STATUS.IN_PROGRESS]: {
    label: '플레이',
    Icon: <TargetIconFill className="size-3.5 text-green-300" />,
  },
  [TOURNAMENT_STATUS.COMPLETED]: {
    label: '완료',
    Icon: <TrophyIconFill className="size-3.5 text-blue-300" />,
  },
} as const;

type StatusChipProps = Omit<ComponentProps<'span'>, 'children'> &
  StatusChipStyleProps & {
    status: NonNullable<StatusChipStyleProps['status']>;
  };

function StatusChip({ status, className, ...rest }: StatusChipProps) {
  const { label, Icon } = STATUS_CONFIG[status];

  return (
    <span className={cn(statusChipStyles({ status }), className)} {...rest}>
      {Icon}
      {label}
    </span>
  );
}

export default StatusChip;

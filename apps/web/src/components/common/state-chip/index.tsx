import type { ComponentProps } from 'react';

import { BasketIconFill, TargetIconFill, TrophyIconFill } from '@/assets/icons';
import { TOURNAMENT_STATUS } from '@/consts/tournament';
import { cn } from '@/utils/cn';

import { type StateChipStyleProps, stateChipStyles } from './stateChip.style';

const STATE_CONFIG = {
  [TOURNAMENT_STATUS.PENDING]: { label: '담는 중', Icon: BasketIconFill },
  [TOURNAMENT_STATUS.IN_PROGRESS]: { label: '플레이', Icon: TargetIconFill },
  [TOURNAMENT_STATUS.COMPLETED]: { label: '완료', Icon: TrophyIconFill },
} as const;

type StateChipProps = Omit<ComponentProps<'span'>, 'children'> &
  StateChipStyleProps & {
    state: NonNullable<StateChipStyleProps['state']>;
  };

function StateChip({ state, className, ...rest }: StateChipProps) {
  const { label, Icon } = STATE_CONFIG[state];

  return (
    <span className={cn(stateChipStyles({ state }), className)} {...rest}>
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}

export default StateChip;

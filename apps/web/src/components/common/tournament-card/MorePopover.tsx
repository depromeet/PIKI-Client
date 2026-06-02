import type { ComponentType, SVGProps } from 'react';

import {
  GroupIconFill,
  HeartIconFill,
  LinkIconFill,
  ThreeDotHorizontalIconFill,
  TrashIconFill,
} from '@/assets/icons';
import { TOURNAMENT_STATUS } from '@/consts/tournament';
import type { TournamentStatusT } from '@/types/tournament';

import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '../popover';

type MorePopoverProps = {
  status: TournamentStatusT;
  tournamentId: number;
};

function MorePopover({ status, tournamentId }: MorePopoverProps) {
  const handleAddTournamentItem = () => {};

  const handleDeleteTournament = () => {};

  const handleViewFriendList = () => {};

  const handleShareTournamentResult = () => {};

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" aria-label="더보기" className="cursor-pointer">
          <ThreeDotHorizontalIconFill className="size-6 text-icon-neutral-secondary" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-2" align="end" alignOffset={-24}>
        <PopoverTitle className="sr-only">더보기</PopoverTitle>

        {status === TOURNAMENT_STATUS.PENDING && (
          <>
            <OptionButton
              Icon={HeartIconFill}
              label="위시 추가하기"
              onClick={handleAddTournamentItem}
            />
            <OptionButton Icon={TrashIconFill} label="삭제하기" onClick={handleDeleteTournament} />
          </>
        )}

        {status === TOURNAMENT_STATUS.IN_PROGRESS && (
          <>
            <OptionButton
              Icon={GroupIconFill}
              label="친구 목록 보기"
              onClick={handleViewFriendList}
            />
            <OptionButton
              disabled
              Icon={TrashIconFill}
              label="삭제하기"
              onClick={handleDeleteTournament}
            />
          </>
        )}

        {status === TOURNAMENT_STATUS.COMPLETED && (
          <>
            <OptionButton
              Icon={GroupIconFill}
              label="친구 목록 보기"
              onClick={handleViewFriendList}
            />
            <OptionButton
              Icon={LinkIconFill}
              label="결과 공유하기"
              onClick={handleShareTournamentResult}
            />
            <OptionButton Icon={TrashIconFill} label="삭제하기" onClick={handleDeleteTournament} />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default MorePopover;

type OptionButtonProps = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function OptionButton({ Icon, label, onClick, disabled = false }: OptionButtonProps) {
  return (
    <button
      type="button"
      className="group flex w-full cursor-pointer items-center gap-2 px-4 py-3 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon
        className="size-6 text-icon-neutral-primary group-disabled:text-icon-neutral-secondary"
        aria-hidden
      />
      <span className="body-1-semibold text-text-neutral-primary group-disabled:text-text-neutral-tertiary">
        {label}
      </span>
    </button>
  );
}

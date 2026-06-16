'use client';

import { useRouter } from 'next/navigation';
import { type ComponentType, type SVGProps, useState } from 'react';

import {
  GroupIconFill,
  HeartIconFill,
  LinkIconFill,
  ThreeDotHorizontalIconFill,
  TrashIconFill,
} from '@/assets/icons';
import { QUERY_ACTION } from '@/consts/queryAction';
import { ROUTES } from '@/consts/route';
import { TOURNAMENT_STATUS } from '@/consts/tournament';
import type { TournamentStatusT } from '@/types/tournament';

import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '../popover';
import FriendListDialog, { type FriendListItemT } from './FriendListDialog';
import TournamentDeleteDialog from './TournamentDeleteDialog';

type MorePopoverProps = {
  status: TournamentStatusT;
  tournamentId: number;
  /** 친구 목록 (본인 포함). 1명 이상이면 '친구 목록 보기' 메뉴를 노출한다. */
  friends?: FriendListItemT[];
};

function MorePopover({ status, tournamentId, friends = [] }: MorePopoverProps) {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFriendListOpen, setIsFriendListOpen] = useState(false);

  // 초대한 친구가 1명 이상일 때만 친구 목록 보기 메뉴 노출.
  // friends 에는 본인이 포함될 수 있으므로 isMe 가 아닌 인원이 1명 이상인지로 판단.
  const hasInvitedFriends = friends.some(friend => !friend.isMe);

  const handleAddTournamentItem = () => {
    setIsPopoverOpen(false);
    router.push(
      `${ROUTES.TOURNAMENT_CREATE(tournamentId)}?${QUERY_ACTION.KEY}=${QUERY_ACTION.VALUE.OPEN_GET_ITEM_DIALOG}`
    );
  };

  const handleDeleteTournament = () => {
    setIsPopoverOpen(false);
    setIsDeleteDialogOpen(true);
  };

  const handleViewFriendList = () => {
    setIsPopoverOpen(false);
    setIsFriendListOpen(true);
  };

  const handleShareTournamentResult = () => {
    setIsPopoverOpen(false);
    router.push(
      `${ROUTES.TOURNAMENT_RESULT(tournamentId)}?${QUERY_ACTION.KEY}=${QUERY_ACTION.VALUE.SHARE_RECEIPT}`
    );
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
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
              <OptionButton
                Icon={TrashIconFill}
                label="삭제하기"
                onClick={handleDeleteTournament}
              />
            </>
          )}

          {status === TOURNAMENT_STATUS.IN_PROGRESS && (
            <>
              {hasInvitedFriends && (
                <OptionButton
                  Icon={GroupIconFill}
                  label="친구 목록 보기"
                  onClick={handleViewFriendList}
                />
              )}
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
              {hasInvitedFriends && (
                <OptionButton
                  Icon={GroupIconFill}
                  label="친구 목록 보기"
                  onClick={handleViewFriendList}
                />
              )}
              <OptionButton
                Icon={LinkIconFill}
                label="결과 공유하기"
                onClick={handleShareTournamentResult}
              />
              <OptionButton
                Icon={TrashIconFill}
                label="삭제하기"
                onClick={handleDeleteTournament}
              />
            </>
          )}
        </PopoverContent>
      </Popover>

      <TournamentDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        tournamentId={tournamentId}
      />

      <FriendListDialog
        open={isFriendListOpen}
        onOpenChange={setIsFriendListOpen}
        friends={friends}
      />
    </>
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

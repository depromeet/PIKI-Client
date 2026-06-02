'use client';

import { useState } from 'react';

import { AddIconOutline, ChevronDownIconOutline, ChevronUpIconOutline } from '@/assets/icons';
import UserProfileGroup from '@/components/common/user-profile-group';
import type { UserT } from '@/components/common/user-profile-group/userProfile.const';

import InviteFriendsDialog from '../invite-friends/InviteFriendsDialog';
import ParticipantChip from './ParticipantChip';

type ParticipantT = {
  user: UserT;
  itemCount: number;
};

type ParticipantPanelProps = {
  participants: ParticipantT[];
  inviteUrl?: string;
};

const getCollapsedLabel = (participants: ParticipantT[]) => {
  if (participants.length === 0) return '나';
  const names = participants.map(p => p.user.name).filter((name): name is string => Boolean(name));
  const head = names.slice(0, 2).join(' · ');
  const rest = names.length - 2;
  if (rest <= 0) return head;
  return `${head}... 외 ${rest}명`;
};

function ParticipantPanel({ participants, inviteUrl }: ParticipantPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const ChevronIcon = isExpanded ? ChevronUpIconOutline : ChevronDownIconOutline;
  const label = getCollapsedLabel(participants);
  const users = participants.map(p => p.user);

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-xl bg-base-50 px-4 py-3">
        <button
          type="button"
          onClick={() => setIsExpanded(prev => !prev)}
          className="flex w-full cursor-pointer items-center justify-between gap-3"
        >
          <div className="flex min-w-0 items-center gap-4">
            <UserProfileGroup users={users} max={3} />
            <p className="truncate body-1-semibold text-text-neutral-primary">{label}</p>
          </div>
          <ChevronIcon className="size-6 shrink-0 text-gray-300" />
        </button>

        {isExpanded && (
          <div className="flex flex-wrap gap-2">
            {participants.map(({ user, itemCount }) => (
              <ParticipantChip key={user.id} user={user} itemCount={itemCount} />
            ))}
            <button
              type="button"
              onClick={() => setIsInviteDialogOpen(true)}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border-neutral-muted bg-bg-layer-default"
              aria-label="친구 초대하기"
            >
              <AddIconOutline className="size-4 text-text-neutral-secondary" />
            </button>
          </div>
        )}
      </div>

      <InviteFriendsDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        inviteUrl={inviteUrl}
      />
    </>
  );
}

export default ParticipantPanel;

'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/dialog';
import UserProfile from '@/components/user-profile-group/UserProfile';
import type { ProfileTypeT, UserT } from '@/components/user-profile-group/userProfile.const';

export type FriendListItemT = {
  userId: string;
  nickname: string;
  profileImage?: string;
  /** 본인 여부 — true 면 우측에 "나" 배지 표시 */
  isMe?: boolean;
};

type FriendListDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  friends: FriendListItemT[];
};

/** 닉네임 → 안정적인 profileType(blue/yellow) 매핑. 이미지가 없을 때만 사용. */
const pickProfileType = (seed: string): ProfileTypeT => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(hash) % 2 === 0 ? 'blue' : 'yellow';
};

const toUser = (friend: FriendListItemT): UserT => ({
  id: friend.userId,
  name: friend.nickname,
  profileType: pickProfileType(friend.userId || friend.nickname),
  ...(friend.profileImage ? { imageUrl: friend.profileImage } : {}),
});

function FriendListDialog({ open, onOpenChange, friends }: FriendListDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="gap-4 p-5">
        <DialogTitle className="text-center title-1 text-text-neutral-primary">
          친구 목록 보기
        </DialogTitle>
        <DialogDescription className="sr-only">
          이 토너먼트에 참여한 친구 목록입니다.
        </DialogDescription>

        {/* 스크롤 영역 — 약 400px 안에서 4명 정도 노출, 나머지는 내부 스크롤 */}
        <ul className="hide-scrollbar flex max-h-80 flex-col gap-2 overflow-y-auto">
          {friends.map(friend => (
            <li key={friend.userId}>
              <FriendRow friend={friend} />
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

type FriendRowProps = {
  friend: FriendListItemT;
};

function FriendRow({ friend }: FriendRowProps) {
  const user = toUser(friend);

  return (
    <div className="flex h-14 items-center justify-between gap-3 rounded-xl bg-gray-50 px-3">
      <div className="flex min-w-0 items-center gap-3">
        <UserProfile user={user} className="size-9.5 border-0" />
        <span className="truncate body-1-semibold text-text-neutral-primary">
          {friend.nickname}
        </span>
      </div>
      {friend.isMe && (
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-bg-layer-default px-2 py-1 caption-1-semibold text-text-neutral-secondary">
          <UserProfile user={{ ...user, name: '나' }} className="size-4 border-0" />나
        </span>
      )}
    </div>
  );
}

export default FriendListDialog;

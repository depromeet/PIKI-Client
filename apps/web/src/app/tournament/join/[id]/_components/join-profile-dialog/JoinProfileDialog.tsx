'use client';

import Button from '@/components/common/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/common/drawer';
import { PROFILE_SVG } from '@/components/common/user-profile-group/userProfile.const';
import type { TournamentPreviewT } from '@/mocks/tournamentPreview';

import type { RandomNicknameT } from '../../../_consts/randomNickname';

type JoinProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preview: TournamentPreviewT;
  randomNickname: RandomNicknameT;
  onConfirm: () => void;
};

function JoinProfileDialog({
  open,
  onOpenChange,
  preview,
  randomNickname,
  onConfirm,
}: JoinProfileDialogProps) {
  const ProfileSvg = PROFILE_SVG[randomNickname.profileType];

  return (
    <Drawer open={open} onOpenChange={onOpenChange} dismissible={false}>
      <DrawerContent>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ProfileSvg className="size-15" aria-label={randomNickname.nickname} />
            <div className="flex flex-col items-center gap-1">
              <DrawerTitle className="heading-1 text-text-neutral-primary">
                {randomNickname.nickname}
              </DrawerTitle>
              <DrawerDescription className="body-2-medium text-text-neutral-tertiary">
                이 프로필로 참여할게요.
              </DrawerDescription>
            </div>
          </div>

          <div className="flex w-full flex-col gap-1 rounded-xl bg-gray-50 p-4">
            <p className="body-1-semibold text-text-neutral-primary">{preview.name}</p>
            <p className="body-2-medium text-text-neutral-secondary">
              후보 {preview.itemCount}개 · 참여 {preview.participantCount}명
            </p>
          </div>

          <Button size="lg" variant="primary" className="w-full" onClick={onConfirm}>
            참여하기
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default JoinProfileDialog;

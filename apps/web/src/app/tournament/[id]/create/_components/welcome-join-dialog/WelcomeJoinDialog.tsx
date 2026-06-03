'use client';

import Button from '@/components/common/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/common/drawer';
import { PROFILE_SVG, type ProfileTypeT } from '@/components/common/user-profile-group/userProfile.const';

type WelcomeJoinDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nickname: string;
  profileType: ProfileTypeT;
  onConfirm: () => void;
};

function WelcomeJoinDialog({
  open,
  onOpenChange,
  nickname,
  profileType,
  onConfirm,
}: WelcomeJoinDialogProps) {
  const ProfileSvg = PROFILE_SVG[profileType];

  return (
    <Drawer open={open} onOpenChange={onOpenChange} dismissible={false}>
      <DrawerContent>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <ProfileSvg className="size-12.5" aria-label={nickname} />
            <div className="flex flex-col items-center gap-1">
              <DrawerTitle className="heading-1 text-text-neutral-primary">
                {nickname}님,
              </DrawerTitle>
              <DrawerDescription className="text-center body-1-medium text-text-neutral-tertiary">
                프로필 등록이 완료됐어요
                <br />
                상품을 담아보세요!
              </DrawerDescription>
            </div>
          </div>

          <Button size="lg" variant="primary" className="w-full" onClick={onConfirm}>
            시작하기
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default WelcomeJoinDialog;

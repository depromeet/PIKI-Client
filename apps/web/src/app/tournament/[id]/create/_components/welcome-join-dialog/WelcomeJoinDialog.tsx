'use client';

import BaseImage from '@/components/base-image';
import Button from '@/components/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@/components/drawer';
import Skeleton from '@/components/skeleton';

type WelcomeJoinDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nickname: string;
  profileImage: string;
  onConfirm: () => void;
};

function WelcomeJoinDialog({
  open,
  onOpenChange,
  nickname,
  profileImage,
  onConfirm,
}: WelcomeJoinDialogProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} dismissible={false}>
      <DrawerContent>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="relative size-12.5 overflow-hidden rounded-full">
              <BaseImage
                src={profileImage}
                alt={`${nickname} 프로필 이미지`}
                sizes="50px"
                className="object-cover"
                loadingFallback={<Skeleton shape="circle" className="absolute inset-0" />}
              />
            </div>
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

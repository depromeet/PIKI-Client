'use client';

import { PersonIconFill } from '@/assets/icons/fill';

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../dialog';

type ProfileHeaderIconProps = {
  onClick?: () => void;
  className?: string;
};

/**
 * 헤더 프로필 버튼 (내부 전용)
 *
 * @description 직접 import하지 말고 {@link HeaderIcon} `name="PROFILE"`을 사용할 것
 * @example
 * <Header right={<HeaderIcon name="PROFILE" />} />
 */
function ProfileHeaderIcon({ onClick, className }: ProfileHeaderIconProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" aria-label="마이페이지" className={className} onClick={onClick}>
          <PersonIconFill className="size-6 text-icon-neutral-secondary" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>프로필 다이얼로그 구현 전</DialogTitle>
        <DialogDescription className="sr-only">마이페이지 내용</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileHeaderIcon;

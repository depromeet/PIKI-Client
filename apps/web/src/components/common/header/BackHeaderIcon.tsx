'use client';

import { useRouter } from 'next/navigation';

import { ChevronBackwardIconFill } from '@/assets/icons/fill';

type BackHeaderIconProps = {
  onClick?: () => void;
  className?: string;
};

/**
 * 헤더 뒤로가기 버튼 (내부 전용)
 *
 * @description 직접 import하지 말고 {@link HeaderIcon} `name="BACK"`을 사용할 것
 * @example
 * <Header left={<HeaderIcon name="BACK" />} />
 */
function BackHeaderIcon({ onClick, className }: BackHeaderIconProps) {
  const router = useRouter();

  return (
    <button type="button" onClick={onClick ?? router.back} className={className}>
      <ChevronBackwardIconFill className="size-6 text-icon-neutral-secondary" />
    </button>
  );
}

export default BackHeaderIcon;

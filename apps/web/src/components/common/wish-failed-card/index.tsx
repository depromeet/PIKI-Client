import Link from 'next/link';

import { WarningIconFill } from '@/assets/icons';

function WishFailedCard() {
  return (
    <div className="flex h-full min-h-[226px] flex-col items-center justify-center gap-3 rounded-xl bg-black/5 p-4">
      <WarningIconFill className="size-6 text-icon-neutral-secondary" />
      <p className="body-2-semibold text-text-neutral-secondary">가져오는데 실패했어요</p>
      <Link
        href="/items/manual"
        className="body-2-medium text-text-neutral-secondary underline underline-offset-[3px]"
      >
        직접 입력하기
      </Link>
    </div>
  );
}

export default WishFailedCard;

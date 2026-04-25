'use client';

import { useRouter } from 'next/navigation';

import { ensureUserId } from '@/utils/userId';

function EntryStartButton() {
  const router = useRouter();

  const handleClick = () => {
    ensureUserId();
    router.push('/home');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-5 flex h-14 w-full shrink-0 items-center justify-center rounded-[14px] bg-[#1B1C1E] text-base leading-[1.5] font-semibold tracking-[0.0912px] text-[#F7F7F8]"
    >
      아이템 등록하기
    </button>
  );
}

export default EntryStartButton;

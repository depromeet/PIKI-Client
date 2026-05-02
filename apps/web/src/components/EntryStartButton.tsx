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
      className="flex h-13.5 w-full shrink-0 items-center justify-center rounded-xl bg-[#191B1F] px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-[#F7F7F8]"
    >
      시작하기
    </button>
  );
}

export default EntryStartButton;

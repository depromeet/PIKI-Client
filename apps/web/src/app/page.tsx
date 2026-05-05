import Image from 'next/image';
import Link from 'next/link';

import PikiLogo from '@/assets/images/piki-logo.svg';

function EntryPage() {
  return (
    <main className="relative flex h-full flex-col overflow-x-hidden pt-[calc(env(safe-area-inset-top)+90px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <div className="relative aspect-200/114 w-50 self-center">
        <Image src={PikiLogo} alt="Piki" priority className="object-contain" />
      </div>

      <div className="relative mx-6 mt-10.25 mb-6 aspect-356/402 overflow-hidden rounded-xl motion-safe:animate-piki-fade-in">
        <Image
          src="/images/entry-chat-card.png"
          alt="고민 중인 아이템 채팅 스플래쉬"
          fill
          sizes="(max-width: 480px) calc(100vw - 48px), 432px"
          priority
          className="object-contain"
        />
      </div>

      <div className="mt-auto px-5">
        <Link
          href="/home"
          className="flex h-13.5 w-full shrink-0 items-center justify-center rounded-xl bg-[#191B1F] px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-[#F7F7F8]"
        >
          시작하기
        </Link>
      </div>
    </main>
  );
}

export default EntryPage;

import Image from 'next/image';

import EntryStartButton from '@/components/EntryStartButton';

function EntryPage() {
  return (
    <main className="relative flex h-full flex-col overflow-x-hidden px-5 pt-[calc(env(safe-area-inset-top)+100px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <div className="relative aspect-368/362 w-[55%] self-center">
        <Image
          src="/images/entry-gift-guide-v4.png"
          alt="기프트 가이드"
          fill
          sizes="(max-width: 480px) 80vw, 384px"
          priority
          className="object-contain"
        />
      </div>

      <div className="relative mt-4 aspect-[356/402] w-full overflow-hidden rounded-xl shadow-[0_0_8.259px_4.13px_rgba(0,0,0,0.04)]">
        <Image
          src="/images/entry-chat-card.png"
          alt="AI 소비 메이트 채팅 카드"
          fill
          sizes="(max-width: 480px) calc(100vw - 40px), 440px"
          priority
          className="object-cover"
        />
      </div>

      <EntryStartButton />
    </main>
  );
}

export default EntryPage;

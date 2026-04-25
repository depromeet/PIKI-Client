import Image from 'next/image';

function EntryPage() {
  return (
    <main className="relative flex h-full flex-col overflow-x-hidden px-5 pt-[calc(env(safe-area-inset-top)+32px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <div className="relative aspect-[208/215] w-[70%] self-center">
        <Image
          src="/images/entry-gift-guide.png"
          alt="기프트 가이드"
          fill
          sizes="(max-width: 480px) 70vw, 336px"
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

      <button
        type="button"
        className="mt-5 h-14 w-full shrink-0 rounded-[14px] bg-[#1B1C1E] text-base leading-[1.5] font-semibold tracking-[0.0912px] text-[#F7F7F8]"
      >
        아이템 등록하기
      </button>
    </main>
  );
}

export default EntryPage;

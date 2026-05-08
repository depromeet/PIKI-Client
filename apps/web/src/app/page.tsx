'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function EntryPage() {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = scroller;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStart = () => {
    router.push('/home');
  };

  const handleIndicatorClick = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({ left: scroller.clientWidth * index, behavior: 'smooth' });
  };

  return (
    <main className="relative flex h-full flex-col overflow-hidden bg-[#F1F1F1]">
      <div
        ref={scrollerRef}
        className="flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <SlideOne />
        <SlideTwo />
      </div>

      <div className="flex flex-col gap-6 pt-2 px-2.5 pb-[calc(env(safe-area-inset-bottom)+12px)]">
        <PageIndicator activeIndex={activeIndex} total={2} onClick={handleIndicatorClick} />
        <button
          type="button"
          onClick={handleStart}
          disabled={activeIndex !== 1}
          className="flex h-13.5 w-full items-center justify-center rounded-xl bg-[#191B1F] px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-[#F7F7F8] transition-opacity disabled:pointer-events-none disabled:opacity-0"
        >
          시작하기
        </button>
      </div>
    </main>
  );
}

function SlideOne() {
  return (
    <section className="relative flex h-full w-full shrink-0 snap-start snap-always flex-col items-center pt-[calc(env(safe-area-inset-top)+10%)] pb-32">
      <Logo />

      <h1 className="mt-7 text-center text-2xl leading-10 font-bold tracking-[-0.6px] text-[#171719]">
        흩어져있는 위시템을
        <br />
        한곳에 모으고
      </h1>

      <div className="relative mt-7 aspect-372/316 w-[93%] max-w-93">
        <Image
          src="/images/entry/entry-1-basket.png"
          alt="장바구니에 담긴 위시템들"
          fill
          sizes="(max-width: 480px) 93vw, 446px"
          quality={95}
          priority
          unoptimized
          className="object-contain"
        />
      </div>
    </section>
  );
}

function SlideTwo() {
  return (
    <section className="relative flex h-full w-full shrink-0 snap-start snap-always flex-col items-center pt-[calc(env(safe-area-inset-top)+10%)] pb-32">
      <Logo />

      <h1 className="mt-7 text-center text-2xl leading-10 font-bold tracking-[-0.6px] text-[#171719]">
        토너먼트로 진짜
        <br />
        사고싶은 물건을 찾아보세요!
      </h1>

      <div className="relative mt-6 aspect-1135/916 w-[88%] max-w-93">
        <Image
          src="/images/entry/entry-2-tournament.png"
          alt="토너먼트 카드 매치업"
          fill
          sizes="(max-width: 480px) 88vw, 422px"
          quality={95}
          priority
          unoptimized
          className="object-contain"
        />
      </div>
    </section>
  );
}

function Logo() {
  return (
    <div className="relative aspect-64/47 w-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/entry/piki-logo-cart.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/entry/piki-logo-text.svg"
        alt="Piki"
        className="absolute"
        style={{ left: '19.2%', top: '41.2%', width: '60.2%', height: '43.5%' }}
      />
    </div>
  );
}

type PageIndicatorProps = {
  activeIndex: number;
  total: number;
  onClick: (index: number) => void;
  className?: string;
};

function PageIndicator({ activeIndex, total, onClick, className }: PageIndicatorProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className ?? ''}`}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            aria-label={`${index + 1}번째 페이지로 이동`}
            onClick={() => onClick(index)}
            className={`h-2 rounded-full transition-all ${
              isActive ? 'w-5 bg-[#191B1F]' : 'w-2 bg-[#C5C8CE]'
            }`}
          />
        );
      })}
    </div>
  );
}

export default EntryPage;

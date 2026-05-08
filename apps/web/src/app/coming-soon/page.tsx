'use client';

import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import comingSoonBasket from '@/assets/images/coming-soon-basket.png';
import { useThemeColor } from '@/hooks/useThemeColor';

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] });

function ComingSoonPage() {
  useThemeColor('#FFFFFF');

  return (
    <main className="flex h-full flex-col px-5.5 pt-[calc(env(safe-area-inset-top)+60px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <section className="text-center">
        <h1 className="text-[28px] leading-snug font-extrabold tracking-[-0.6px] text-[#171719]">
          6월 26일 오픈합니다.
        </h1>
        <p className="mt-2 text-center text-[18px] leading-[26px] font-medium tracking-[-0.6px] text-[#ADB1BB]">
          곧, 만나요!
        </p>
      </section>

      <div className="mt-6 flex flex-1 flex-col items-center gap-[17.02px]">
        <section className="w-full">
          <Image
            src={comingSoonBasket}
            alt="장바구니"
            className="h-auto w-full object-contain"
            priority
          />
        </section>

        <section className="flex flex-col items-center gap-2">
        <a
          href="https://forms.gle/qcnMcNX6gkW68vcQ8"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2"
          aria-label="의견 남기기 폼으로 이동 (새 탭)"
        >
          <span
            className={poppins.className}
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: '18px',
              fontWeight: 700,
              lineHeight: '100%',
              letterSpacing: '-0.36px',
            }}
          >
            Click me!
          </span>
          <span
            style={{
              color: '#171719',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '22px',
              letterSpacing: '-0.6px',
              textDecorationLine: 'underline',
              textDecorationStyle: 'solid',
              textUnderlineOffset: 'auto',
              width: '156px',
              textAlign: 'center',
            }}
          >
            딱 30초! 의견 남기러 가기
          </span>
        </a>
      </section>
      </div>

      <section className="mt-6 w-full border-t border-[#F4F4F6] pt-6">
        <Link
          href="/"
          className="flex h-[54px] w-full items-center justify-center rounded-[12px] bg-black px-[30.016px] py-[12.864px] text-[16px] leading-normal font-semibold tracking-[0.1048px] text-white"
        >
          홈으로 돌아가기
        </Link>
      </section>
    </main>
  );
}

export default ComingSoonPage;

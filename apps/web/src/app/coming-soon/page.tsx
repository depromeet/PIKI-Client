import Image from 'next/image';
import Link from 'next/link';

import basketImage from '@/assets/images/coming-soon-basket.png';

function ComingSoonPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#eef1f3]">
      <section className="px-6 pt-[67px] text-center">
        <h1 className="text-[36px] leading-snug font-extrabold tracking-[-0.9108px] text-[#171719]">
          아직 준비 중이에요
        </h1>
        <p className="mt-[11px] text-[22px] leading-[1.6] font-semibold tracking-[-0.44px] text-black">
          더 개선된 서비스로 돌아올게요
        </p>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center px-4">
        <Image
          alt="런칭 예정 안내 바스켓 이미지"
          className="h-auto w-[368px] max-w-full object-contain"
          height={577}
          priority
          src={basketImage}
          width={368}
        />
        <div className="-mt-[190px] ml-[6.41px] w-[146.83px] bg-white/30 p-[6.705px] backdrop-blur-[2px]">
          <p className="text-center text-[21.461px] leading-normal font-bold tracking-[-0.4292px] text-black">
            6월 27일 오픈
          </p>
        </div>
      </section>

      <section className="w-full px-[21.44px] pb-[28px]">
        <button
          className="flex h-[64px] w-full items-center justify-center rounded-[12px] bg-black px-[30.016px] py-[12.864px] text-[18.39px] leading-normal font-semibold tracking-[0.1048px] text-white"
          type="button"
        >
          출시 알림 신청
        </button>
        <div className="mt-[17.7px] text-center">
          <Link
            className="text-[14px] leading-[20px] font-medium tracking-[-0.15px] text-[#989ba2] underline"
            href="/"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ComingSoonPage;

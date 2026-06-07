import Image from 'next/image';

import { SadIconFill } from '@/assets/icons';
import { Header, HeaderIcon } from '@/components/header';

import Basket from './_assets/basket.png';
import WithdrawConfirmDialog from './_components/WithdrawConfirmDialog';

async function MypageWithdrawPage() {
  return (
    <div className="flex h-dvh flex-col bg-bg-layer-basement px-5 pt-20">
      <Header
        left={<HeaderIcon name="BACK" />}
        center="회원탈퇴"
        centerClassName="title-1 text-text-neutral-primary"
      />

      <div className="h-[137px] shrink-0" />

      <div className="hide-scrollbar flex flex-1 flex-col items-center gap-12 overflow-y-auto pb-[98px]">
        <div className="flex w-full flex-col items-center gap-[15px]">
          <SadIconFill className="size-[74px] text-icon-neutral-secondary" aria-hidden />
          <p className="text-center heading-2 text-text-neutral-secondary">
            닉네임님, PiKi를 떠나시나요?
          </p>
          <p className="text-center body-2-medium text-text-neutral-tertiary">
            지금까지의 토너먼트 기록, 위시템 기록이 전부 사라져요.
          </p>
        </div>

        <div className="relative flex w-full flex-1 items-start">
          <Image src={Basket} alt="" fill className="w-[calc(100%-34px)] object-contain" priority />
        </div>
      </div>

      <WithdrawConfirmDialog />
    </div>
  );
}

export default MypageWithdrawPage;

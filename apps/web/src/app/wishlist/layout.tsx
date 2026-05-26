import { Header, HeaderIcon } from '@/components/common/header';

import WishTab from './_components/WishTab';

type WishlistLayoutProps = {
  children: React.ReactNode;
};

function WishlistLayout({ children }: WishlistLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-layer-basement">
      <div className="sticky top-0 z-10 inline-flex w-full flex-col items-start gap-5 bg-bg-layer-basement pt-[24px] pb-6">
        <div className="flex w-full flex-col gap-[5px]">
          <Header
            right={
              <>
                <HeaderIcon name="PROFILE" />
                <HeaderIcon name="ALARM" />
              </>
            }
          />
          <h1 className="px-5 text-[28px] leading-[137.5%] font-bold tracking-[-0.708px] text-[#171719]">
            내 보관함
          </h1>
        </div>
        <WishTab />
      </div>
      {children}
    </div>
  );
}

export default WishlistLayout;

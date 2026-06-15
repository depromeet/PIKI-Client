import { Suspense } from 'react';

import { Header, HeaderIcon } from '@/components/header';

import WishTab from './WishTab';

type WishlistLayoutProps = {
  children: React.ReactNode;
};

function WishlistLayout({ children }: WishlistLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-layer-basement px-5">
      <div className="sticky top-0 z-10 inline-flex w-full flex-col items-start gap-5 bg-bg-layer-basement pt-6 pb-6">
        <div className="flex w-full flex-col gap-[5px]">
          <Header
            right={
              <>
                <HeaderIcon name="ALARM" />
                <HeaderIcon name="PROFILE" />
              </>
            }
          />
          <h1 className="text-[28px] leading-[137.5%] font-bold tracking-[-0.708px] text-text-neutral-primary">
            내 보관함
          </h1>
        </div>
        <Suspense>
          <WishTab />
        </Suspense>
      </div>
      {children}
    </div>
  );
}

export default WishlistLayout;

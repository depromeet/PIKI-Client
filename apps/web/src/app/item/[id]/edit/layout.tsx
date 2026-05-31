import { Header, HeaderIcon } from '@/components/common/header';

function ItemEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-layer-default pt-9 pb-[78px]">
      <Header left={<HeaderIcon name="BACK" />} />
      {children}
    </div>
  );
}

export default ItemEditLayout;

'use client';

import { Header, HeaderIcon } from '@/components/header';

import { useGetWish } from '../_hooks/useGetWish';
import ItemEditForm from './ItemEditForm';
import ItemLinkBanner from './ItemLinkBanner';

type EditContentProps = {
  wishId: number;
};

function EditContent({ wishId }: EditContentProps) {
  const { wishData } = useGetWish(wishId);

  return (
    <div className="hide-scrollbar overflow-y-auto bg-bg-layer-basement px-5 pt-padding-top pb-[78px]">
      <Header left={<HeaderIcon name="BACK" />} />
      <main>
        <header className="mt-3 flex flex-col items-center gap-2 text-center">
          <h1 className="title-1 text-text-neutral-primary">
            {wishData.item.status === 'FAILED'
              ? '상품 정보를 가져오지 못 했어요.'
              : '위시템 정보 확인'}
          </h1>
          <h2 className="heading-2-medium text-text-neutral-tertiary">
            {wishData.item.status === 'FAILED'
              ? '직접 입력 후 저장해주세요'
              : '필요한 정보는 직접 수정할 수 있어요'}
          </h2>
        </header>

        <ItemEditForm
          wishId={wishId}
          itemStatus={wishData.item.status}
          initialImageUrl={wishData.item.status === 'READY' ? wishData.item.imageUrl : null}
          initialName={wishData.item.status === 'READY' ? wishData.item.name : ''}
          initialPrice={wishData.item.status === 'READY' ? wishData.item.currentPrice : 0}
        />

        {wishData.item.sourceUrl && <ItemLinkBanner href={wishData.item.sourceUrl} />}
      </main>
    </div>
  );
}

export default EditContent;

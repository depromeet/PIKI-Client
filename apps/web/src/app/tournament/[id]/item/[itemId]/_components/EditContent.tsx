'use client';

import { Header, HeaderIcon } from '@/components/header';
import { cn } from '@/utils/cn';

import { useGetTournamentItem } from '../_hooks/useGetTournamentItem';
import ItemEditForm from './ItemEditForm';
import ItemLinkBanner from './ItemLinkBanner';

type EditContentProps = {
  tournamentId: number;
  tournamentItemId: number;
};

function EditContent({ tournamentId, tournamentItemId }: EditContentProps) {
  const { tournamentItemData } = useGetTournamentItem(tournamentId, tournamentItemId);

  return (
    <div
      className={cn(
        'hide-scrollbar min-h-dvh overflow-y-auto px-5 pt-padding-top pb-[78px]',
        tournamentItemData.status === 'FAILED' ? 'bg-bg-layer-basement' : 'bg-bg-layer-default'
      )}
    >
      {tournamentItemData.status === 'FAILED' && <Header left={<HeaderIcon name="BACK" />} />}
      <main>
        <header className="mt-3 flex flex-col items-center gap-2 text-center">
          <h1 className="title-1 text-text-neutral-primary">위시템 정보 확인</h1>
          <h2 className="heading-2-medium text-text-neutral-tertiary">
            {tournamentItemData.status === 'FAILED'
              ? '필요한 정보는 직접 수정할 수 있어요'
              : '상품 정보는 링크를 갱신하면 자동으로 수정돼요'}
          </h2>
        </header>

        <ItemEditForm
          tournamentId={tournamentId}
          tournamentItemId={tournamentItemId}
          itemStatus={tournamentItemData.status}
          initialImageUrl={
            tournamentItemData.status === 'READY' ? tournamentItemData.imageUrl : null
          }
          initialName={tournamentItemData.status === 'READY' ? tournamentItemData.name : ''}
          initialPrice={tournamentItemData.status === 'READY' ? tournamentItemData.price : 0}
        />

        {tournamentItemData.status === 'READY' && tournamentItemData.sourceUrl && (
          <ItemLinkBanner href={tournamentItemData.sourceUrl} />
        )}
      </main>
    </div>
  );
}

export default EditContent;

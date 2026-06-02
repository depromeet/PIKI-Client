'use client';

import { Header, HeaderIcon } from '@/components/common/header';
import { cn } from '@/utils/cn';

import { useGetTournamentItem } from '../_hooks/useGetTournamentItem';
import ItemEditForm from './ItemEditForm';

type EditContentProps = {
  tournamentId: number;
  tournamentItemId: number;
};

function EditContent({ tournamentId, tournamentItemId }: EditContentProps) {
  const { tournamentItemData } = useGetTournamentItem(tournamentId, tournamentItemId);

  return (
    <div
      className={cn(
        'hide-scrollbar min-h-dvh overflow-y-auto px-5 pb-[78px]',
        tournamentItemData.status === 'FAILED' ? 'bg-bg-layer-basement' : 'bg-bg-layer-default'
      )}
    >
      {tournamentItemData.status === 'FAILED' && <Header left={<HeaderIcon name="BACK" />} />}
      <main>
        <header className="mt-3 flex flex-col items-center gap-2 text-center">
          <h1 className="title-1 text-text-neutral-primary">
            {tournamentItemData.status === 'FAILED'
              ? '상품 정보를 가져오지 못 했어요.'
              : '위시템 정보 수정'}
          </h1>
          <h2 className="heading-2-medium text-text-neutral-tertiary">
            {tournamentItemData.status === 'FAILED'
              ? '직접 입력 후 저장해주세요'
              : '필요한 정보는 직접 수정할 수 있어요'}
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

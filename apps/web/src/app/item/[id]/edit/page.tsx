import { MOCK_ITEM } from '@/mocks/items';
import type { ItemTypeT } from '@/types/item';

import ItemEditForm from './_components/ItemEditForm';

const parseType = (raw: string | string[] | undefined): ItemTypeT => {
  if (raw === 'tournament') return 'tournament';
  return 'wish';
};

type ItemEditPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string | string[] }>;
};

async function ItemEditPage({ params, searchParams }: ItemEditPageProps) {
  await params;
  const { type: typeParam } = await searchParams;
  const type = parseType(typeParam);

  // TODO: type, id 기반으로 실제 데이터 조회 (현재는 mock)

  return (
    <ItemEditForm
      type={type}
      initialName={MOCK_ITEM.name}
      initialPrice={MOCK_ITEM.price}
      imageUrl={MOCK_ITEM.imageUrl}
      productUrl={MOCK_ITEM.productUrl}
      productUrlLabel={MOCK_ITEM.productUrlLabel}
    />
  );
}

export default ItemEditPage;

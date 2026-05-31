import ItemManualForm from './_components/ItemManualForm';

type ItemManualPageProps = {
  searchParams: Promise<{ wishId?: string }>;
};

async function ItemManualPage({ searchParams }: ItemManualPageProps) {
  const { wishId } = await searchParams;
  const parsedWishId = wishId ? Number(wishId) : null;

  return <ItemManualForm wishId={parsedWishId} />;
}

export default ItemManualPage;

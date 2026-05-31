'use client';

import { useState } from 'react';

import { EditIconFill } from '@/assets/icons';
import BottomCta from '@/components/common/bottom-cta';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Spacing from '@/components/common/spacing';
import Spinner from '@/components/common/spinner';
import type { TournamentItemStatusT } from '@/types/tournament';
import { cn } from '@/utils/cn';
import formatPrice from '@/utils/formatPrice';

import { useDeleteTournamentItem } from '../_hooks/useDeleteTournamentItem';
import ItemImageSection from './ItemImageSection';

type ItemEditFormProps = {
  tournamentId: number;
  tournamentItemId: number;
  itemStatus: TournamentItemStatusT;
  initialImageUrl: string | null;
  initialName: string;
  initialPrice: number;
};

const parsePriceToNumber = (raw: string): number => {
  const digits = raw.replace(/[^\d]/g, '');
  return digits.length === 0 ? 0 : Number(digits);
};

function ItemEditForm({
  tournamentId,
  tournamentItemId,
  itemStatus,
  initialImageUrl,
  initialName,
  initialPrice,
}: ItemEditFormProps) {
  const initialPriceFormatted = initialPrice ? formatPrice(String(initialPrice)) : '';

  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPriceFormatted);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { deleteTournamentItemMutation, isDeleteTournamentItemPending } = useDeleteTournamentItem(
    tournamentId,
    tournamentItemId
  );

  const trimmedName = name.trim();
  const parsedPrice = parsePriceToNumber(price);

  const isValid = trimmedName.length > 0 && parsedPrice > 0;

  const handleSave = () => {
    const isChanged =
      trimmedName !== initialName.trim() ||
      formatPrice(price) !== initialPriceFormatted ||
      selectedImage !== null;
    if (!isChanged) return;

    // onSubmit({ name: trimmedName, price: parsedPrice });
  };

  const handleDelete = () => {
    if (isDeleteTournamentItemPending) return;

    deleteTournamentItemMutation();
  };

  return (
    <>
      <ItemImageSection imageUrl={initialImageUrl} onImageSelect={setSelectedImage} />

      <Spacing size={24} />

      <div className="flex flex-col gap-5">
        <Input
          label="상품명"
          value={name}
          placeholder="상품명을 입력해주세요."
          onChange={event => setName(event.target.value)}
          maxLength={50}
          autoCorrect="off"
          right={itemStatus === 'READY' ? <EditIconFill className="size-5" /> : null}
        />
        <Input
          label="가격"
          value={price}
          placeholder="가격을 입력해주세요."
          onChange={event => setPrice(formatPrice(event.target.value, { withSuffix: false }))}
          onFocus={() => setPrice(prev => formatPrice(prev, { withSuffix: false }))}
          onBlur={() => setPrice(prev => formatPrice(prev))}
          inputMode="numeric"
          autoCorrect="off"
          right={itemStatus === 'READY' ? <EditIconFill className="size-5" /> : null}
        />
      </div>

      <BottomCta
        className={cn(
          'py-3',
          itemStatus === 'FAILED' ? 'bg-bg-layer-basement' : 'bg-bg-layer-default'
        )}
      >
        {itemStatus === 'READY' && (
          <Button variant="secondary" size="lg" className="flex-1" onClick={handleDelete}>
            {isDeleteTournamentItemPending ? <Spinner size={20} /> : '삭제하기'}
          </Button>
        )}
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          disabled={isDeleteTournamentItemPending || !isValid}
          className="flex-1"
        >
          {itemStatus === 'FAILED' ? '저장하기' : '확인'}
        </Button>
      </BottomCta>
    </>
  );
}

export default ItemEditForm;

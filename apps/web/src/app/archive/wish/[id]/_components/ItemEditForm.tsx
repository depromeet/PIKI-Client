'use client';

import { useState } from 'react';

import { EditIconFill } from '@/assets/icons';
import BottomCta from '@/components/bottom-cta';
import Button from '@/components/button';
import Input from '@/components/input';
import Spacing from '@/components/spacing';

import type { ItemStatusT } from '@/types/item';
import formatPrice from '@/utils/formatPrice';

import { useDeleteWish } from '../_hooks/useDeleteWish';
import { usePatchWish } from '../_hooks/usePatchWish';
import ItemImageSection from './ItemImageSection';

type ItemEditFormProps = {
  wishId: number;
  itemStatus: ItemStatusT;
  initialImageUrl: string | null;
  initialName: string;
  initialPrice: number;
};

const parsePriceToNumber = (raw: string): number => {
  const digits = raw.replace(/[^\d]/g, '');
  return digits.length === 0 ? 0 : Number(digits);
};

function ItemEditForm({
  wishId,
  itemStatus,
  initialImageUrl,
  initialName,
  initialPrice,
}: ItemEditFormProps) {
  const initialPriceFormatted = initialPrice ? formatPrice(String(initialPrice)) : '';

  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPriceFormatted);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { patchWishMutation, isPatchWishPending } = usePatchWish(wishId);
  const { deleteWishMutation, isDeleteWishPending } = useDeleteWish(wishId);

  const trimmedName = name.trim();
  const parsedPrice = parsePriceToNumber(price);

  const isValid = trimmedName.length > 0 && parsedPrice > 0;

  const handleSave = () => {
    const isChanged =
      trimmedName !== initialName.trim() ||
      formatPrice(price) !== initialPriceFormatted ||
      selectedImage !== null;
    if (!isChanged || isPatchWishPending) return;

    patchWishMutation({
      name: trimmedName,
      currentPrice: parsedPrice,
      ...(selectedImage ? { image: selectedImage } : {}), // TODO: url로 보내야함
    });
  };

  const handleDelete = () => {
    if (isDeleteWishPending) return;

    deleteWishMutation();
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

      <BottomCta className="bg-bg-layer-basement py-3">
        {itemStatus === 'READY' && (
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            isLoading={isDeleteWishPending}
            onClick={handleDelete}
          >
            삭제하기
          </Button>
        )}
        <Button
          variant="primary"
          size="lg"
          isLoading={isPatchWishPending}
          disabled={isDeleteWishPending || !isValid}
          className="flex-1"
          onClick={handleSave}
        >
          저장하기
        </Button>
      </BottomCta>
    </>
  );
}

export default ItemEditForm;

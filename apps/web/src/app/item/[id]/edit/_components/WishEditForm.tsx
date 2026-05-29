'use client';

import Image from 'next/image';
import { useState } from 'react';

import { EditIconFill } from '@/assets/icons';
import BottomCta from '@/components/common/bottom-cta';
import Button from '@/components/common/button';
import { Header, HeaderIcon } from '@/components/common/header';
import Input from '@/components/common/input';
import formatPrice from '@/utils/formatPrice';

import { useGetWish } from '../_hooks/useGetWish';
import { usePatchWish } from '../_hooks/usePatchWish';
import ItemLinkBanner from './ItemLinkBanner';

type WishEditFormProps = {
  wishId: number;
};

const parsePriceToNumber = (raw: string): number => {
  const digits = raw.replace(/[^\d]/g, '');
  return digits.length === 0 ? 0 : Number(digits);
};

const getSourceUrlLabel = (sourceUrl: string | null): string => {
  if (!sourceUrl) return '';
  try {
    const { hostname } = new URL(sourceUrl);
    return `${hostname}에서 확인하기`;
  } catch {
    return sourceUrl;
  }
};

function WishEditForm({ wishId }: WishEditFormProps) {
  const { wishData } = useGetWish(wishId);
  const { patchWishMutation, isPatchWishPending } = usePatchWish(wishId);

  const initialName = wishData.item.name;
  const initialPriceFormatted = wishData.item.currentPrice
    ? formatPrice(String(wishData.item.currentPrice))
    : '';

  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPriceFormatted);

  const trimmedName = name.trim();
  const parsedPrice = parsePriceToNumber(price);

  const isChanged =
    trimmedName !== initialName.trim() ||
    formatPrice(price) !== initialPriceFormatted;
  const isValid = trimmedName.length > 0 && parsedPrice > 0;
  const isSaveDisabled = isPatchWishPending || !isChanged || !isValid;

  const handleSave = () => {
    if (isSaveDisabled) return;
    patchWishMutation({
      name: trimmedName,
      currentPrice: parsedPrice,
    });
  };

  const { item } = wishData;
  const sourceUrl = item.sourceUrl ?? '';
  const sourceUrlLabel = getSourceUrlLabel(item.sourceUrl);

  return (
    <main className="flex min-h-dvh flex-col bg-bg-layer-default pt-9 pb-[78px]">
      <Header left={<HeaderIcon name="BACK" />} />
      <div className="flex w-full flex-col gap-6 px-5 pt-3">
        {/* 헤더 */}
        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[24px] leading-8 font-bold tracking-[-0.6px] text-text-neutral-primary">
            위시템 정보 확인
          </h1>
          <p className="heading-2-medium text-text-neutral-tertiary">
            필요한 정보는 직접 수정할 수 있어요
          </p>
        </header>

        {/* 상품 이미지 */}
        <div className="relative mx-auto size-[200px] overflow-hidden rounded-xl bg-gray-50">
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt="상품 이미지"
              fill
              sizes="200px"
              className="object-cover"
            />
          )}
        </div>

        {/* 입력 필드 */}
        <div className="flex flex-col gap-5">
          <Input
            label="상품명"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={50}
            right={<EditIconFill className="size-5" />}
          />
          <Input
            label="가격"
            value={price}
            onChange={e => setPrice(formatPrice(e.target.value, { withSuffix: false }))}
            onFocus={() => setPrice(prev => formatPrice(prev, { withSuffix: false }))}
            onBlur={() => setPrice(prev => formatPrice(prev))}
            inputMode="numeric"
            right={<EditIconFill className="size-5" />}
          />
        </div>

        {/* 원본 링크 배너 */}
        {sourceUrl && <ItemLinkBanner href={sourceUrl} label={sourceUrlLabel} />}
      </div>

      {/* 하단 고정 버튼 */}
      <BottomCta>
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          disabled={isSaveDisabled}
          className="flex-1"
        >
          저장하기
        </Button>
      </BottomCta>
    </main>
  );
}

export default WishEditForm;

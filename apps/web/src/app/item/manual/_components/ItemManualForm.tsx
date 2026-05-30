'use client';

import { useRef, useState } from 'react';

import { ImageIconFill } from '@/assets/icons';
import BottomCta from '@/components/common/bottom-cta';
import Button from '@/components/common/button';
import { Header, HeaderIcon } from '@/components/common/header';
import Input from '@/components/common/input';
import formatPrice from '@/utils/formatPrice';

import { useDeleteFailedWish } from '../_hooks/useDeleteFailedWish';
import { usePatchWish } from '../_hooks/usePatchWish';

type ItemManualFormProps = {
  wishId: number | null;
};

function ItemManualForm({ wishId }: ItemManualFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const { patchWishMutation, isPatchWishPending } = usePatchWish(wishId ?? 0);
  const { deleteWishMutation, isDeleteWishPending } = useDeleteFailedWish(wishId ?? 0);

  const handleOpenPicker = () => {
    inputRef.current?.click();
  };

  // TODO: 이미지 업로드 API 구현 후 CDN URL로 변환하여 PATCH 요청에 포함
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleDelete = () => {
    if (!wishId) return;
    deleteWishMutation();
  };

  const handleSave = () => {
    if (!wishId) return;
    patchWishMutation({
      name,
      currentPrice: Number(price.replace(/[^\d]/g, '')),
    });
  };

  const isValid =
    name.trim().length > 0 &&
    price.replace(/[^\d]/g, '') !== '' &&
    price.replace(/[^\d]/g, '') !== '0';

  return (
    <main className="flex min-h-dvh flex-col pb-[78px]">
      <div className="pt-9">
        <Header left={<HeaderIcon name="BACK" />} />
      </div>

      <div className="flex w-full flex-col gap-6 pt-6">
        {/* 헤더 */}
        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="title-1 text-text-neutral-primary">상품 정보를 가져오지 못했어요</h1>
          <p className="heading-2-medium text-text-neutral-tertiary">직접 입력 후 저장해주세요</p>
        </header>

        {/* 이미지 추가 영역 */}
        <button
          type="button"
          onClick={handleOpenPicker}
          aria-label="이미지 추가"
          className="mx-auto flex size-[200px] cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-black/4"
          {...(imageUrl
            ? {
                style: {
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                },
              }
            : {})}
        >
          {!imageUrl && (
            <>
              <ImageIconFill className="size-8 text-icon-neutral-secondary" />
              <span className="body-2-medium text-text-neutral-secondary underline underline-offset-[3px]">
                이미지를 추가해주세요
              </span>
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* 입력 필드 */}
        <div className="flex flex-col gap-5 px-5">
          <Input
            label="상품명"
            placeholder="상품명을 입력해주세요."
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={50}
          />
          <Input
            label="가격"
            placeholder="가격을 입력해주세요."
            value={price}
            onChange={e => setPrice(formatPrice(e.target.value, { withSuffix: false }))}
            onFocus={() => setPrice(prev => formatPrice(prev, { withSuffix: false }))}
            onBlur={() => setPrice(prev => formatPrice(prev))}
            inputMode="numeric"
          />
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <BottomCta>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleDelete}
          disabled={!wishId || isDeleteWishPending}
          className="flex-1"
          aria-label="삭제하기"
        >
          삭제하기
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          disabled={!isValid || !wishId || isPatchWishPending}
          className="flex-1"
        >
          저장하기
        </Button>
      </BottomCta>
    </main>
  );
}

export default ItemManualForm;

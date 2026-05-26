'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { ImageIconOutline } from '@/assets/icons';
import Button from '@/components/common/button';
import { Header, HeaderIcon } from '@/components/common/header';
import Input from '@/components/common/input';
import formatPrice from '@/utils/formatPrice';

function ItemManualForm() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleOpenPicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleDelete = () => {
    // TODO: 실제 삭제 처리 후 라우팅
    router.back();
  };

  const handleSave = () => {
    // TODO: API 연동 — 수동 입력 위시템 저장
    router.back();
  };

  const isValid =
    Boolean(imageUrl) &&
    name.trim().length > 0 &&
    price.replace(/[^\d]/g, '') !== '' &&
    price.replace(/[^\d]/g, '') !== '0';

  return (
    <main className="flex min-h-dvh flex-col pb-[78px]">
      <div className="pt-9">
        <Header left={<HeaderIcon name="BACK" onClick={handleBack} />} />
      </div>

      <div className="flex w-full flex-col gap-6 pt-6">
        {/* 헤더 */}
        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[24px] leading-8 font-bold tracking-[-0.6px] text-text-neutral-primary">
            상품 정보를 가져오지 못했어요
          </h1>
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
              <ImageIconOutline className="size-8 text-icon-neutral-secondary" />
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
        <div className="flex flex-col gap-5">
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
      <div className="fixed right-0 bottom-0 left-0 mx-auto flex w-full max-w-120 items-center gap-2.5 bg-bg-layer-basement px-5 pt-3 pb-5">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleDelete}
          className="flex-1"
          aria-label="삭제하기"
        >
          삭제하기
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          disabled={!isValid}
          className="flex-1"
        >
          저장하기
        </Button>
      </div>
    </main>
  );
}

export default ItemManualForm;

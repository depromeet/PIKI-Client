'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { EditIconFill } from '@/assets/icons';
import Button from '@/components/common/button';
import { Header, HeaderIcon } from '@/components/common/header';
import Input from '@/components/common/input';
import type { ItemTypeT } from '@/types/item';
import formatPrice from '@/utils/formatPrice';

import ItemLinkBanner from './ItemLinkBanner';

type ItemEditFormProps = {
  type: ItemTypeT;
  initialName: string;
  initialPrice: string;
  imageUrl: string;
  productUrl: string;
  productUrlLabel: string;
};

function ItemEditForm({
  type,
  initialName,
  initialPrice,
  imageUrl,
  productUrl,
  productUrlLabel,
}: ItemEditFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(formatPrice(initialPrice));

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    // TODO: 후보 삭제 처리
    router.back();
  };

  const handleSave = () => {
    // TODO: type별 분기 (wish | tournament)에 따라 다른 API 호출
    router.back();
  };

  const isWish = type === 'wish';
  const title = isWish ? '위시템 정보 확인' : '상품 정보를 가져왔어요';
  const description = isWish
    ? '필요한 정보는 직접 수정할 수 있어요'
    : '상품명과 가격은 직접 수정할 수 있어요';

  return (
    <div className="flex min-h-dvh flex-col bg-bg-layer-default pt-15 pb-[78px]">
      {isWish && <Header left={<HeaderIcon name="BACK" />} />}
      <div className="mx-auto flex w-[362px] flex-col gap-6 px-0 pt-3">
        {/* 헤더 */}
        <header className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[24px] leading-8 font-bold tracking-[-0.6px] text-text-neutral-primary">
            {title}
          </h1>
          <p className="heading-2-medium text-text-neutral-tertiary">{description}</p>
        </header>

        {/* 상품 이미지 */}
        <div className="relative mx-auto size-[200px] overflow-hidden rounded-xl bg-gray-50">
          <Image src={imageUrl} alt="상품 이미지" fill sizes="200px" className="object-cover" />
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
        <ItemLinkBanner href={productUrl} label={productUrlLabel} />
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed right-0 bottom-0 left-0 mx-auto flex w-full max-w-120 items-center gap-3 border-t border-gray-50 bg-bg-layer-default px-5 py-3">
        {!isWish && (
          <Button
            variant="secondary"
            size="lg"
            onClick={handleDelete}
            className="flex-1"
            aria-label="후보 삭제하기"
          >
            삭제하기
          </Button>
        )}
        <Button variant="primary" size="lg" onClick={handleSave} className="flex-1">
          저장하기
        </Button>
      </div>
    </div>
  );
}

export default ItemEditForm;

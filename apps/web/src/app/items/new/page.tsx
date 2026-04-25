'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { parsedProductQueryKey, useAddWish, useParsedProduct } from '@/hooks/useWishes';
import { useWishStore } from '@/stores/wishStore';
import type { ProductT } from '@/types/wish';
import { cn } from '@/utils/cn';
import { fileToDataUrl } from '@/utils/fileToDataUrl';

const formatPrice = (price: number) => `${price.toLocaleString('ko-KR')}원`;

const parsePriceInput = (raw: string) => {
  const digits = raw.replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 0;
};

function NewItemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const isManual = searchParams.get('manual') === '1';
  const url = useWishStore(state => state.pendingUrl);
  const clearPendingUrl = useWishStore(state => state.clearPendingUrl);

  const parsedQuery = useParsedProduct(isManual ? '' : url);
  const addWishMutation = useAddWish();

  const [nameOverride, setNameOverride] = useState<string | null>(null);
  const [priceOverride, setPriceOverride] = useState<string | null>(null);
  const [manualImageUrl, setManualImageUrl] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  useEffect(() => {
    if (!isManual && !url) router.replace('/home');
  }, [isManual, url, router]);

  const baseName = parsedQuery.data?.name ?? '';
  const basePrice = parsedQuery.data ? String(parsedQuery.data.price) : '';

  const name = nameOverride ?? baseName;
  const priceText = priceOverride ?? basePrice;

  const handleRetry = () => {
    if (isManual) return;
    setNameOverride(null);
    setPriceOverride(null);
    queryClient.invalidateQueries({ queryKey: parsedProductQueryKey(url) });
  };

  const handleAddWish = async () => {
    if (addWishMutation.isPending) return;
    if (!name.trim() || !priceText.trim()) return;

    const product: ProductT = isManual
      ? {
          url: '',
          shopName: '직접 입력',
          shopHost: '',
          imageUrl: manualImageUrl,
          name: name.trim(),
          price: parsePriceInput(priceText),
        }
      : {
          ...(parsedQuery.data as ProductT),
          name: name.trim(),
          price: parsePriceInput(priceText),
        };

    await addWishMutation.mutateAsync(product);
    clearPendingUrl();
    router.replace('/home');
  };

  const isParsing = !isManual && (parsedQuery.isPending || parsedQuery.isFetching);
  const showProductView = isManual || Boolean(parsedQuery.data);
  const canSubmit = name.trim().length > 0 && priceText.trim().length > 0;

  return (
    <main className="relative flex h-full flex-col overflow-x-hidden px-5 pt-[calc(env(safe-area-inset-top)+60px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      {!showProductView ? (
        <ParsingState />
      ) : (
        <>
          <h1 className="text-[28px] leading-snug font-bold tracking-[-0.7084px] text-[#171719]">
            위시템 추가
          </h1>

          {!isManual && parsedQuery.data && (
            <a
              href={parsedQuery.data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-3 rounded-2xl bg-[#F2F6FB] px-4.5 py-5 transition-colors active:bg-[#E5ECF5]"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#1A1A1A]">
                {parsedQuery.data.shopName}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base leading-5 font-bold text-[#1A1A1A]">
                  상품 정보를 가져왔어요
                </p>
                <p className="mt-1 truncate text-xs leading-5 font-medium text-[#787878B3]">
                  {parsedQuery.data.url.replace(/^https?:\/\//, '')}에서 확인하기
                </p>
              </div>
              <ChevronRightIcon />
            </a>
          )}

          {isManual ? (
            <ImageUploadField
              imageUrl={manualImageUrl}
              error={imageError}
              onChange={async file => {
                setImageError('');
                try {
                  const dataUrl = await fileToDataUrl(file);
                  setManualImageUrl(dataUrl);
                } catch {
                  setImageError('이미지를 불러올 수 없어요');
                }
              }}
              onRemove={() => {
                setManualImageUrl('');
                setImageError('');
              }}
              className="mt-3"
            />
          ) : (
            parsedQuery.data && (
              <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-2xl border border-black/4 bg-[#F9FAFB]">
                <Image
                  src={parsedQuery.data.imageUrl}
                  alt={parsedQuery.data.name}
                  fill
                  sizes="(max-width: 480px) calc(100vw - 40px), 440px"
                  className="object-cover"
                />
              </div>
            )
          )}

          <FieldInput
            label="상품명"
            value={name}
            onChange={setNameOverride}
            placeholder="상품명을 입력해주세요"
            editableByDefault={isManual}
            className="mt-5"
          />
          <FieldInput
            label="가격"
            value={priceText ? formatPrice(parsePriceInput(priceText)) : ''}
            onChange={value => setPriceOverride(value.replace(/[^0-9]/g, ''))}
            placeholder="가격을 입력해주세요"
            inputMode="numeric"
            editableByDefault={isManual}
            className="mt-5"
          />

          <div className="mt-auto flex gap-3 pt-6">
            {!isManual && (
              <button
                type="button"
                onClick={handleRetry}
                disabled={isParsing || addWishMutation.isPending}
                className="flex h-13 flex-1 items-center justify-center rounded-xl border border-[#70737C29] bg-white text-[17px] leading-snug font-semibold tracking-[0.0978px] text-black disabled:opacity-50"
              >
                {isParsing ? '가져오는 중...' : '다시 가져오기'}
              </button>
            )}
            <button
              type="button"
              onClick={handleAddWish}
              disabled={!canSubmit || addWishMutation.isPending || isParsing}
              className="flex h-13 flex-1 items-center justify-center rounded-xl bg-black text-base leading-snug font-semibold tracking-[0.1048px] text-[#F7F7F8] disabled:opacity-50"
            >
              {addWishMutation.isPending ? '담는 중...' : '위시에 담기'}
            </button>
          </div>
        </>
      )}
    </main>
  );
}

function ParsingState() {
  return (
    <div className="mt-10 flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <div className="size-10 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#1B1C1E]" />
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold text-[#171719]">상품 정보를 가져오고 있어요 👀</p>
        <p className="text-sm leading-snug font-medium text-[#787878]">
          입력한 링크에서 이미지와 가격을 확인 중이에요.
          <br />
          잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
}

type FieldInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: 'text' | 'numeric';
  editableByDefault?: boolean;
  className?: string;
};

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  inputMode = 'text',
  editableByDefault = false,
  className,
}: FieldInputProps) {
  const [isEditing, setIsEditing] = useState(editableByDefault);
  const inputRef = useRef<HTMLInputElement>(null);

  const enterEditMode = () => {
    if (editableByDefault || isEditing) return;
    setIsEditing(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleToggleEdit = () => {
    if (editableByDefault) return;
    if (isEditing) {
      setIsEditing(false);
      return;
    }
    enterEditMode();
  };

  const handleBlur = () => {
    if (editableByDefault) return;
    setIsEditing(false);
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <label className="text-lg leading-5 font-semibold tracking-[-0.1504px] text-[#1A1A1A]">
        {label}
      </label>
      <div className="flex h-14 items-center justify-between gap-3 rounded-[14px] bg-[#F9FAFB] px-5">
        <input
          ref={inputRef}
          type="text"
          inputMode={inputMode}
          value={value}
          placeholder={placeholder}
          readOnly={!isEditing}
          onChange={event => onChange(event.target.value)}
          onClick={enterEditMode}
          onFocus={enterEditMode}
          onBlur={handleBlur}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-base leading-6 font-medium tracking-[-0.3125px] placeholder:text-[#CBCDD1] read-only:cursor-text focus:outline-none',
            isEditing ? 'text-[#1A1A1A]' : 'text-[#787878]'
          )}
        />
        {editableByDefault ? (
          <span className="flex size-6 shrink-0 items-center justify-center text-[#CBCDD1]">
            <EditIcon />
          </span>
        ) : (
          <button
            type="button"
            aria-label={`${label} 수정`}
            onClick={handleToggleEdit}
            className={cn(
              'flex size-6 shrink-0 items-center justify-center transition-colors',
              isEditing ? 'text-[#1A1A1A]' : 'text-[#CBCDD1]'
            )}
          >
            <EditIcon />
          </button>
        )}
      </div>
    </div>
  );
}

type ImageUploadFieldProps = {
  imageUrl: string;
  error: string;
  onChange: (file: File) => void;
  onRemove: () => void;
  className?: string;
};

function ImageUploadField({
  imageUrl,
  error,
  onChange,
  onRemove,
  className,
}: ImageUploadFieldProps) {
  const inputId = 'manual-product-image';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    onChange(file);
  };

  return (
    <div className={cn('relative', className)}>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {imageUrl ? (
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-black/4 bg-[#F9FAFB]">
          {/* dataURL은 Next.js 옵티마이저가 처리하지 않으므로 native img 사용 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="업로드한 상품 이미지" className="size-full object-cover" />
          <button
            type="button"
            onClick={onRemove}
            aria-label="이미지 제거"
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#D4D6DA] bg-[#F9FAFB] text-[#A4A4A4]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-10"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-sm font-medium">상품 이미지 추가하기</span>
        </label>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6 shrink-0"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="size-6"
    >
      <path d="M3.5 21H21.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 13.36V17H9.1585L19.5 6.654L15.8475 3L5.5 13.36Z" strokeLinejoin="round" />
    </svg>
  );
}

export default NewItemPage;

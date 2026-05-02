'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

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
  return (
    <Suspense fallback={<ParsingState />}>
      <NewItemContent />
    </Suspense>
  );
}

function NewItemContent() {
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
  const basePrice = parsedQuery.data?.price != null ? String(parsedQuery.data.price) : '';
  const baseImageUrl = parsedQuery.data?.imageUrl ?? '';

  const name = nameOverride ?? baseName;
  const priceText = priceOverride ?? basePrice;

  const isPartial =
    !isManual &&
    Boolean(parsedQuery.data) &&
    (parsedQuery.data?.name == null || parsedQuery.data?.price == null);
  const hasNoImage = !isManual && Boolean(parsedQuery.data) && !baseImageUrl;

  const handleRetry = () => {
    if (isManual) return;
    setNameOverride(null);
    setPriceOverride(null);
    queryClient.invalidateQueries({ queryKey: parsedProductQueryKey(url) });
  };

  const handleAddWish = async () => {
    if (addWishMutation.isPending) return;
    if (!name.trim() || !priceText.trim()) return;

    const finalImageUrl = isManual ? manualImageUrl : manualImageUrl || baseImageUrl;

    const product: ProductT = isManual
      ? {
          url: '',
          shopName: '직접 입력',
          shopHost: '',
          imageUrl: finalImageUrl,
          name: name.trim(),
          price: parsePriceInput(priceText),
        }
      : {
          url: parsedQuery.data?.url ?? '',
          shopName: parsedQuery.data?.shopName ?? '',
          shopHost: parsedQuery.data?.shopHost ?? '',
          imageUrl: finalImageUrl,
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

          {!isManual &&
            parsedQuery.data &&
            (isPartial ? (
              <PartialNotice className="mt-3" />
            ) : (
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
            ))}

          {isManual || hasNoImage ? (
            <ImageUploadField
              imageUrl={manualImageUrl}
              emptyLabel={hasNoImage ? '이미지가 비어 있어요' : '상품 이미지 추가하기'}
              uploadActionLabel={hasNoImage ? '직접 가져오기' : undefined}
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
            baseImageUrl && (
              <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-2xl border border-black/4 bg-[#F9FAFB]">
                <Image
                  src={baseImageUrl}
                  alt={baseName || '상품 이미지'}
                  fill
                  sizes="(max-width: 480px) calc(100vw - 40px), 440px"
                  priority
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
            value={priceText}
            onChange={value => setPriceOverride(value.replace(/[^0-9]/g, ''))}
            formatDisplay={value => (value ? formatPrice(Number(value)) : '')}
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

const PARSING_PHRASES = [
  '링크 확인 중...',
  '상품 정보를 불러오는 중...',
  '가격을 확인하는 중...',
  '이미지를 가져오는 중...',
] as const;

const PHRASE_INTERVAL_MS = 1000;

function ParsingState() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (phraseIndex >= PARSING_PHRASES.length - 1) return;
    const timer = window.setTimeout(() => {
      setPhraseIndex(prev => prev + 1);
    }, PHRASE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [phraseIndex]);

  return (
    <div className="absolute inset-0 flex flex-col items-center px-5 pt-[calc(env(safe-area-inset-top)+85px)]">
      <div className="flex w-full flex-col items-center gap-2 text-center tracking-[-0.6px]">
        <h1 className="text-[28px] leading-10 font-bold text-[#2D3037]">상품 불러오는 중</h1>
        <div className="relative h-6.5 w-full">
          {PARSING_PHRASES.map((phrase, index) => (
            <p
              key={phrase}
              className={cn(
                'absolute inset-0 text-lg leading-6.5 font-medium text-[#ADB1BB] transition-opacity duration-500',
                index === phraseIndex ? 'opacity-100' : 'opacity-0'
              )}
            >
              {phrase}
            </p>
          ))}
        </div>
      </div>

      <ProductSkeleton className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

type ProductSkeletonProps = {
  className?: string;
};

function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <div className={cn('flex w-80 flex-col gap-7', className)}>
      <SkeletonBox className="aspect-square w-full rounded-[14px]" />
      <div className="flex flex-col gap-2.5">
        <SkeletonBox className="h-5.5 w-full rounded-[14px] opacity-70" />
        <SkeletonBox className="h-5.5 w-[66%] rounded-[14px] opacity-70" />
        <SkeletonBox className="h-5.5 w-[86%] rounded-[14px] opacity-70" />
      </div>
    </div>
  );
}

type SkeletonBoxProps = {
  className?: string;
};

function SkeletonBox({ className }: SkeletonBoxProps) {
  return (
    <div className={cn('relative overflow-hidden bg-[#DCDEE2]/50', className)}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent motion-safe:animate-piki-skeleton-shimmer" />
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
  formatDisplay?: (value: string) => string;
  className?: string;
};

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  inputMode = 'text',
  editableByDefault = false,
  formatDisplay,
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
          value={isEditing || !formatDisplay ? value : formatDisplay(value)}
          placeholder={placeholder}
          readOnly={!isEditing}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
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
  emptyLabel?: string;
  uploadActionLabel?: string;
  className?: string;
};

function ImageUploadField({
  imageUrl,
  error,
  onChange,
  onRemove,
  emptyLabel = '상품 이미지 추가하기',
  uploadActionLabel,
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
          <img src={imageUrl} alt="업로드한 상품 이미지" className="size-full object-contain" />
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
          <span className="text-sm font-medium">{emptyLabel}</span>
          {uploadActionLabel && (
            <span className="text-sm font-medium text-[#787878] underline underline-offset-2">
              {uploadActionLabel}
            </span>
          )}
        </label>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

type PartialNoticeProps = {
  className?: string;
};

function PartialNotice({ className }: PartialNoticeProps) {
  return (
    <div className={cn('flex items-center gap-3 rounded-2xl bg-[#F4F5F7] px-4.5 py-5', className)}>
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white text-2xl">
        🧐
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base leading-5 font-bold text-[#1A1A1A]">
          일부 정보를 가져오지 못했어요
        </p>
        <p className="mt-1 text-xs leading-5 font-medium text-[#787878]">
          상품명과 가격을 직접 입력해주세요
        </p>
      </div>
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

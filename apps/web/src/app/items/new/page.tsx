'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

import EditIcon from '@/assets/icons/edit.svg';
import ImagePlaceholderIcon from '@/assets/icons/image.svg';
import { parsedProductQueryKey, useAddWish, useParsedProduct } from '@/hooks/useWishes';
import { useWishStore } from '@/stores/wishStore';
import type { ProductT } from '@/types/product';
import { cn } from '@/utils/cn';
import { fileToDataUrl } from '@/utils/fileToDataUrl';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!isManual && !url) router.replace('/home');
  }, [isManual, url, router]);

  const baseName = parsedQuery.data?.name ?? '';
  const basePrice = parsedQuery.data?.price != null ? String(parsedQuery.data.price) : '';
  const baseImageUrl = parsedQuery.data?.imagePath ?? '';

  const name = nameOverride ?? baseName;
  const priceText = priceOverride ?? basePrice;

  const isPartial =
    !isManual &&
    Boolean(parsedQuery.data) &&
    (parsedQuery.data?.name == null ||
      parsedQuery.data?.price == null ||
      !parsedQuery.data?.imagePath);
  const isFailedState = isManual || isPartial;
  const showImageEmpty = isFailedState && !manualImageUrl && !baseImageUrl;
  const finalImageUrl = manualImageUrl || baseImageUrl;

  const handleRetry = () => {
    if (isManual) return;
    setNameOverride(null);
    setPriceOverride(null);
    setManualImageUrl('');
    queryClient.invalidateQueries({ queryKey: parsedProductQueryKey(url) });
  };

  const handleAddWish = async () => {
    if (addWishMutation.isPending) return;
    if (!name.trim() || !priceText.trim()) return;

    const product: ProductT = isManual
      ? {
          url: '',
          thumbnail: '',
          imagePath: finalImageUrl,
          name: name.trim(),
          price: parsePriceInput(priceText),
          platform: '',
          platformLogoPath: '',
        }
      : {
          url: parsedQuery.data?.url ?? '',
          thumbnail: parsedQuery.data?.thumbnail ?? '',
          imagePath: finalImageUrl,
          name: name.trim(),
          price: parsePriceInput(priceText),
          tags: parsedQuery.data?.tags,
          platform: parsedQuery.data?.platform ?? '',
          platformLogoPath: parsedQuery.data?.platformLogoPath ?? '',
        };

    await addWishMutation.mutateAsync(product);
    clearPendingUrl();
    router.replace('/home');
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setImageError('');
    try {
      const dataUrl = await fileToDataUrl(file);
      setManualImageUrl(dataUrl);
    } catch {
      setImageError('이미지를 불러올 수 없어요');
    }
  };

  const isParsing = !isManual && (parsedQuery.isPending || parsedQuery.isFetching);
  const showProductView = isManual || Boolean(parsedQuery.data);
  const canSubmit = name.trim().length > 0 && priceText.trim().length > 0;

  if (!showProductView) {
    return (
      <main className="relative h-full overflow-x-hidden">
        <ParsingState />
      </main>
    );
  }

  return (
    <main className="relative flex h-full flex-col overflow-x-hidden">
      <div className="flex-1 overflow-y-auto px-5 pt-[calc(env(safe-area-inset-top)+24px)] pb-[calc(120px+env(safe-area-inset-bottom))]">
        <h1 className="text-[28px] leading-10 font-bold tracking-[-0.6px] text-[#2D3037]">
          위시템 추가
        </h1>

        {isFailedState ? (
          <FailureBanner className="mt-3" />
        ) : (
          parsedQuery.data && (
            <SuccessBanner
              platform={parsedQuery.data.platform}
              platformLogoPath={parsedQuery.data.platformLogoPath}
              originalUrl={parsedQuery.data.url}
              className="mt-3"
            />
          )
        )}

        {showImageEmpty ? (
          <ImagePlaceholderCard onClick={openFilePicker} error={imageError} className="mt-3" />
        ) : (
          <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-xl bg-[#F4F4F6]">
            <ProductImage
              imageUrl={finalImageUrl}
              alt={name || '상품 이미지'}
              isUploaded={Boolean(manualImageUrl)}
            />
            {isFailedState && (
              <button
                type="button"
                onClick={openFilePicker}
                className="absolute right-3 bottom-3 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur"
              >
                이미지 변경
              </button>
            )}
          </div>
        )}

        <FieldInput
          label="상품명"
          value={name}
          onChange={setNameOverride}
          placeholder="상품명을 입력해주세요."
          editableByDefault={isFailedState}
          className="mt-6"
        />
        <FieldInput
          label="가격"
          value={priceText}
          onChange={value => setPriceOverride(value.replace(/[^0-9]/g, ''))}
          formatDisplay={value => (value ? `${Number(value).toLocaleString('ko-KR')}원` : '')}
          formatLive={value => (value ? Number(value).toLocaleString('ko-KR') : '')}
          placeholder="가격을 입력해주세요."
          inputMode="numeric"
          editableByDefault={isFailedState}
          className="mt-5"
        />
      </div>

      <footer className="absolute right-0 bottom-0 left-0 border-t border-[#F4F4F6] bg-white px-2.5 pt-6 pb-[calc(env(safe-area-inset-bottom)+24px)]">
        <div className="mx-auto flex w-full max-w-[362px] gap-3">
          {!isManual && (
            <button
              type="button"
              onClick={handleRetry}
              disabled={isParsing || addWishMutation.isPending}
              className="flex h-13.5 flex-1 items-center justify-center rounded-xl border-[1.2px] border-[#C5C8CE] bg-white px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-[#2D3037] disabled:opacity-50"
            >
              {isParsing ? '가져오는 중...' : '다시 가져오기'}
            </button>
          )}
          <button
            type="button"
            onClick={handleAddWish}
            disabled={!canSubmit || addWishMutation.isPending || isParsing}
            className="flex h-13.5 flex-1 items-center justify-center rounded-xl bg-[#191B1F] px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-[#F7F7F8] disabled:bg-[#C5C8CE]"
          >
            {addWishMutation.isPending ? '담는 중...' : '위시에 담기'}
          </button>
        </div>
      </footer>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
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

type ProductImageProps = {
  imageUrl: string;
  alt: string;
  isUploaded: boolean;
};

function ProductImage({ imageUrl, alt, isUploaded }: ProductImageProps) {
  if (!imageUrl) return null;
  if (isUploaded) {
    // dataURL은 native img로 처리
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageUrl} alt={alt} className="size-full object-cover" />;
  }
  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill
      sizes="(max-width: 480px) calc(100vw - 40px), 440px"
      priority
      className="object-cover"
    />
  );
}

type SuccessBannerProps = {
  platform: string;
  platformLogoPath: string;
  originalUrl: string;
  className?: string;
};

function SuccessBanner({ platform, platformLogoPath, originalUrl, className }: SuccessBannerProps) {
  const host = (() => {
    try {
      return new URL(originalUrl).host;
    } catch {
      return '';
    }
  })();

  return (
    <a
      href={originalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex h-20 items-center gap-4 rounded-xl bg-[#ECF3FE] px-5 transition-colors active:bg-[#DDE7FA]',
        className
      )}
    >
      <ShopIcon platform={platform} platformLogoPath={platformLogoPath} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-base leading-5.5 font-semibold tracking-[-0.6px] text-[#1A1A1A]">
          상품 정보를 가져왔어요
        </p>
        <p className="truncate text-xs leading-[18px] font-semibold tracking-[-0.4px] text-[#686F7E]">
          {host || platform}에서 확인하기
        </p>
      </div>
      <ChevronRightIcon />
    </a>
  );
}

type FailureBannerProps = {
  className?: string;
};

function FailureBanner({ className }: FailureBannerProps) {
  return (
    <div className={cn('flex h-20 items-center gap-4 rounded-xl bg-[#FEFAEC] px-5', className)}>
      <div className="relative flex size-[57px] shrink-0 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FBE8B0] via-[#F8D77D] to-[#F4C74A]" />
        <span className="relative text-[32px] leading-10">🧐</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-base leading-5.5 font-semibold tracking-[-0.6px] text-[#1A1A1A]">
          상품 정보를 가져오지 못했어요
        </p>
        <p className="truncate text-xs leading-[18px] font-semibold tracking-[-0.4px] text-[#686F7E]">
          상품명과 가격을 직접 입력해주세요
        </p>
      </div>
    </div>
  );
}

type ShopIconProps = {
  platform: string;
  platformLogoPath: string;
};

function ShopIcon({ platform, platformLogoPath }: ShopIconProps) {
  return (
    <div className="relative flex size-[57px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {platformLogoPath ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={platformLogoPath} alt={platform} className="size-full object-cover" />
      ) : (
        <span className="text-[10px] font-bold tracking-tight text-[#1A1A1A]">{platform}</span>
      )}
    </div>
  );
}

type ImagePlaceholderCardProps = {
  onClick: () => void;
  error?: string;
  className?: string;
};

function ImagePlaceholderCard({ onClick, error, className }: ImagePlaceholderCardProps) {
  return (
    <div className={className}>
      <button
        type="button"
        onClick={onClick}
        className="relative flex aspect-square w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#F4F4F6]"
      >
        <Image src={ImagePlaceholderIcon} alt="" aria-hidden className="size-9.5 object-contain" />
        <p className="text-lg leading-6.5 font-semibold tracking-[-0.6px] text-[#ADB1BB]">
          이미지가 비어 있어요
        </p>
        <span className="text-sm leading-5 font-medium tracking-[-0.6px] text-[#686F7E] underline underline-offset-2">
          직접 가져오기
        </span>
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
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
  formatLive?: (value: string) => string;
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
  formatLive,
  className,
}: FieldInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const enterEditMode = () => {
    if (isEditing) return;
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
    setIsEditing(false);
  };

  const showEditIcon = !editableByDefault;

  const getDisplayValue = () => {
    if (isEditing) return formatLive ? formatLive(value) : value;
    if (formatDisplay) return formatDisplay(value);
    return value;
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <label className="text-lg leading-6.5 font-semibold tracking-[-0.6px] text-[#262626]">
        {label}
      </label>
      <div className="flex h-13.5 items-center gap-2 rounded-xl border border-[#DCDEE2] bg-white px-4">
        <input
          ref={inputRef}
          type="text"
          inputMode={inputMode}
          value={getDisplayValue()}
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
            'min-w-0 flex-1 bg-transparent text-base leading-5.5 font-medium tracking-[-0.6px] placeholder:text-[#ADB1BB] read-only:cursor-text focus:outline-none',
            value ? 'text-[#686F7E]' : 'text-[#ADB1BB]'
          )}
        />
        {showEditIcon && (
          <button
            type="button"
            aria-label={`${label} 수정`}
            onClick={handleToggleEdit}
            className="flex size-5 shrink-0 items-center justify-center"
          >
            <Image src={EditIcon} alt="" aria-hidden className="size-4 object-contain" />
          </button>
        )}
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
      stroke="#686F7E"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6 shrink-0"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default NewItemPage;

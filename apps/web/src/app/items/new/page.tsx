'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

import EditIcon from '@/assets/icons/edit.svg';
import ImagePlaceholderIcon from '@/assets/icons/image.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAddWish } from '@/hooks/useWishes';
import { dummyProducts } from '@/mocks/products';
import type { ProductT } from '@/types/product';
import { cn } from '@/utils/cn';
import { fileToDataUrl } from '@/utils/fileToDataUrl';

const parsePriceInput = (raw: string) => {
  const digits = raw.replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 0;
};

const PARSE_DELAY_MS = 4000;

function NewItemPage() {
  return (
    <Suspense fallback={<ParsingState />}>
      <NewItemContent />
    </Suspense>
  );
}

function NewItemContent() {
  useThemeColor('#FFFFFF');
  const router = useRouter();
  const searchParams = useSearchParams();

  const isManual = searchParams.get('manual') === '1';
  const lastDummyProduct = dummyProducts[dummyProducts.length - 1]!;
  const addWishMutation = useAddWish();

  const [nameOverride, setNameOverride] = useState<string | null>(null);
  const [priceOverride, setPriceOverride] = useState<string | null>(null);
  const [manualImageUrl, setManualImageUrl] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const [isParsing, setIsParsing] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsParsing(false);
    }, PARSE_DELAY_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const baseName = lastDummyProduct.name;
  const basePrice = String(lastDummyProduct.price);
  const baseImageUrl = lastDummyProduct.imagePath;

  const name = nameOverride ?? (isManual ? '' : baseName);
  const priceText = priceOverride ?? (isManual ? '' : basePrice);

  const isFailedState = isManual;
  const showImageEmpty = isFailedState && !manualImageUrl && !baseImageUrl;
  const finalImageUrl = manualImageUrl || (isFailedState ? '' : baseImageUrl);

  const handleRetry = () => {
    setNameOverride(null);
    setPriceOverride(null);
    setManualImageUrl('');
    setIsParsing(true);

    window.setTimeout(() => {
      setIsParsing(false);
    }, PARSE_DELAY_MS);
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
          url: lastDummyProduct.url,
          thumbnail: lastDummyProduct.thumbnail,
          imagePath: finalImageUrl,
          name: name.trim(),
          price: parsePriceInput(priceText),
          tags: lastDummyProduct.tags,
          platform: lastDummyProduct.platform,
          platformLogoPath: lastDummyProduct.platformLogoPath,
        };

    await addWishMutation.mutateAsync(product);
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

  const showProductView = !isParsing;
  const canSubmit = name.trim().length > 0 && priceText.trim().length > 0;

  if (!showProductView) {
    return (
      <main className="relative h-full overflow-x-hidden">
        <ParsingState />
      </main>
    );
  }

  const title = isFailedState ? '상품 정보를 가져오지 못했어요' : '상품 정보를 가져왔어요';
  const subtitle = isFailedState
    ? '상품명과 가격을 직접 입력해주세요'
    : '상품명과 가격은 직접 수정할 수 있어요';

  return (
    <main className="relative flex h-full flex-col overflow-x-hidden">
      <div className="scrollbar-hide flex-1 overflow-y-auto px-4.75 pt-[calc(env(safe-area-inset-top)+24px)] pb-[calc(120px+env(safe-area-inset-bottom))]">
        <header className="flex flex-col items-center gap-2 text-center tracking-[-0.6px]">
          <h1 className="text-2xl leading-8 font-bold text-[#171719]">{title}</h1>
          <p className="text-lg leading-6.5 font-medium text-[#ADB1BB]">{subtitle}</p>
        </header>

        <div className="mt-6 flex justify-center">
          {showImageEmpty ? (
            <ImagePlaceholderCard onClick={openFilePicker} error={imageError} />
          ) : (
            <div className="relative size-50 overflow-hidden rounded-[11.268px] bg-[#F4F4F6]">
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
        </div>

        <div className="mt-6 flex flex-col gap-5">
          <FieldInput
            label="상품명"
            value={name}
            onChange={setNameOverride}
            placeholder="상품명을 입력해주세요."
          />
          <FieldInput
            label="가격"
            value={priceText}
            onChange={value => setPriceOverride(value.replace(/[^0-9]/g, ''))}
            formatDisplay={value => (value ? `${Number(value).toLocaleString('ko-KR')}원` : '')}
            formatLive={value => (value ? Number(value).toLocaleString('ko-KR') : '')}
            placeholder="가격을 입력해주세요."
            inputMode="numeric"
          />
        </div>

        {!isFailedState && (
          <SourceLinkCard
            platform={lastDummyProduct.platform}
            platformLogoPath={lastDummyProduct.platformLogoPath}
            originalUrl={lastDummyProduct.url}
            className="mt-5"
          />
        )}
      </div>

      <footer className="absolute right-0 bottom-0 left-0 border-t border-[#F4F4F6] bg-white px-5 py-3">
        <div className="flex w-full gap-3">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isParsing || addWishMutation.isPending}
            className="flex h-13.5 flex-1 cursor-pointer items-center justify-center rounded-xl border-[1.2px] border-[#C5C8CE] bg-white px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-[#2D3037] disabled:opacity-50"
          >
            {isParsing ? '가져오는 중...' : '다시 가져오기'}
          </button>
          <button
            type="button"
            onClick={handleAddWish}
            disabled={!canSubmit || addWishMutation.isPending || isParsing}
            className="flex h-13.5 flex-1 cursor-pointer items-center justify-center rounded-xl bg-[#191B1F] px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-[#F7F7F8] disabled:bg-[#C5C8CE]"
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
    <div className="absolute inset-0 flex flex-col items-center px-5 pt-[calc(env(safe-area-inset-top)+24px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
      <div className="flex w-full flex-col items-center gap-2 text-center tracking-[-0.6px]">
        <h1 className="text-[24px] leading-8 font-bold tracking-[-0.6px] text-[#171719]">
          상품 불러오는 중
        </h1>
        <div className="relative h-6.5 w-full">
          {PARSING_PHRASES.map((phrase, index) => (
            <p
              key={phrase}
              className={cn(
                'absolute inset-0 text-lg leading-6.5 font-medium tracking-[-0.6px] text-[#ADB1BB] transition-opacity duration-500',
                index === phraseIndex ? 'opacity-100' : 'opacity-0'
              )}
            >
              {phrase}
            </p>
          ))}
        </div>
      </div>

      <section className="mt-7 flex w-full flex-1 items-center justify-center">
        <ProductSkeleton />
      </section>
    </div>
  );
}

type ProductSkeletonProps = {
  className?: string;
};

function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <div className={cn('flex w-full max-w-[280px] flex-col gap-7', className)}>
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
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/60 to-transparent motion-safe:animate-piki-skeleton-shimmer" />
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
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageUrl} alt={alt} className="size-full object-cover" />;
  }
  return <Image src={imageUrl} alt={alt} fill sizes="200px" priority className="object-cover" />;
}

type SourceLinkCardProps = {
  platform: string;
  platformLogoPath: string;
  originalUrl: string;
  className?: string;
};

function SourceLinkCard({
  platform,
  platformLogoPath,
  originalUrl,
  className,
}: SourceLinkCardProps) {
  const regex = /^https?:\/\/(?:www\.)?([^/?#]+)/i;
  const match = originalUrl.match(regex);
  const domain = match?.[1] ?? '';

  return (
    <a
      href={originalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center justify-center gap-4 rounded-xl bg-[#F4F4F6] px-4 py-3 transition-colors active:bg-[#ECECEE]',
        className
      )}
    >
      <ShopIcon platform={platform} platformLogoPath={platformLogoPath} />
      <p className="line-clamp-1 flex-1 truncate text-sm leading-5 font-semibold tracking-[-0.6px] text-[#686F7E]">
        {domain}에서 확인하기
      </p>
      <ChevronRightIcon />
    </a>
  );
}

type ShopIconProps = {
  platform: string;
  platformLogoPath: string;
};

function ShopIcon({ platform, platformLogoPath }: ShopIconProps) {
  return (
    <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
      {platformLogoPath ? (
        <Image
          src={platformLogoPath}
          width={48}
          height={48}
          alt={platform}
          className="size-full object-cover"
        />
      ) : (
        <span className="text-[10px] font-bold tracking-tight text-[#1A1A1A]">{platform}</span>
      )}
    </div>
  );
}

type ImagePlaceholderCardProps = {
  onClick: () => void;
  error?: string;
};

function ImagePlaceholderCard({ onClick, error }: ImagePlaceholderCardProps) {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onClick}
        className="relative flex size-50 flex-col items-center justify-center gap-2 overflow-hidden rounded-[11.268px] bg-[#F4F4F6]"
      >
        <Image src={ImagePlaceholderIcon} alt="" aria-hidden className="size-9 object-contain" />
        <p className="text-sm leading-5 font-medium tracking-[-0.6px] text-[#ADB1BB]">
          이미지가 비어 있어요
        </p>
        <span className="text-sm leading-5 font-semibold tracking-[-0.6px] text-[#2D3037] underline underline-offset-2">
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
  formatDisplay,
  formatLive,
  className,
}: FieldInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => requestAnimationFrame(() => inputRef.current?.focus());

  const getDisplayValue = () => {
    if (isFocused) return formatLive ? formatLive(value) : value;
    if (formatDisplay) return formatDisplay(value);
    return value;
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={`field-${label}`}
        className="text-sm leading-5.5 font-semibold tracking-[-0.6px] text-[#262626]"
      >
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-[#DCDEE2] bg-white p-4">
        <input
          id={`field-${label}`}
          ref={inputRef}
          type="text"
          inputMode={inputMode}
          value={getDisplayValue()}
          placeholder={placeholder}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          onChange={event => onChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="min-w-0 flex-1 bg-transparent text-base leading-5.5 font-medium tracking-[-0.6px] text-[#686F7E] placeholder:text-[#ADB1BB] focus:outline-none"
        />
        <button
          type="button"
          aria-label={`${label} 입력란 포커스`}
          onClick={event => {
            event.preventDefault();
            focusInput();
          }}
          className="flex size-5 shrink-0 items-center justify-center"
        >
          <Image src={EditIcon} alt="" aria-hidden className="size-4 object-contain" />
        </button>
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

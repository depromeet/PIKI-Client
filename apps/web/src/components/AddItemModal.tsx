'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import LinkIcon from '@/assets/icons/link.svg';
import { cn } from '@/utils/cn';

type AddItemModalProps = {
  open: boolean;
  onClose: () => void;
};

function AddItemModal({ open, onClose }: AddItemModalProps) {
  const router = useRouter();

  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);

  const isValidUrl = useMemo(() => url.startsWith('https://') && !/\s/.test(url), [url]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUrl('');
      setIsFocused(false);
      setIsError(false);
    }, 0);
    return () => {
      window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    router.prefetch('/items/new');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose, router]);

  const handleClose = () => {
    setUrl('');
    setIsError(false);
    onClose();
  };

  const handleStop = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmit = () => {
    if (!isValidUrl) {
      setIsError(true);
      return;
    }
    setIsError(false);
    router.push('/items/new');
    setUrl('');
    onClose();
  };

  let inputBorderClass = 'border-[#E5E7EB]';
  if (isFocused) inputBorderClass = 'border-[#1F7AF9]';
  if (isError) inputBorderClass = 'border-[#E91008]';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-item-modal-title"
      className={cn(
        'fixed inset-0 z-50 mx-auto flex max-w-120 items-center justify-center px-5',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={handleClose}
        className={cn(
          'absolute inset-0 bg-black/40 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div
        onClick={handleStop}
        className={cn(
          'relative flex w-90 flex-col items-center gap-5 rounded-3xl bg-white p-5 transition-[opacity,transform] duration-200 ease-out',
          open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-[0.98] opacity-0'
        )}
      >
        <h2
          id="add-item-modal-title"
          className="text-xl leading-7 font-bold tracking-[-0.6px] text-[#2D3037]"
        >
          위시템 추가
        </h2>

        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="add-item-url-input"
              className="mb-3 text-lg leading-6.5 font-semibold tracking-[-0.6px] text-[#262626]"
            >
              상품 URL
            </label>
            <div
              className={cn(
                'flex h-13.5 items-center gap-2 overflow-hidden rounded-xl border-[1.4px] bg-white px-4 transition-colors',
                inputBorderClass
              )}
            >
              <Image src={LinkIcon} alt="" aria-hidden className="size-5 shrink-0 object-contain" />
              <input
                id="add-item-url-input"
                type="url"
                inputMode="url"
                value={url}
                onChange={event => {
                  setUrl(event.target.value);
                  if (isError) setIsError(false);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="min-w-0 flex-1 bg-transparent text-base leading-5.5 font-medium tracking-[-0.6px] text-[#2D3037] placeholder:text-[#ADB1BB] focus:outline-none"
              />
            </div>
            <div className="mt-1.5 h-5 text-[14px] leading-5 font-normal tracking-[-0.6px] text-[#e91008]">
              {isError ? 'https://로 시작하는 상품 링크를 입력해 주세요' : ''}
            </div>
          </div>

          <button
            type="button"
            disabled={!url}
            onClick={handleSubmit}
            className="flex h-13.5 w-full cursor-pointer items-center justify-center rounded-xl bg-[#191B1F] px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-white disabled:bg-[#C5C8CE]"
          >
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;

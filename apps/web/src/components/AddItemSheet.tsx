'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/utils/cn';

type AddItemSheetProps = {
  open: boolean;
  onClose: () => void;
};

function AddItemSheet({ open, onClose }: AddItemSheetProps) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const isValid = url.startsWith('https://') && !/\s/.test(url);

  const handleBackdropClick = () => {
    setUrl('');
    onClose();
  };

  const handleSheetClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-item-sheet-title"
      className={cn(
        'fixed inset-0 z-50 mx-auto max-w-120',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={handleBackdropClick}
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div
        onClick={handleSheetClick}
        className={cn(
          'absolute right-0 bottom-0 left-0 rounded-t-[30px] bg-white px-6 pt-5 pb-10 shadow-[0_-4px_36px_0_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <h2
          id="add-item-sheet-title"
          className="text-center text-xl leading-[1.375] font-bold tracking-[-0.506px] text-[#171719]"
        >
          위시템 추가
        </h2>

        <div className="mt-9 flex flex-col gap-3">
          <label className="block">
            <span className="text-lg leading-5 font-semibold tracking-[-0.1504px] text-[#1A1A1A]">
              상품 URL
            </span>
            <div className="mt-3 flex h-14 items-center gap-3 rounded-[14px] bg-[#F9FAFB] px-5">
              <span className="flex size-[19px] shrink-0 items-center justify-center text-[#3478F6]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-[19px]"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </span>
              <input
                type="url"
                inputMode="url"
                placeholder="복사한 링크를 넣어주세요"
                value={url}
                onChange={event => setUrl(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base leading-6 font-medium tracking-[-0.3125px] text-[#1A1A1A] placeholder:text-[#BBBBBB] focus:outline-none"
              />
            </div>
          </label>

          <button
            type="button"
            disabled={!isValid}
            className={cn(
              'flex h-[52px] w-full items-center justify-center rounded-xl text-base leading-[1.5] font-semibold tracking-[0.1048px] text-white transition-colors',
              isValid ? 'bg-[#171719]' : 'bg-black/10'
            )}
          >
            상품 정보 불러오기
          </button>
        </div>

        <button
          type="button"
          className="mt-6 block w-full text-center text-[15px] leading-7 text-[#989BA2] underline"
        >
          직접 입력할게요
        </button>
      </div>
    </div>
  );
}

export default AddItemSheet;

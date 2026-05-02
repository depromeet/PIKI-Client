'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import LinkIcon from '@/assets/icons/link.svg';
import { useWishStore } from '@/stores/wishStore';
import { cn } from '@/utils/cn';

type AddItemModalProps = {
  open: boolean;
  onClose: () => void;
};

function AddItemModal({ open, onClose }: AddItemModalProps) {
  const router = useRouter();
  const setPendingUrl = useWishStore(state => state.setPendingUrl);
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const handleClose = () => {
    setUrl('');
    onClose();
  };

  const handleStop = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const isValidUrl = url.startsWith('https://') && !/\s/.test(url);

  const handleSubmit = () => {
    if (!isValidUrl) return;
    setPendingUrl(url);
    router.push('/items/new');
    setUrl('');
    onClose();
  };

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
          <div className="flex flex-col gap-3">
            <label
              htmlFor="add-item-url-input"
              className="text-lg leading-6.5 font-semibold tracking-[-0.6px] text-[#262626]"
            >
              상품 URL
            </label>
            <div
              className={cn(
                'flex h-13.5 items-center gap-2 overflow-hidden rounded-xl border-[1.4px] bg-white px-4 transition-colors',
                isFocused ? 'border-[#1F7AF9]' : 'border-[#E5E7EB]'
              )}
            >
              <Image src={LinkIcon} alt="" aria-hidden className="size-5 shrink-0 object-contain" />
              <input
                id="add-item-url-input"
                type="url"
                inputMode="url"
                placeholder="https://"
                value={url}
                onChange={event => setUrl(event.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="min-w-0 flex-1 bg-transparent text-base leading-5.5 font-medium tracking-[-0.6px] text-[#2D3037] placeholder:text-[#ADB1BB] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            disabled={!isValidUrl}
            onClick={handleSubmit}
            className="flex h-13.5 w-full items-center justify-center rounded-xl bg-[#191B1F] px-5 text-base leading-5.5 font-semibold tracking-[-0.6px] text-white disabled:bg-[#C5C8CE]"
          >
            장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;

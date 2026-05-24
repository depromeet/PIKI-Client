'use client';

import { useRef } from 'react';

import { ImageIconOutline } from '@/assets/icons';
import Button from '@/components/common/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/common/dialog';

const MAX_IMAGE_COUNT = 5;

type AddByImageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (files: File[]) => void;
};

function AddByImageDialog({ open, onOpenChange, onSubmit }: AddByImageDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenPicker = () => {
    inputRef.current?.click();
  };

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, MAX_IMAGE_COUNT);
    event.target.value = '';
    if (files.length === 0) return;
    onSubmit?.(files);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex w-[360px] max-w-[calc(100%-40px)] flex-col gap-3 rounded-3xl"
      >
        <DialogTitle className="heading-1 text-center text-text-neutral-primary">
          이미지로 담기
        </DialogTitle>
        <button
          type="button"
          onClick={handleOpenPicker}
          className="flex h-[120px] w-full flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-border-neutral-muted bg-bg-layer-default transition-colors active:bg-gray-50"
        >
          <ImageIconOutline className="size-6 text-icon-neutral-secondary" />
          <p className="body-2-semibold text-text-neutral-secondary">
            최대 {MAX_IMAGE_COUNT}장까지 가져올 수 있어요.
          </p>
        </button>
        <Button size="lg" variant="primary" onClick={handleOpenPicker}>
          사진 선택하기
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFilesChange}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddByImageDialog;

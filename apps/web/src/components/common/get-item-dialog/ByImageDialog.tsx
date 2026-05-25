'use client';

import { ImageIconFill } from '@/assets/icons';
import Button from '@/components/common/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/common/dialog';
import { useImagePicker } from '@/hooks/useImagePicker';
import { usePostWishOCR } from '@/hooks/usePostWishOCR';
import type { ItemTypeT } from '@/types/item';

import Spacing from '../spacing';

const MAX_IMAGE_COUNT = 5;

type Props = {
  type: ItemTypeT;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function ByImageDialog({ type, open, onOpenChange }: Props) {
  const { mutate: postWishOCR } = usePostWishOCR();

  const { openPicker, inputRef, handleInputChange, isPending } = useImagePicker({
    maxCount: MAX_IMAGE_COUNT,
    onSuccess: async _files => {
      if (type === 'wish') {
        _files.forEach(file => {
          const formData = new FormData();
          formData.append('image', file);
          postWishOCR(formData);
        });
      }
      // TODO: API 연동

      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="flex flex-col gap-4 rounded-3xl">
        <DialogTitle className="text-center heading-1 text-text-neutral-primary">
          이미지로 담기
        </DialogTitle>

        <DialogDescription className="sr-only">
          상품 스크린샷 이미지를 선택해 담습니다. (최대 {MAX_IMAGE_COUNT}장까지 가져올 수 있어요.)
        </DialogDescription>

        <div className="flex w-full flex-col items-center rounded-xl border border-dashed border-border-neutral-muted bg-bg-layer-basement py-8">
          <ImageIconFill className="size-6 text-icon-neutral-secondary" />

          <Spacing size={10} />

          <div className="body-1-bold text-text-neutral-secondary">상품명•가격이 보이는 사진</div>

          <Spacing size={4} />

          <p className="body-2-medium text-text-neutral-secondary">
            최대 {MAX_IMAGE_COUNT}장까지 가져올 수 있어요.
          </p>
        </div>

        <Button size="lg" variant="primary" onClick={openPicker} disabled={isPending}>
          사진 선택하기
        </Button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleInputChange}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ByImageDialog;

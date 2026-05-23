'use client';

import { useState } from 'react';

import { LinkIconFill } from '@/assets/icons';
import Button from '@/components/common/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/common/dialog';
import Input from '@/components/common/Input/Input';

const URL_PATTERN = /^https?:\/\/.+/i;

type AddByLinkDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (url: string) => void;
};

function AddByLinkDialog({ open, onOpenChange, onSubmit }: AddByLinkDialogProps) {
  const [url, setUrl] = useState('');
  const [hasError, setHasError] = useState(false);

  const trimmedUrl = url.trim();
  const isEmpty = trimmedUrl.length === 0;

  const resetState = () => {
    setUrl('');
    setHasError(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) resetState();
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    if (isEmpty) return;

    if (!URL_PATTERN.test(trimmedUrl)) {
      setHasError(true);
      return;
    }

    onSubmit?.(trimmedUrl);
    onOpenChange(false);
    resetState();
  };

  const handleChange = (value: string) => {
    setUrl(value);
    if (hasError) setHasError(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex w-[360px] max-w-[calc(100%-40px)] flex-col gap-5 rounded-3xl"
      >
        <DialogTitle className="heading-1 text-center text-text-neutral-primary">
          링크로 담기
        </DialogTitle>
        <div className="flex flex-col gap-4">
          <Input
            label="링크 URL"
            placeholder="복사한 링크를 입력해주세요."
            value={url}
            onChange={e => handleChange(e.target.value)}
            left={<LinkIconFill className="size-5" />}
            aria-invalid={hasError}
            helperText={hasError ? '올바른 URL 형식으로 입력해주세요.' : undefined}
            autoFocus
            inputMode="url"
          />
          <Button
            size="lg"
            variant="primary"
            disabled={isEmpty}
            onClick={handleSubmit}
          >
            후보 바구니에 담기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddByLinkDialog;

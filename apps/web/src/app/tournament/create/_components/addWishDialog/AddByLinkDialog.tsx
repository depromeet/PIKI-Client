'use client';

import { useState } from 'react';

import { LinkIconFill } from '@/assets/icons';
import Button from '@/components/common/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/common/dialog';
import Input from '@/components/common/input';

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

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setUrl('');
      setHasError(false);
    }
    onOpenChange(open);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (hasError) setHasError(false);
  };

  const handleSubmit = () => {
    if (!URL_PATTERN.test(trimmedUrl)) {
      setHasError(true);
      return;
    }
    onSubmit?.(trimmedUrl);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex w-[360px] max-w-[calc(100%-40px)] flex-col gap-5 rounded-3xl"
      >
        <DialogTitle className="text-center heading-1 text-text-neutral-primary">
          링크로 담기
        </DialogTitle>
        <div className="flex flex-col gap-4">
          <Input
            label="링크 URL"
            placeholder="복사한 링크를 입력해주세요."
            value={url}
            onChange={handleUrlChange}
            left={<LinkIconFill className="size-5" />}
            aria-invalid={hasError}
            helperText={hasError ? '올바른 URL 형식으로 입력해주세요.' : undefined}
            autoFocus
            inputMode="url"
          />
          <Button size="lg" variant="primary" disabled={isEmpty} onClick={handleSubmit}>
            후보 바구니에 담기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddByLinkDialog;

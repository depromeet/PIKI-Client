'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/common/dialog';

type ConfirmStartDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function ConfirmStartDialog({ open, onOpenChange, onConfirm }: ConfirmStartDialogProps) {
  const handleCancel = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="flex flex-col items-center gap-5 p-6">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-text-neutral-secondary">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="7.5" cy="9" r="1" fill="currentColor" />
            <circle cx="12.5" cy="9" r="1" fill="currentColor" />
            <path
              d="M6.5 13.5C7.5 12.5 8.6 12 10 12C11.4 12 12.5 12.5 13.5 13.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-1">
          <DialogTitle className="text-center heading-1 text-text-neutral-primary">
            토너먼트를 정말 바로 시작할까요?
          </DialogTitle>
          <DialogDescription className="text-center body-2-medium text-text-neutral-tertiary">
            바로 시작하면 담지 못한 친구가
            <br />
            있을 수 있어요.
          </DialogDescription>
        </div>

        <div className="flex w-full gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="flex h-13 flex-1 cursor-pointer items-center justify-center rounded-xl border border-border-neutral-muted bg-bg-layer-default body-1-semibold text-text-neutral-primary"
          >
            돌아가기
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-13 flex-1 cursor-pointer items-center justify-center rounded-xl bg-bg-neutral-primary body-1-semibold text-text-neutral-inverse"
          >
            바로 시작할래요
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmStartDialog;

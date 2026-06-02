'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/common/dialog';

type ConfirmExitDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function ConfirmExitDialog({ open, onOpenChange, onConfirm }: ConfirmExitDialogProps) {
  const handleCancel = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="flex flex-col items-center gap-5 p-6">
        <div className="flex size-10 items-center justify-center text-text-neutral-secondary">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.172 4.943a4 4 0 0 1 5.656 0L24.485 10.6h3.243a1.333 1.333 0 0 1 1.318 1.519l-1.958 13.71A4 4 0 0 1 23.13 29.3H8.87a4 4 0 0 1-3.96-3.469L2.954 12.118a1.333 1.333 0 0 1 1.318-1.519h3.243l5.657-5.656Zm3.77 1.886a1.333 1.333 0 0 0-1.884 0L11.81 10.6h8.38l-3.247-3.771Zm-5.275 9.838c0-.736.597-1.333 1.333-1.333.737 0 1.334.597 1.334 1.333v5.333a1.333 1.333 0 1 1-2.667 0v-5.333Zm5.334-1.333a1.333 1.333 0 0 0-1.333 1.333v5.333a1.333 1.333 0 1 0 2.666 0v-5.333a1.333 1.333 0 0 0-1.333-1.333Zm4 1.333c0-.736.597-1.333 1.333-1.333s1.333.597 1.333 1.333v5.333a1.333 1.333 0 1 1-2.666 0v-5.333Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-1">
          <DialogTitle className="text-center heading-1 text-text-neutral-primary">
            담기를 잠깐 멈출까요?
          </DialogTitle>
          <DialogDescription className="text-center body-2-medium text-text-neutral-tertiary">
            지금까지 담은 후보는
            <br />
            자동으로 저장돼 있어요.
          </DialogDescription>
        </div>

        <div className="flex w-full gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="flex h-13 flex-1 cursor-pointer items-center justify-center rounded-xl border border-border-neutral-muted bg-bg-layer-default body-1-semibold text-text-neutral-primary"
          >
            계속 담기
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-13 flex-1 cursor-pointer items-center justify-center rounded-xl bg-bg-neutral-primary body-1-semibold text-text-neutral-inverse"
          >
            나가기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmExitDialog;

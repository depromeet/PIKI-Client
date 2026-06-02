'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/common/dialog';

import ConfirmExitBasket from '../../_assets/confirm-exit-basket.svg';

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
        <ConfirmExitBasket
          className="text-text-neutral-secondary"
          width={30}
          height={29}
          aria-hidden
        />

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

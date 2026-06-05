'use client';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/dialog';

import ConfirmStartFace from '../../_assets/confirm-start-face.svg';

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
        <ConfirmStartFace className="size-7.75" aria-hidden />

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

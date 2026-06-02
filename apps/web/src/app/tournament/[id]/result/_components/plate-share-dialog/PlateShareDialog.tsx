'use client';

import { toast } from 'sonner';

import { CheckIconFill, StopwatchIconFill } from '@/assets/icons/fill';
import Button from '@/components/common/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/common/drawer';
import { share } from '@/utils/share';

type PlateShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plateUrl?: string;
  expiresLabel?: string;
};

function PlateShareDialog({
  open,
  onOpenChange,
  plateUrl,
  expiresLabel = '2026.05.24까지',
}: PlateShareDialogProps) {
  const handleSendPlayLink = async () => {
    if (!plateUrl) return;

    const result = await share({
      title: 'piki 토너먼트 플레이',
      text: '나만의 piki 토너먼트를 친구가 플레이할 수 있어요!',
      url: plateUrl,
    });

    if (result === 'shared' || result === 'copied') {
      toast.success('링크를 성공적으로 공유했어요.');
    }
    if (result === 'failed') toast.warning('공유에 실패했어요. 다시 시도해주세요.');
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <DrawerTitle className="heading-1 text-text-neutral-primary">
              토너먼트 플레이 공유
            </DrawerTitle>
            <DrawerDescription className="body-1-medium text-text-neutral-tertiary">
              링크를 보내 친구가 플레이 할 수 있어요.
            </DrawerDescription>
          </div>

          <div className="flex w-full items-center justify-between rounded-xl border border-border-neutral-muted bg-bg-layer-default px-4 py-5">
            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-3xl bg-blue-50">
                <StopwatchIconFill className="size-6 text-text-accent" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="body-2-semibold text-text-accent">7일 후 마감</p>
                <p className="heading-1 text-text-neutral-primary">{expiresLabel}</p>
              </div>
            </div>
            <button
              type="button"
              className="cursor-pointer body-2-medium text-text-neutral-tertiary underline"
            >
              변경
            </button>
          </div>

          <div className="flex w-full flex-col gap-2 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center gap-2">
              <CheckIconFill className="size-4.5 text-text-neutral-secondary" />
              <p className="body-2-medium text-text-neutral-secondary">
                기한 안에 언제든 플레이할 수 있어요.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CheckIconFill className="size-4.5 text-text-neutral-secondary" />
              <p className="body-2-medium text-text-neutral-secondary">
                설정한 기한이 지나면 플레이 할 수 없어요.
              </p>
            </div>
          </div>

          <Button size="lg" variant="primary" className="w-full" onClick={handleSendPlayLink}>
            플레이 링크 보내기
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PlateShareDialog;

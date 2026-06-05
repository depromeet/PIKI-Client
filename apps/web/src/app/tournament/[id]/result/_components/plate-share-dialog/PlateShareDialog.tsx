'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { CheckIconFill, StopwatchIconFill } from '@/assets/icons/fill';
import Button from '@/components/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@/components/drawer';
import Spinner from '@/components/spinner';
import { share } from '@/utils/share';

import { usePostPlayLink } from '../../_hooks/usePostPlayLink';

type PlateShareDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tournamentId: number;
};

const PLAY_LINK_DURATION_DAYS = 14;

const formatExpiresLabel = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}까지`;
};

const buildPlayLinkUrl = (tournamentId: number) => {
  if (typeof window === 'undefined') return `/play/${tournamentId}`;
  return `${window.location.origin}/play/${tournamentId}`;
};

function PlateShareDialog({ open, onOpenChange, tournamentId }: PlateShareDialogProps) {
  const [expiresLabel] = useState(() => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + PLAY_LINK_DURATION_DAYS);
    return formatExpiresLabel(expiresAt);
  });
  const { postPlayLinkMutation, isPostPlayLinkPending } = usePostPlayLink(tournamentId);

  const handleSendPlayLink = async () => {
    try {
      await postPlayLinkMutation();
    } catch {
      toast.warning('공유 링크를 생성하지 못했어요. 다시 시도해주세요.');
      return;
    }

    const result = await share({
      title: 'piki 토너먼트 플레이',
      text: '나만의 piki 토너먼트를 친구가 플레이할 수 있어요!',
      url: buildPlayLinkUrl(tournamentId),
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
                <p className="body-2-semibold text-text-accent">14일 후 마감</p>
                <p className="heading-1 text-text-neutral-primary">{expiresLabel}</p>
              </div>
            </div>
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

          <Button
            size="lg"
            variant="primary"
            className="w-full"
            disabled={isPostPlayLinkPending}
            onClick={handleSendPlayLink}
          >
            {isPostPlayLinkPending ? <Spinner size={20} /> : '플레이 링크 보내기'}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PlateShareDialog;

'use client';

import { useState } from 'react';

import { HeartIconFill, ImageIconFill, LinkIconFill } from '@/assets/icons';
import { DialogContent, DialogDescription, DialogTitle } from '@/components/common/dialog';
import type { ItemTypeT } from '@/types/item';

import ByImageDialog from './ByImageDialog';
import ByLinkDialog from './ByLinkDialog';
import OptionButton from './OptionButton';

type GetItemDialogContentProps = {
  type: ItemTypeT;
  onLinkSubmit: (url: string) => void;
};

function GetItemDialogContent({ type, onLinkSubmit }: GetItemDialogContentProps) {
  const [isSubDialogOpen, setIsSubDialogOpen] = useState<'link' | 'image' | null>(null);

  return (
    <>
      <DialogContent showCloseButton={false} className="flex flex-col gap-[15px]">
        <DialogTitle className="text-center heading-1 text-text-neutral-primary">
          위시템 담기
        </DialogTitle>
        <DialogDescription className="sr-only">
          위시, 링크, 이미지 중 하나를 선택해 상품을 담습니다.
        </DialogDescription>

        <ul className="flex w-full flex-col gap-2">
          {type === 'tournament' && (
            <OptionButton
              href="/tournament/create/by-wish"
              label="위시에서 가져오기"
              description="내 위시리스트에서 상품을 가져와요"
              Icon={HeartIconFill}
            />
          )}
          <OptionButton
            label="링크로 담기"
            description="상품URL을 붙여넣어요"
            Icon={LinkIconFill}
            onClick={() => setIsSubDialogOpen('link')}
          />
          <OptionButton
            label="이미지로 담기"
            description="스크린샷을 첨부해요"
            Icon={ImageIconFill}
            onClick={() => setIsSubDialogOpen('image')}
          />
        </ul>
      </DialogContent>

      <ByLinkDialog
        type={type}
        open={isSubDialogOpen === 'link'}
        onOpenChange={open => setIsSubDialogOpen(open ? 'link' : null)}
        onSubmit={onLinkSubmit}
      />
      <ByImageDialog
        type={type}
        open={isSubDialogOpen === 'image'}
        onOpenChange={open => setIsSubDialogOpen(open ? 'image' : null)}
      />
    </>
  );
}

export default GetItemDialogContent;

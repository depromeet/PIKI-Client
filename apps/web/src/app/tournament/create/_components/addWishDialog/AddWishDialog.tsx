'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { HeartIconFill, ImageIconFill, LinkIconFill } from '@/assets/icons';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/common/dialog';

import AddByImageDialog from './AddByImageDialog';
import AddByLinkDialog from './AddByLinkDialog';
import WishOptionButton from './WishOptionButton';

type OpenDialogT = 'wish' | 'link' | 'image' | null;

type AddWishDialogProps = {
  trigger: ReactNode;
};

function AddWishDialog({ trigger }: AddWishDialogProps) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<OpenDialogT>(null);

  const handleWishlist = () => {
    setOpenDialog(null);
    router.push('/tournament/create/by-wish');
  };

  const handleLinkSubmit = (url: string) => {
    // TODO: 입력된 urt로 상품 정보 가져오기 (API 연동 전 mock)
    // 임시 itemId 'new'로 상품 확인 페이지 이동, type=tournament로 분기
    router.push(`/item/new/edit?type=tournament&url=${encodeURIComponent(url)}`);
  };

  return (
    <>
      <Dialog open={openDialog === 'wish'} onOpenChange={open => setOpenDialog(open ? 'wish' : null)}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className="flex w-[362px] max-w-[calc(100%-40px)] flex-col gap-[15px] rounded-3xl"
        >
          <DialogTitle className="text-center heading-1 text-text-neutral-primary">
            위시템 담기
          </DialogTitle>
          <div className="flex w-full flex-col gap-2">
            <WishOptionButton
              label="위시에서 가져오기"
              description="내 위시리스트에서 상품을 가져와요"
              Icon={HeartIconFill}
              onClick={handleWishlist}
            />
            <WishOptionButton
              label="링크로 담기"
              description="상품URL을 붙여넣어요"
              Icon={LinkIconFill}
              onClick={() => setOpenDialog('link')}
            />
            <WishOptionButton
              label="이미지로 담기"
              description="스크린샷을 첨부해요"
              Icon={ImageIconFill}
              onClick={() => setOpenDialog('image')}
            />
          </div>
        </DialogContent>
      </Dialog>

      <AddByLinkDialog
        open={openDialog === 'link'}
        onOpenChange={open => setOpenDialog(open ? 'link' : null)}
        onSubmit={handleLinkSubmit}
      />
      <AddByImageDialog
        open={openDialog === 'image'}
        onOpenChange={open => setOpenDialog(open ? 'image' : null)}
      />
    </>
  );
}

export default AddWishDialog;

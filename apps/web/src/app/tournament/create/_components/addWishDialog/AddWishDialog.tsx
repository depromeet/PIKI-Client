'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ComponentType, ReactNode, SVGProps } from 'react';

import { HeartIconFill, ImageIconFill, LinkIconFill } from '@/assets/icons';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/common/dialog';
import { cn } from '@/utils/cn';

import AddByImageDialog from '../addByImageDialog/AddByImageDialog';
import AddByLinkDialog from '../addByLinkDialog/AddByLinkDialog';

type WishOptionT = {
  key: 'wishlist' | 'link' | 'image';
  label: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const OPTIONS: WishOptionT[] = [
  {
    key: 'wishlist',
    label: '위시에서 가져오기',
    description: '내 위시리스트에서 상품을 가져와요',
    Icon: HeartIconFill,
  },
  {
    key: 'link',
    label: '링크로 담기',
    description: '상품URL을 붙여넣어요',
    Icon: LinkIconFill,
  },
  {
    key: 'image',
    label: '이미지로 담기',
    description: '스크린샷을 첨부해요',
    Icon: ImageIconFill,
  },
];

type AddWishDialogProps = {
  trigger: ReactNode;
};

function AddWishDialog({ trigger }: AddWishDialogProps) {
  const router = useRouter();
  const [wishOpen, setWishOpen] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  const handleSelect = (key: WishOptionT['key']) => {
    if (key === 'wishlist') {
      setWishOpen(false);
      router.push('/tournament/create/by-wish');
      return;
    }
    if (key === 'link') {
      setWishOpen(false);
      setLinkOpen(true);
      return;
    }
    if (key === 'image') {
      setWishOpen(false);
      setImageOpen(true);
    }
  };

  const handleLinkSubmit = (url: string) => {
    // TODO: 입력된 url로 상품 정보 가져오기 (API 연동 전 mock)
    // 임시 itemId 'new'로 상품 확인 페이지 이동, type=tournament로 분기
    router.push(`/item/new/edit?type=tournament&url=${encodeURIComponent(url)}`);
  };

  return (
    <>
      <Dialog open={wishOpen} onOpenChange={setWishOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className="flex w-[362px] max-w-[calc(100%-40px)] flex-col gap-[15px] rounded-3xl"
        >
          <DialogTitle className="text-center heading-1 text-text-neutral-primary">
            위시템 담기
          </DialogTitle>
          <ul className="flex w-full flex-col gap-2">
            {OPTIONS.map(({ key, label, description, Icon }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => handleSelect(key)}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-[12px] border border-gray-100 bg-bg-layer-default px-5 pt-4 pb-[15px]',
                    'transition-colors active:bg-gray-50'
                  )}
                >
                  <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-gray-50">
                    <Icon className="size-6 text-icon-neutral-primary" />
                  </span>
                  <span className="flex flex-col items-start gap-1">
                    <span className="body-1-semibold text-text-neutral-primary">{label}</span>
                    <span className="body-2-regular text-text-neutral-secondary">
                      {description}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      <AddByLinkDialog open={linkOpen} onOpenChange={setLinkOpen} onSubmit={handleLinkSubmit} />
      <AddByImageDialog open={imageOpen} onOpenChange={setImageOpen} />
    </>
  );
}

export default AddWishDialog;
